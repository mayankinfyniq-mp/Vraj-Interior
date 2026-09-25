<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const halo = ref(null)
const core = ref(null)

let xTo
let yTo
let cxTo
let cyTo
let enabled = false
let nativeCursor = false

function onMove(e) {
  if (!enabled || nativeCursor) return

  xTo(e.clientX)
  yTo(e.clientY)
  cxTo(e.clientX)
  cyTo(e.clientY)
}

function setNativeCursor(active) {
  if (!enabled) return

  nativeCursor = active

  document.documentElement.classList.toggle(
    'native-cursor',
    active,
  )

  if (active) {
    gsap.to([halo.value, core.value], {
      autoAlpha: 0,
      duration: 0.15,
      overwrite: true,
    })
  } else {
    gsap.to([halo.value, core.value], {
      autoAlpha: 1,
      duration: 0.2,
      overwrite: true,
    })
  }
}

function applyMode(mode, label) {
  if (!enabled || nativeCursor) return

  const el = halo.value
  const coreEl = core.value

  if (!el || !coreEl) return

  const labelEl = el.querySelector('[data-cursor-label]')

  if (mode === 'view' || mode === 'drag') {
    gsap.to(el, {
      width: 92,
      height: 92,
      backgroundColor: '#06231E',
      borderColor: 'rgba(195,161,90,0)',
      duration: 0.45,
      ease: 'power3.out',
    })

    gsap.to(labelEl, {
      autoAlpha: 1,
      duration: 0.3,
    })

    gsap.to(coreEl, {
      scale: 0,
      duration: 0.3,
    })

    labelEl.textContent =
      label || (mode === 'drag' ? 'Drag' : 'View')
  } else if (mode === 'link' || mode === 'text') {
    gsap.to(el, {
      width: mode === 'link' ? 54 : 8,
      height: mode === 'link' ? 54 : 26,
      borderRadius: mode === 'link' ? '999px' : '4px',
      backgroundColor: 'rgba(195,161,90,0.12)',
      borderColor: 'rgba(195,161,90,0.6)',
      duration: 0.4,
      ease: 'power3.out',
    })

    gsap.to(labelEl, {
      autoAlpha: 0,
      duration: 0.2,
    })

    gsap.to(coreEl, {
      scale: mode === 'link' ? 0.3 : 0,
      duration: 0.3,
    })
  } else {
    gsap.to(el, {
      width: 36,
      height: 36,
      borderRadius: '999px',
      backgroundColor: 'rgba(10,46,39,0.04)',
      borderColor: 'rgba(10,46,39,0.28)',
      duration: 0.4,
      ease: 'power3.out',
    })

    gsap.to(labelEl, {
      autoAlpha: 0,
      duration: 0.2,
    })

    gsap.to(coreEl, {
      scale: 1,
      duration: 0.3,
    })
  }
}

function onOver(e) {
  if (!enabled) return

  const element =
    e.target instanceof Element ? e.target : null

  if (!element) return

  const nativeTarget = element.closest(
    '[data-cursor-native]',
  )

  if (nativeTarget) {
    setNativeCursor(true)
    return
  }

  if (nativeCursor) {
    setNativeCursor(false)
  }

  const target = element.closest('[data-cursor]')

  applyMode(
    target
      ? target.getAttribute('data-cursor')
      : 'default',
    target?.getAttribute('data-cursor-label'),
  )
}

function onDown() {
  if (!enabled || nativeCursor) return

  gsap.to(halo.value, {
    scale: 0.82,
    duration: 0.25,
    ease: 'power3.out',
  })
}

function onUp() {
  if (!enabled || nativeCursor) return

  gsap.to(halo.value, {
    scale: 1,
    duration: 0.3,
    ease: 'power3.out',
  })
}

function onLeave() {
  if (!enabled) return

  gsap.to(
    [halo.value, core.value],
    {
      autoAlpha: 0,
      duration: 0.25,
    },
  )
}

function onEnter() {
  if (!enabled || nativeCursor) return

  gsap.to(
    [halo.value, core.value],
    {
      autoAlpha: 1,
      duration: 0.25,
    },
  )
}

onMounted(() => {
  enabled = window.matchMedia(
    '(hover: hover) and (pointer: fine)',
  ).matches

  if (!enabled) return

  document.documentElement.classList.add('has-cursor')

  gsap.set(
    [halo.value, core.value],
    {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    },
  )

  xTo = gsap.quickTo(
    halo.value,
    'x',
    {
      duration: 0.5,
      ease: 'power3.out',
    },
  )

  yTo = gsap.quickTo(
    halo.value,
    'y',
    {
      duration: 0.5,
      ease: 'power3.out',
    },
  )

  cxTo = gsap.quickTo(
    core.value,
    'x',
    {
      duration: 0.12,
      ease: 'power3.out',
    },
  )

  cyTo = gsap.quickTo(
    core.value,
    'y',
    {
      duration: 0.12,
      ease: 'power3.out',
    },
  )

  window.addEventListener(
    'mousemove',
    onMove,
    { passive: true },
  )

  document.addEventListener(
    'mouseover',
    onOver,
    { passive: true },
  )

  window.addEventListener(
    'mousedown',
    onDown,
  )

  window.addEventListener(
    'mouseup',
    onUp,
  )

  document.addEventListener(
    'mouseleave',
    onLeave,
  )

  document.addEventListener(
    'mouseenter',
    onEnter,
  )
})

onUnmounted(() => {
  document.documentElement.classList.remove(
    'has-cursor',
    'native-cursor',
  )

  window.removeEventListener(
    'mousemove',
    onMove,
  )

  document.removeEventListener(
    'mouseover',
    onOver,
  )

  window.removeEventListener(
    'mousedown',
    onDown,
  )

  window.removeEventListener(
    'mouseup',
    onUp,
  )

  document.removeEventListener(
    'mouseleave',
    onLeave,
  )

  document.removeEventListener(
    'mouseenter',
    onEnter,
  )
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-[120] hidden md:block"
  >
    <div
      ref="halo"
      class="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-ink/30"
      style="will-change: transform"
    >
      <span
        data-cursor-label
        class="invisible text-[0.62rem] uppercase tracking-label text-porcelain"
      />
    </div>

    <div
      ref="core"
      class="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold"
      style="will-change: transform"
    />
  </div>
</template>

<style>
html.native-cursor,
html.native-cursor *,
html.native-cursor button,
html.native-cursor a,
html.native-cursor [role='button'] {
  cursor: auto !important;
}

html.native-cursor button,
html.native-cursor a,
html.native-cursor [role='button'] {
  cursor: pointer !important;
}
</style>