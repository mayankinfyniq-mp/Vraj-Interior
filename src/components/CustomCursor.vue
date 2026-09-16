<script setup>
/**
 * CustomCursor — a brass dot that tracks exactly, and a ring that
 * trails a fraction behind. Grows and picks up a label over imagery
 * and interactive elements. Never rendered on touch devices.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from '@/plugins/gsap'
import { cursor, detectCursorSupport, resetCursor } from '@/composables/useCursor'

const dot = ref(null)
const ring = ref(null)
const labelEl = ref(null)
const active = ref(false)

let raf = null
let visible = false

const pos = { x: -100, y: -100 }
const ringPos = { x: -100, y: -100 }

function onMove(e) {
  pos.x = e.clientX
  pos.y = e.clientY
  if (!visible) {
    visible = true
    gsap.to([dot.value, ring.value], { autoAlpha: 1, duration: 0.3 })
    // Jump the ring to the pointer on first sight
    ringPos.x = pos.x
    ringPos.y = pos.y
  }
}

function onLeave() {
  visible = false
  gsap.to([dot.value, ring.value], { autoAlpha: 0, duration: 0.25 })
}

function onDown() {
  gsap.to(ring.value, { scale: 0.82, duration: 0.25 })
}
function onUp() {
  gsap.to(ring.value, { scale: 1, duration: 0.35, ease: 'back.out(2)' })
}

function tick() {
  // Dot: near-instant. Ring: eased lag — the bit that feels expensive.
  ringPos.x += (pos.x - ringPos.x) * 0.16
  ringPos.y += (pos.y - ringPos.y) * 0.16
  if (dot.value) gsap.set(dot.value, { x: pos.x, y: pos.y })
  if (ring.value) gsap.set(ring.value, { x: ringPos.x, y: ringPos.y })
  raf = requestAnimationFrame(tick)
}

// --- Variant reactions -------------------------------------------------
import { watch } from 'vue'

const RING_SIZE = { default: 38, link: 64, view: 104, drag: 76, text: 56 }

watch(
  () => cursor.variant,
  (v) => {
    if (!ring.value || !dot.value) return
    const size = RING_SIZE[v] || RING_SIZE.default
    gsap.to(ring.value, {
      width: size,
      height: size,
      borderColor: v === 'default' ? 'rgba(139,127,113,0.45)' : 'rgba(176,141,87,0.75)',
      backgroundColor:
        v === 'default' ? 'rgba(176,141,87,0)' : v === 'view' ? 'rgba(176,141,87,0.10)' : 'rgba(176,141,87,0.06)',
      duration: 0.45,
      ease: 'power3.out'
    })
    gsap.to(dot.value, {
      scale: v === 'default' ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }
)

onMounted(() => {
  active.value = detectCursorSupport()
  if (!active.value) return

  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
  window.removeEventListener('mousedown', onDown)
  window.removeEventListener('mouseup', onUp)
  if (raf) cancelAnimationFrame(raf)
  resetCursor()
})
</script>

<template>
  <div v-if="active" class="pointer-events-none fixed inset-0 z-[200] hidden md:block" aria-hidden="true">
    <!-- Trailing ring -->
    <div
      ref="ring"
      class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0"
      :style="{
        width: RING_SIZE.default + 'px',
        height: RING_SIZE.default + 'px',
        borderColor: 'rgba(139,127,113,0.45)',
        marginLeft: -(RING_SIZE.default / 2) + 'px',
        marginTop: -(RING_SIZE.default / 2) + 'px',
        backdropFilter: 'blur(1.5px)'
      }"
    >
      <span
        v-show="cursor.label"
        class="absolute inset-0 flex items-center justify-center text-[0.58rem] uppercase tracking-widest2 text-brass-deep"
      >
        {{ cursor.label }}
      </span>
    </div>

    <!-- Leading dot -->
    <div
      ref="dot"
      class="absolute left-0 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass opacity-0"
      :style="{ marginLeft: '-3px', marginTop: '-3px' }"
    />
  </div>
</template>

<style>
/* Hide the native cursor only where the custom one is live */
html.has-custom-cursor,
html.has-custom-cursor * {
  cursor: none !important;
}
</style>
