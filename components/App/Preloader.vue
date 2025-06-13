<template>
  <div class="preloader bg-dark2">
    <svg
      class="absolute bottom-0 left-0 right-0 top-0 z-[60] m-auto w-1/6 max-mt:bottom-[10%] max-mt:w-1/6 max-mm:w-1/4"
      width="211"
      height="211"
      viewBox="0 0 211 211"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M67.1588 37.8315L38.5206 21.5963L38.5206 87.9891L30 102.902L30 90.6879L30 6.99999L71.3855 30.4617L67.1588 37.8315Z"
        fill="white"
        class="preloader-border"
      ></path>
      <path
        d="M185.895 105.144L139.916 79.0778L131.395 64.4814L147.068 73.3668L203 105.075L167.099 125.811L162.813 118.475L166.67 116.248L185.895 105.144Z"
        fill="white"
        class="preloader-border"
      ></path>
      <path
        d="M38.5206 190.267L77.1989 167.926L94.1853 167.926L90.4001 170.113L30 205L30 167.926L38.5206 167.926L38.5206 169.624L38.5206 190.267Z"
        fill="white"
        class="preloader-border"
      ></path>
      <path
        d="M7 159L91.5 11L127.5 133.5L7 159Z"
        fill="url(#paint0_linear_2001_55)"
        class="preloader-primary"
      ></path>
      <path
        d="M7 159H177L127.5 133.5L7 159Z"
        fill="url(#paint1_linear_2001_55)"
        class="preloader-primary"
      ></path>
      <path
        d="M127.5 133.5L91.5 11L177 159L127.5 133.5Z"
        fill="url(#paint2_linear_2001_55)"
        class="preloader-primary"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_2001_55"
          x1="90.6437"
          y1="11"
          x2="6.8328"
          y2="156.258"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.035" stop-color="#FF01FF"></stop>
          <stop offset="0.155" stop-color="#6501BD"></stop>
          <stop offset="0.18" stop-color="#6501BD"></stop>
          <stop offset="0.25" stop-color="#5DFFFF"></stop>
          <stop offset="0.533424" stop-color="#CDFFFF"></stop>
          <stop offset="0.627716" stop-color="#D7D2FF"></stop>
          <stop offset="0.67" stop-color="#D6D4FF"></stop>
          <stop offset="0.75" stop-color="#C55FFF"></stop>
          <stop offset="0.79" stop-color="#BA21F2"></stop>
          <stop offset="0.9" stop-color="#D401BD"></stop>
          <stop offset="1" stop-color="#D401BD"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_2001_55"
          x1="7"
          y1="146.5"
          x2="177"
          y2="146.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5D0AC5"></stop>
          <stop offset="1" stop-color="#5D71FF"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_2001_55"
          x1="92"
          y1="11"
          x2="178.229"
          y2="158.281"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#5C00BC"></stop>
          <stop offset="0.29" stop-color="#8B28F1"></stop>
          <stop offset="0.405" stop-color="#5C00BC"></stop>
          <stop offset="0.535" stop-color="#8B28F1"></stop>
          <stop offset="0.787398" stop-color="#5C00BC"></stop>
          <stop offset="1" stop-color="#5C00BC"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 70;

  width: 100%;
  height: 100%;
}

.preloader-border {
  animation: animate-svg-border 10s ease infinite;
}

@keyframes animate-svg-border {
  0% {
    opacity: 0;
  }

  3% {
    opacity: 0;
  }

  9% {
    opacity: 1;
  }

  44% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }

  53% {
    opacity: 0.3;
  }

  56% {
    opacity: 1;
  }

  80% {
    opacity: 1;
  }

  86% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

.preloader-primary {
  animation: animate-svg-primary 10s ease infinite;
}

@keyframes animate-svg-primary {
  0% {
    transform: translate(-32%, 23%) rotate(-29.7deg) scale(1.15);
  }

  8% {
    transform: translate(0) rotate(0) scale(1);
  }

  44% {
    transform: translate(0) rotate(0) scale(1);
  }

  50% {
    transform: translate(-1%, -1%) rotate(0) scale(1.02);
  }

  53% {
    transform: translate(-1%, -1%) rotate(0) scale(1.02);
  }

  56% {
    transform: translate(0) rotate(0) scale(1);
  }

  80% {
    transform: translate(0) rotate(0) scale(1);
  }

  88% {
    transform: translate(-32%, 23%) rotate(-29.7deg) scale(1.15);
  }

  100% {
    transform: translate(-32%, 23%) rotate(-29.7deg) scale(1.15);
  }
}
</style>
