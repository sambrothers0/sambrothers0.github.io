/*
 * Animated film grain ("TV static") drawn over an <img> with WebGL.
 *
 * The photo is uploaded as a texture and redrawn into a canvas every frame.
 * A fragment shader multiplies each pixel by (1 ± grain), where the grain is
 * re-randomised per pixel per frame, so no pattern survives between frames.
 * The grain is strongest in the shadows and tapers in the highlights, and
 * because it scales the photo's own colour it keeps the photo's hue.
 *
 *   color *= 1 + grain * intensity * (-1 + shadow + luma * 0.75)
 *
 * Usage:
 *   const grain = createFilmGrain({ canvas, image, intensity: 0.5 })
 *   if (!grain) { ...WebGL unavailable, leave the <img> showing... }
 *   grain.destroy()
 *
 * The canvas is laid out by CSS; it is expected to cover the same box as the
 * image, and the image is drawn with object-fit: cover around focalPoint.
 */

const VERT = `
attribute vec2 aPosition;
uniform vec2 uCoverScale;
uniform vec2 uCoverOffset;
varying vec2 vUv;

void main () {
  gl_Position = vec4(aPosition, 0.0, 1.0);
  vec2 uv = aPosition * 0.5 + 0.5;
  // map the canvas box onto the part of the image object-fit: cover would show
  vUv = uCoverOffset + uv * uCoverScale;
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
// ---- end Ashima Arts simplex noise ----

uniform sampler2D uImage;
uniform float uNoise;      // grain strength, 0..1
uniform float uDepth;      // "shadow": shifts grain toward the highlights, 0..1
uniform float uTime;
uniform vec2 uResolution;  // canvas size in CSS pixels

varying vec2 vUv;

float luma (vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float rand (vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float filmGrain (vec2 uv) {
  float r = rand(uv + uTime);
  return snoise(vec3(uv, r) + r);
}

void main () {
  vec4 origin = texture2D(uImage, vUv);
  float grain = filmGrain(vUv * uResolution);
  vec3 color = origin.rgb;

  color *= 1.0 + grain * uNoise * (-1.0 + uDepth + luma(origin.rgb) * 0.75);

  gl_FragColor = vec4(color * origin.a, origin.a);
}
`

function compile (gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[filmGrain] shader compile failed:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * @param {object} opts
 * @param {HTMLCanvasElement} opts.canvas
 * @param {HTMLImageElement} opts.image      must already be loaded (complete, naturalWidth > 0)
 * @param {number} [opts.intensity=0.5]      0..1, grain strength (Squarespace "intensity" / 100)
 * @param {number} [opts.shadow=0]           0..1, Squarespace "shadow" / 100
 * @param {number} [opts.speed=1]            time step per frame / 0.01; any non-zero value
 *                                           re-randomises every frame, 0 freezes the grain
 * @param {{x:number,y:number}} [opts.focalPoint={x:.5,y:.5}]  object-position, 0..1
 * @param {number} [opts.maxPixelRatio=1.5]
 * @param {() => void} [opts.onContextLost]  called if the GPU drops the context; the
 *                                           canvas is blank from then on, so show the <img>
 * @returns {{ destroy(): void } | null}  null when WebGL is unavailable
 */
export function createFilmGrain ({
  canvas,
  image,
  intensity = 0.5,
  shadow = 0,
  speed = 1,
  focalPoint = { x: 0.5, y: 0.5 },
  maxPixelRatio = 1.5,
  onContextLost
}) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false })
  if (!gl) return null

  const vert = compile(gl, gl.VERTEX_SHADER, VERT)
  const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vert || !frag) return null

  const program = gl.createProgram()
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[filmGrain] program link failed:', gl.getProgramInfoLog(program))
    return null
  }
  gl.useProgram(program)

  // one triangle that covers the whole viewport
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPosition = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(aPosition)
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

  // the photo, as a non-power-of-two texture (clamped, no mipmaps)
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  try {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  } catch (err) {
    // e.g. a cross-origin image without CORS headers
    console.warn('[filmGrain] could not upload image:', err)
    return null
  }

  const u = name => gl.getUniformLocation(program, name)
  const uImage = u('uImage')
  const uNoise = u('uNoise')
  const uDepth = u('uDepth')
  const uTime = u('uTime')
  const uResolution = u('uResolution')
  const uCoverScale = u('uCoverScale')
  const uCoverOffset = u('uCoverOffset')

  gl.uniform1i(uImage, 0)
  gl.uniform1f(uNoise, intensity)
  gl.uniform1f(uDepth, shadow)

  const imageAspect = image.naturalWidth / image.naturalHeight
  let cssWidth = 0
  let cssHeight = 0

  function resize () {
    cssWidth = canvas.clientWidth
    cssHeight = canvas.clientHeight
    if (!cssWidth || !cssHeight) return
    const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio)
    canvas.width = Math.round(cssWidth * ratio)
    canvas.height = Math.round(cssHeight * ratio)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResolution, cssWidth, cssHeight)

    // object-fit: cover — show the full image along one axis, crop the other
    // around the focal point. UV y runs bottom-up, so flip the focal y.
    const boxAspect = cssWidth / cssHeight
    let sx = 1
    let sy = 1
    if (boxAspect > imageAspect) sy = imageAspect / boxAspect
    else sx = boxAspect / imageAspect
    gl.uniform2f(uCoverScale, sx, sy)
    gl.uniform2f(uCoverOffset, (1 - sx) * focalPoint.x, (1 - sy) * (1 - focalPoint.y))
  }

  let time = 0
  let raf = 0
  let running = false
  let visible = true
  let destroyed = false

  function frame () {
    raf = requestAnimationFrame(frame)
    time = (time + 0.01 * speed) % 1000 // keep the float small so precision holds
    gl.uniform1f(uTime, time)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  function start () {
    if (running || destroyed || !visible) return
    running = true
    raf = requestAnimationFrame(frame)
  }

  function stop () {
    running = false
    cancelAnimationFrame(raf)
  }

  // only animate while the hero is on screen
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    visible ? start() : stop()
  })
  io.observe(canvas)

  const ro = new ResizeObserver(() => {
    resize()
    if (!running) gl.drawArrays(gl.TRIANGLES, 0, 3)
  })
  ro.observe(canvas)

  function handleContextLost (event) {
    event.preventDefault()
    stop()
    onContextLost?.()
  }
  canvas.addEventListener('webglcontextlost', handleContextLost)

  resize()
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  start()

  return {
    destroy () {
      if (destroyed) return
      destroyed = true
      stop()
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      if (gl.isContextLost()) return
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
    }
  }
}
