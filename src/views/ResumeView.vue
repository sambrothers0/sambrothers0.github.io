<template>
  <UpperToolbar/>
  <div class="resume" id="master">
    <div class="resume-column">
      <header class="page-head">
        <h1 class="page-title">Resume</h1>
        <span class="rule" aria-hidden="true"></span>
        <div class="actions">
          <a class="action action--primary" :href="pdf" :download="downloadName">
            <DownloadIcon class="action-icon"/>
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      <!-- The site draws the PDF itself with pdf.js rather than embedding the
           browser's viewer, so only the page shows: no toolbar, outline
           sidebar or inner scrollbar in any browser, phones included. Each
           page box takes the PDF page's proportions before it is drawn, so
           nothing jumps when the canvas fills in. -->
      <div v-if="!failed" class="viewer" :aria-busy="pages.length === 0">
        <div v-for="(page, i) in pages" :key="i" class="page"
          :style="{ aspectRatio: `${page.width} / ${page.height}` }">
          <canvas :ref="el => { canvases[i] = el }" role="img"
            :aria-label="`Sam Brothers resume, page ${i + 1} of ${pages.length}`"></canvas>
          <!-- the PDF's links, laid over the canvas where they sit on the page -->
          <a v-for="(link, j) in page.links" :key="j" class="page-link" :href="link.url"
            :target="link.external ? '_blank' : null" :rel="link.external ? 'noopener' : null"
            :aria-label="link.url" :style="link.box"></a>
        </div>
      </div>
      <p v-else class="fallback">
        The resume couldn't be shown here.
        <a :href="pdf" :download="downloadName">Download the PDF</a> instead.
      </p>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import DownloadIcon from '@/assets/icons/download.svg?component'
import { markRaw } from 'vue'

// Fixed path in public/: replace that file to update the resume, and this URL
// (and every link to it already sent out) keeps working.
const RESUME_PDF = '/resume.pdf'

export default {
  name: 'ResumeView',
  components: {
    UpperToolbar,
    DownloadIcon
  },
  data () {
    return {
      pdf: RESUME_PDF,
      // what the file is saved as, whatever it is called on the server
      downloadName: 'Sam-Brothers-Resume.pdf',
      // per page: size in PDF units and link boxes (percent of the page)
      pages: [],
      failed: false
    }
  },
  created () {
    // filled by the template's function refs; not reactive
    this.canvases = []
    this.renderTasks = []
  },
  async mounted () {
    try {
      // loaded here so pdf.js (and its worker) only download on this page.
      // The legacy build supports older Safari and Chromium than the default.
      const [pdfjs, { default: workerSrc }] = await Promise.all([
        import('pdfjs-dist/legacy/build/pdf.min.mjs'),
        import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url')
      ])
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
      this.loadingTask = pdfjs.getDocument({ url: RESUME_PDF })
      const doc = markRaw(await this.loadingTask.promise)
      this.doc = doc

      const pages = []
      for (let n = 1; n <= doc.numPages; n++) {
        pages.push(markRaw(await doc.getPage(n)))
      }
      this.pdfPages = pages
      this.pages = await Promise.all(pages.map(describePage))
      await this.$nextTick()
      this.drawAll()

      // redraw sharp at the new size when the column width changes
      let timer
      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(timer)
        timer = setTimeout(() => this.drawAll(), 150)
      })
      this.resizeObserver.observe(this.canvases[0].parentElement)
    } catch (err) {
      if (this.unmounted) return
      console.error('Resume failed to render', err)
      this.failed = true
    }
  },
  beforeUnmount () {
    this.unmounted = true
    this.resizeObserver?.disconnect()
    this.renderTasks.forEach(task => task?.cancel())
    this.loadingTask?.destroy()
  },
  methods: {
    drawAll () {
      this.pdfPages.forEach((page, i) => this.draw(page, i))
    },
    async draw (page, i) {
      const canvas = this.canvases[i]
      if (!canvas) return
      this.renderTasks[i]?.cancel()

      // backing store at device resolution (capped to keep phone canvases
      // under their memory limits); CSS sizes the canvas to the page box
      const ratio = Math.min(window.devicePixelRatio || 1, 3)
      const cssWidth = canvas.parentElement.clientWidth
      const viewport = page.getViewport({ scale: (cssWidth / page.view[2]) * ratio })
      canvas.width = Math.round(viewport.width)
      canvas.height = Math.round(viewport.height)

      const task = page.render({ canvas, viewport })
      this.renderTasks[i] = task
      try {
        await task.promise
      } catch (err) {
        // a newer draw replaced this one
        if (err?.name !== 'RenderingCancelledException') throw err
      }
    }
  }
}

// Page size and its link annotations, with each link's box as percentages
// of the page so the overlays line up at any width without recalculating.
async function describePage (page) {
  const [x0, y0, x1, y1] = page.view
  const width = x1 - x0
  const height = y1 - y0
  const annotations = await page.getAnnotations()
  const links = annotations
    .filter(a => a.subtype === 'Link' && a.url)
    .map(a => {
      const [left, bottom, right, top] = a.rect
      return {
        url: a.url,
        external: /^https?:/i.test(a.url),
        box: {
          left: `${((left - x0) / width) * 100}%`,
          top: `${((y1 - top) / height) * 100}%`,
          width: `${((right - left) / width) * 100}%`,
          height: `${((top - bottom) / height) * 100}%`
        }
      }
    })
  return { width, height, links }
}
</script>

<style scoped lang="scss">
.resume{
  min-height: 100vh;
  padding-bottom: 8vh;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

.resume-column{
  width: 60vw;
  margin: 0 auto;
  text-align: left;
}

.page-head{
  margin: 16vh 0 0;
}

.page-title{
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}

.page-head .rule{
  width: min(460px, 60%);
  margin: 1em 0 1.6em;
}

.actions{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.action{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 11px 24px;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: var(--radius-pill);
  transition: box-shadow var(--dur-med) var(--ease-out),
              background-color var(--dur-med) var(--ease-out),
              border-color var(--dur-med) var(--ease-out),
              transform var(--dur-med) var(--ease-out);
}

.action-icon{
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.action--primary{
  color: var(--on-accent);
  background-color: var(--accent-fill);
  box-shadow: var(--shadow-sm);
}

@media (hover: hover) and (pointer: fine){
  .action:hover{
    transform: translateY(-2px);
  }

  .action--primary:hover{
    background-color: var(--accent-fill-hover);
    border-color: var(--accent-strong);
    box-shadow: var(--shadow-md);
  }
}

.viewer{
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 4vh;
}

/* the page itself is the frame: no viewer chrome around it */
.page{
  position: relative;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.page canvas{
  display: block;
  width: 100%;
  height: 100%;
}

.page-link{
  position: absolute;
  border-radius: 3px;
}

.page-link:focus-visible{
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.fallback{
  margin: 4vh 0 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
}

.fallback a{
  color: var(--accent);
}

@media (max-width: 700px){
  /* 60% leaves the page too small to read on a phone */
  .resume-column{
    width: 92vw;
  }

  /* stacked full-width buttons are easier targets for a thumb */
  .actions{
    flex-direction: column;
  }

  .action{
    justify-content: center;
    padding: 14px 24px;
  }
}
</style>
