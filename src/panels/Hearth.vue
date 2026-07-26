<!--
  Hardcoded panel. Hearth lives under the vigetlabs org, so scripts/gh-scraper.cjs
  (which only walks sambrothers0's repos) will never pick it up and the nightly
  scheduler workflow will never overwrite this entry. Same approach as Thrillsburg.vue.
-->
<template>
    <div class="hearth template" @click="handleClick">
        <div class="hearth-left">
            <h1 style="font-size: 40px; margin-top: 3vh"> {{ title }} </h1>
            <div class="line-two-wrapper">
                <h3> {{ date }} </h3>
            </div>
            <p class='hearth-subtext'
            style="font-size: 3vh; line-height: 4.5vh; font-family: 'Outfit', sans-serif">
            {{ shortText }}
            </p>
        </div>
        <div class="hearth-right">
            <!-- Wordmark uses currentColor so it inverts with the site's dark mode -->
            <svg class="hearth-wordmark" xmlns="http://www.w3.org/2000/svg" viewBox="7 10 477 115"
            fill="none" role="img" aria-label="Hearth">
              <path d="M 409 66.500 L 409 123 419.926 123 L 430.853 123 431.176 96.750 C 431.474 72.631, 431.662 70.225, 433.500 67.113 C 437.315 60.653, 446.333 58.166, 453.540 61.586 C 460.285 64.787, 460.445 65.512, 461 95.500 L 461.500 122.500 472.816 122.783 L 484.132 123.067 483.816 92.783 C 483.509 63.351, 483.433 62.352, 481.114 57.221 C 477.877 50.057, 470.443 43.475, 463.215 41.374 C 453.044 38.417, 438.635 40.915, 434.061 46.427 C 433.343 47.292, 432.360 48, 431.878 48 C 431.395 48, 431 39.450, 431 29 L 431 10 420 10 L 409 10 409 66.500 M 7.242 66.250 L 7.500 121.500 22.250 121.777 C 30.363 121.929, 37 121.769, 37 121.421 C 37 121.073, 35.887 119.466, 34.526 117.849 C 29.672 112.080, 29.204 104.667, 33.190 96.700 L 35.092 92.900 38.123 95.450 C 39.790 96.852, 41.521 98, 41.970 98 C 43.398 98, 44 95.030, 44 87.983 C 44 80.359, 44.936 77.064, 47.960 74.040 C 50.898 71.102, 51.667 71.479, 52.296 76.171 C 52.770 79.705, 53.774 81.160, 58.867 85.696 C 69.035 94.754, 73.245 106.679, 69.126 114.754 C 67.972 117.014, 66.572 119.146, 66.014 119.491 C 62.840 121.453, 66.077 122.035, 78.750 121.778 L 92.500 121.500 92.758 66.250 L 93.017 11 81.528 11 L 70.038 11 69.769 33.250 L 69.500 55.500 50.750 55.772 L 32 56.044 32 35.104 C 32 23.587, 31.727 13.452, 31.393 12.582 C 30.887 11.262, 28.815 11, 18.885 11 L 6.983 11 7.242 66.250 M 354.704 28.577 C 353.837 36.980, 351.432 39.807, 343.750 41.450 L 341 42.038 341 51.473 L 341 60.909 347.750 61.204 L 354.500 61.500 355 83 C 355.546 106.474, 355.975 108.485, 361.868 115.196 C 367.467 121.573, 380.342 125.225, 391.386 123.569 L 396 122.877 396 113.464 L 396 104.050 392.990 104.652 C 388.703 105.509, 381.275 103.165, 378.962 100.225 C 377.174 97.952, 377 96.097, 377 79.365 L 377 61 386.500 61 L 396 61 396 51.500 L 396 42 386.500 42 L 377 42 377 32.500 L 377 23 366.140 23 L 355.280 23 354.704 28.577 M 133.090 41.586 C 122.028 44.561, 111.413 54.415, 106.792 66 C 105.015 70.454, 104.589 73.593, 104.549 82.500 C 104.502 93.116, 104.625 93.761, 108.096 101 C 115.985 117.457, 130.705 125.982, 149 124.689 C 158.640 124.007, 165.551 121.691, 171.611 117.111 C 176.126 113.699, 181 107.840, 181 105.825 C 181 105.341, 177.174 103.093, 172.499 100.828 L 163.997 96.711 161.636 99.259 C 157.758 103.443, 153.193 105.250, 146.500 105.250 C 139.954 105.250, 135.920 103.711, 132.298 99.831 C 130.420 97.821, 127 91.181, 127 89.547 C 127 89.263, 139.938 88.911, 155.750 88.765 L 184.500 88.500 184.796 80.505 C 185.681 56.654, 169.134 39.823, 145.040 40.066 C 141.443 40.102, 136.066 40.786, 133.090 41.586 M 224.003 40.738 C 219.014 41.669, 209.265 46.801, 205.683 50.384 C 203.665 52.402, 201.126 55.793, 200.042 57.919 L 198.070 61.784 206.741 65.945 L 215.412 70.105 217.184 67.803 C 218.158 66.536, 218.966 65.181, 218.978 64.792 C 219.019 63.467, 227.488 59.156, 230.500 58.927 C 236.878 58.441, 239.952 59.088, 242.850 61.527 C 245.907 64.100, 247.894 69.506, 246.350 71.050 C 245.882 71.518, 239.540 72.828, 232.257 73.960 C 217.015 76.329, 211.172 78.099, 205.340 82.110 C 193.293 90.398, 191.829 108.057, 202.383 117.785 C 211.933 126.588, 231.326 127.356, 243.150 119.399 L 248 116.135 248 119.568 L 248 123 258.500 123 L 269 123 269 93.626 C 269 61.893, 268.629 59.136, 263.450 52.346 C 259.791 47.549, 252.989 43.232, 246.373 41.509 C 240.924 40.090, 229.575 39.699, 224.003 40.738 M 316.430 43.380 C 313.316 44.830, 310.526 47.045, 309.197 49.121 L 307.034 52.500 307.017 47.250 L 307 42 296.500 42 L 286 42 286 82.500 L 286 123 296.939 123 L 307.877 123 308.189 97.250 C 308.491 72.264, 308.568 71.405, 310.790 68.290 C 314.747 62.742, 318.492 60.769, 326.102 60.225 L 333 59.731 333 50.366 L 333 41 327.250 41.010 C 323.322 41.016, 319.894 41.768, 316.430 43.380 M 138 58.704 C 134.344 60.034, 128 67.803, 128 70.950 C 128 71.641, 133.646 72, 144.500 72 C 160.730 72, 161 71.965, 161 69.844 C 161 67.012, 156.649 61.387, 152.998 59.499 C 150.209 58.057, 141.105 57.574, 138 58.704 M 234.500 90.093 C 229 91.135, 223.403 92.806, 222.063 93.805 C 216.537 97.924, 217.385 105.010, 223.721 107.657 C 226.842 108.961, 228.313 109.024, 232.691 108.045 C 241.030 106.179, 246.973 98.784, 246.994 90.250 C 247.001 87.634, 247.444 87.640, 234.500 90.093" fill="currentColor" fill-rule="evenodd"/>
            </svg>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hearth',
  data () {
    return {
      title: 'Hearth',
      date: 'Jul 2026',
      shortText: 'Hearth is an office-attendance scheduling app built at Viget that lets teammates plan ... ',
      longText: 'Hearth is an office-attendance scheduling app built at Viget that lets teammates plan and confirm ' +
      'which days they will be in the office. I built full-stack features across a React 19, TypeScript, and Tailwind ' +
      'frontend and a Dockerized Ruby on Rails API, delivering the shared calendar, office roster, and onboarding flows ' +
      'as reviewed pull requests. The calendar syncs live between users over Action Cable web sockets, and I integrated ' +
      'the app with a Slack bot so people can edit and confirm their in-office days without ever leaving a Slack DM. ',
      expanded: false
    }
  },
  methods: {
    checkAppearance () {
      this.$store.getters.isMobileOn ? this.mobileOn() : this.mobileOff()
    },
    handleClick () {
      this.expanded ? this.condense() : this.expand()
    },
    expand () {
      document.querySelector('.hearth-subtext').textContent = this.longText
      this.expanded = true
    },
    condense () {
      document.querySelector('.hearth-subtext').textContent = this.shortText
      this.expanded = false
    },
    mobileOn () {
      document.querySelector('.hearth-wordmark').style.display = 'none'
      document.querySelector('.hearth-left').style.width = '90%'
      document.querySelector('.hearth-right').style.width = '0%'
    },
    mobileOff () {
      document.querySelector('.hearth-wordmark').style.display = 'block'
      document.querySelector('.hearth-left').style.width = '45%'
      document.querySelector('.hearth-left').style.marginLeft = '2vw'
      document.querySelector('.hearth-right').style.width = '45%'
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobileOn
    }
  },
  watch: {
    isMobile (newVal) {
      newVal ? this.mobileOn() : this.mobileOff()
    }
  },
  mounted () {
    this.checkAppearance()
  }
})
</script>

<style scoped lang="scss">
.hearth{
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 35px;
  transition: transform 0.2s, box-shadow 0.2s, height 0.2s;
  margin-bottom: 50px;
  background-color: #b4451f33;
}
.hearth:hover{
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.1);
}

.line-two-wrapper{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin-top: -2vh;
  margin-bottom: -2vh
}

.hearth-left{
  height: 100%;
  width: 45%;
  flex-direction: column;
  text-align: left;
  margin-left: 2vw;
}

.hearth-right{
  height: 100%;
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hearth-wordmark{
  width: 24vw;
  margin: 15px;
  position: relative;
  top: 2vh;
}
</style>
