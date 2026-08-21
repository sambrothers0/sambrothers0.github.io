<template>
  <UpperToolbar/>
  <div class="contact" id="master">
    <div class='title'>
      <h1 class="title-heading">Contact</h1>
      <span class="rule title-rule" aria-hidden="true"></span>
    </div>
    <PaperAirplane class="paper-airplane"/>
    <div class="link-wrapper">
      <div class="link-slot" v-for="link in links" :key="link.id">
        <component :is="link.copy ? 'button' : 'a'"
          class="link-pill" :class="{ 'link-pill--stacked': link.lines.length > 1 }"
          :type="link.copy ? 'button' : null"
          :href="link.copy ? null : link.href"
          :target="link.external ? '_blank' : null"
          :rel="link.external ? 'noopener noreferrer' : null"
          :aria-label="link.copy ? 'Copy email address to clipboard' : null"
          @click="link.copy ? copyEmail($event) : null">
          <span class="pill-icon" aria-hidden="true"><component :is="link.icon"/></span>
          <span class="pill-label">
            <span class="pill-lines">
              <span class="pill-line" v-for="line in link.lines" :key="line">{{ line }}</span>
            </span>
          </span>
        </component>
        <transition name="toast">
          <span class="toast-anchor" :class="`toast-anchor--${toastPlacement}`"
            :style="toastStyle" v-if="link.copy && copied">
            <span class="copied-toast" role="status">Copied!</span>
          </span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import PaperAirplane from '@/assets/icons/paper-airplane.svg?component'
import MailIcon from '@/assets/icons/mail.svg?component'
import ResumeIcon from '@/assets/icons/resume.svg?component'
import GitHubIcon from '@/assets/icons/github.svg?component'
import LinkedInIcon from '@/assets/icons/linkedin.svg?component'

const EMAIL = 'samueljbrothers@gmail.com'
const PHONE = '+1 (919) 407-9965'
/* width the toast needs to the right of a pill before it drops below instead */
const TOAST_SIDE_ROOM = 120

export default {
  name: 'ContactView',
  components: {
    UpperToolbar,
    PaperAirplane,
    MailIcon,
    ResumeIcon,
    GitHubIcon,
    LinkedInIcon
  },
  data () {
    return {
      copied: false,
      copyTimer: null,
      toastPlacement: 'side',
      toastStyle: null,
      links: [
        {
          id: 'email',
          icon: 'MailIcon',
          lines: [EMAIL, PHONE],
          copy: true,
          external: false
        },
        {
          id: 'resume',
          icon: 'ResumeIcon',
          lines: ['Resume'],
          href: '/resume',
          external: true
        },
        {
          id: 'github',
          icon: 'GitHubIcon',
          lines: ['GitHub'],
          href: 'https://github.com/sambrothers0',
          external: true
        },
        {
          id: 'linkedin',
          icon: 'LinkedInIcon',
          lines: ['LinkedIn'],
          href: 'https://www.linkedin.com/in/samjbrothers/',
          external: true
        }
      ]
    }
  },
  beforeUnmount () {
    clearTimeout(this.copyTimer)
  },
  methods: {
    async copyEmail (event) {
      // read before awaiting — currentTarget is nulled once the handler returns
      const pill = event.currentTarget
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(EMAIL)
        } else {
          this.copyLegacy(EMAIL)
        }
      } catch {
        // clipboard API can reject on an insecure origin or a denied permission
        this.copyLegacy(EMAIL)
      }
      this.flashCopied(pill)
    },
    /* execCommand path for browsers without the async clipboard API */
    copyLegacy (text) {
      const field = document.createElement('textarea')
      field.value = text
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    },
    /* The toast is fixed to the viewport rather than laid out in the page, so
       showing it can never widen the document and shift the layout underneath.
       It sits beside the pill when there is room and drops below it when the
       narrow layout leaves none. */
    flashCopied (pill) {
      const box = pill.getBoundingClientRect()
      if (window.innerWidth - box.right >= TOAST_SIDE_ROOM) {
        this.toastPlacement = 'side'
        this.toastStyle = { left: `${box.right + 14}px`, top: `${box.top + box.height / 2}px` }
      } else {
        this.toastPlacement = 'below'
        this.toastStyle = { left: `${box.right}px`, top: `${box.bottom + 10}px` }
      }
      clearTimeout(this.copyTimer)
      this.copied = true
      this.copyTimer = setTimeout(() => { this.copied = false }, 1400)
    }
  }
}

</script>

<style lang="scss" scoped>
.contact{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color var(--dur-slow) ease, color var(--dur-slow) ease;
}

