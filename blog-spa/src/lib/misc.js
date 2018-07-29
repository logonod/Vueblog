export function offset (el) {
  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset ||
    window.document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset ||
    window.document.documentElement.scrollTop
  return { top: rect.top + scrollTop,
    left: rect.left + scrollLeft }
}

export function findAncestor (el, sel) {
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel))) {}
  return el
}
