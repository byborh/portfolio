import { ref, onMounted, onBeforeUnmount } from 'vue'

// True while the element is on screen. Animations use it to run only when someone can see them.
export function useVisible(target, threshold = 0.35) {
  const visible = ref(false)
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => (visible.value = entry.isIntersecting), { threshold })
    observer.observe(target.value)
  })
  onBeforeUnmount(() => observer.disconnect())

  return visible
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