.title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20vh;
  /* nudged down without pushing the link pills, which are centered against it */
  position: relative;
  top: 6vh;
  margin-top: 0vh;
  margin-left: 40%;
}

.title-heading{
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 200;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}

.title-rule{
  width: 30vw;
  margin-left: 10vw;
  margin-top: 1em;
}

/* height comes from the viewBox aspect; currentColor picks up --text off .contact */
.paper-airplane{
  position: fixed;
  width: 50vw;
  height: auto;
  transform: rotate(45deg);
  margin-left: 10vw;
}

.link-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 60vh;
  width: 40%;
  margin-top: 5%;
  margin-left: 45%;
  z-index: 1;
}

.link-slot{
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 100px;
  width: 100%;
}

/* placed against the pill that was clicked — the confirmation belongs next to
   the control — but positioned off the viewport so it adds nothing to the
   document's width; `left`/`top` come from the pill's rect at copy time */
.toast-anchor{
  position: fixed;
  z-index: 2;
  pointer-events: none;
}

.toast-anchor--side .copied-toast{
  transform: translateY(-50%);
}

/* right edge flush with the pill's, sitting just under it */
.toast-anchor--below .copied-toast{
  transform: translateX(-100%);
}

.copied-toast{
  display: inline-block;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  color: inherit;
  background-color: transparent;
  border: 1px solid currentColor;
  border-radius: var(--radius-pill);
}

.toast-enter-active{
  transition: opacity var(--dur-fast) ease, transform var(--dur-fast) var(--ease-out);
}

.toast-leave-active{
  transition: opacity var(--dur-slow) ease, transform var(--dur-slow) var(--ease-out);
}

.toast-enter-from,
.toast-leave-to{
  opacity: 0;
  transform: translateX(-8px);
}

.link-pill{
  display: grid;
  grid-template-columns: auto 0fr;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100px;
  /* clamps the 100% hover width to the icon + label, so the pill never
     shows dead space to the right of the text */
  max-width: max-content;
  padding: 0 26px;
  color: var(--on-accent);
  font: inherit;
  text-align: left;
  text-decoration: none;
  background-color: var(--accent-fill);
  border: 2px solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: width var(--dur-slow) var(--ease-out),
              grid-template-columns var(--dur-slow) var(--ease-out),
              box-shadow var(--dur-med) var(--ease-out),
              background-color var(--dur-med) var(--ease-out),
              border-color var(--dur-med) var(--ease-out);
}

/* only a pointer that can hover gets the expanding label — on touch a tap is
   the link itself, so the pill stays a circle instead of opening under the
   finger */
@media (hover: hover) and (pointer: fine){
  .link-pill:hover,
  .link-pill:focus-visible{
    width: 100%;
    grid-template-columns: auto 1fr;
    background-color: var(--accent-fill-hover);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-strong);
  }
}

.pill-icon{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}

.pill-icon :deep(svg){
  width: 100%;
  height: 100%;
  display: block;
}

.pill-label{
  min-width: 0;
  overflow: hidden;
}

.pill-lines{
  display: flex;
  flex-direction: column;
  padding: 6px 0 6px 18px;
  opacity: 0;
  transition: opacity var(--dur-fast) ease;
}

@media (hover: hover) and (pointer: fine){
  .link-pill:hover .pill-lines,
  .link-pill:focus-visible .pill-lines{
    opacity: 1;
    transition: opacity var(--dur-med) ease var(--dur-fast);
  }
}

.pill-line{
  font-size: clamp(1.5rem, 2.6vw, 2.35rem);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.link-pill--stacked .pill-line{
  font-size: clamp(1rem, 1.6vw, 1.375rem);
  line-height: 1.4;
}

/* the narrow layout has far less room to the right of the airplane, so the
   pills shrink to keep their expanded labels on one line */
@media (max-width: 700px){
  /* collapsed size is height = width, so these keep the pill a circle:
     icon = height - padding*2 - border*2 */
  .link-slot{
    height: 68px;
  }

  .link-pill{
    width: 68px;
    padding: 0 10px;
  }

  .pill-icon{
    width: 44px;
    height: 44px;
  }

  .pill-lines{
    padding: 3px 0 3px 10px;
  }

  .pill-line{
    font-size: clamp(0.875rem, 3.6vw, 1.25rem);
  }

  .link-pill--stacked .pill-line{
    font-size: clamp(0.6875rem, 2.6vw, 0.875rem);
  }

  .copied-toast{
    padding: 4px 10px;
    font-size: 0.8125rem;
  }
}
</style>
