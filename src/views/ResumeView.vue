<template>
  <UpperToolbar/>
  <div class="resume" id="master">
    <div class="resume-column">
      <header class="page-head">
        <h1 class="page-title">Resume</h1>
        <span class="rule" aria-hidden="true"></span>
        <!-- The resume is on screen the moment the page opens; these are the
             two things left to do with it. Open in a new tab hands it to the
             browser's own viewer for full screen, zoom and print. -->
        <div class="actions">
          <a class="action action--primary" :href="pdf" :download="downloadName">
            <DownloadIcon class="action-icon"/>
            <span>Download PDF</span>
          </a>
          <a class="action action--secondary" :href="pdf" target="_blank" rel="noopener">
            <ExternalLinkIcon class="action-icon"/>
            <span>Open in new tab</span>
          </a>
        </div>
      </header>

      <!-- <object> rather than <iframe>: when the browser will not render a PDF
           inline (PDF viewer switched off, some mobile browsers) it shows the
           fallback below instead of silently downloading the file on load. -->
      <object class="viewer" :data="`${pdf}#view=FitH`" type="application/pdf"
        aria-label="Sam Brothers resume">
        <p class="fallback">
          This browser can't show the resume here.
          <a :href="pdf" :download="downloadName">Download the PDF</a> instead.
        </p>
      </object>

      <!-- Phones render embedded PDFs badly (iOS shows only the first page,
           Android often nothing), so the narrow layout drops the embed and
           lets the buttons open the browser's full viewer instead. -->
      <p class="mobile-note">Opens in your browser's PDF viewer.</p>
    </div>
  </div>
</template>

<script>
import UpperToolbar from '@/components/UpperToolbar.vue'
import DownloadIcon from '@/assets/icons/download.svg?component'
import ExternalLinkIcon from '@/assets/icons/external-link.svg?component'

// Fixed path in public/: replace that file to update the resume, and this URL
// (and every link to it already sent out) keeps working.
const RESUME_PDF = '/resume.pdf'

export default {
  name: 'ResumeView',
  components: {
    UpperToolbar,
    DownloadIcon,
    ExternalLinkIcon
  },
  data () {
    return {
      pdf: RESUME_PDF,
      // what the file is saved as, whatever it is called on the server
      downloadName: 'Sam-Brothers-Resume.pdf'
    }
  }
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
  width: min(1100px, 86vw);
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

.action--secondary{
  color: var(--accent);
  background-color: transparent;
  border-color: var(--accent);
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

  .action--secondary:hover{
    color: var(--accent-strong);
    border-color: var(--accent-strong);
    background-color: var(--accent-softer);
  }
}

/* tall enough to read a page without scrolling the site, short enough that
   the buttons above it are still in view */
.viewer{
  display: block;
  width: 100%;
  height: 82vh;
  margin-top: 4vh;
  background-color: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.fallback{
  padding: 32px;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
}

.fallback a{
  color: var(--accent);
}

.mobile-note{
  display: none;
  margin: 1.2em 0 0;
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  font-size: 0.95rem;
  color: var(--text-muted);
}

@media (max-width: 700px){
  .viewer{
    display: none;
  }

  .mobile-note{
    display: block;
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
