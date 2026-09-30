/**
 * The layer that makes a screen recording look like a product demo: a visible
 * cursor, click ripples, a spotlight that dims everything but the thing being
 * talked about, a chapter chip and captions. It is injected into every page of
 * the recording and lives in a shadow root, so it never touches the app's own
 * styles or its React tree.
 *
 * Plain JavaScript in a string because it runs inside the browser page.
 */
export const OVERLAY_SCRIPT = String.raw`(() => {
  if (window.top !== window || window.__demo) return
  const state = { x: -100, y: -100, caption: null, chip: null, spot: null }
  try {
    const saved = JSON.parse(sessionStorage.getItem('__demo_cursor') || 'null')
    if (saved) { state.x = saved.x; state.y = saved.y }
  } catch (e) {}

  const css = ` + "`" + String.raw`
    :host { all: initial }
    * { box-sizing: border-box }
    .cursor { position: fixed; left: 0; top: 0; width: 26px; height: 26px; margin: -3px 0 0 -3px;
      filter: drop-shadow(0 2px 3px rgba(0,0,0,.35)); will-change: transform; transition: opacity .2s }
    .ripple { position: fixed; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%;
      border: 3px solid rgba(11,114,133,.9); background: rgba(11,114,133,.18);
      animation: ripple .55s ease-out forwards }
    @keyframes ripple { to { transform: scale(4.2); opacity: 0 } }
    .dim { position: fixed; inset: 0; background: rgba(9,20,28,.34); opacity: 0; transition: opacity .35s ease;
      clip-path: none }
    .ring { position: fixed; border-radius: 12px; border: 3px solid #0b7285; opacity: 0;
      box-shadow: 0 0 0 4px rgba(255,255,255,.85), 0 0 0 9999px rgba(9,20,28,.34);
      transition: all .38s cubic-bezier(.2,.8,.2,1) }
    .label { position: fixed; max-width: 420px; padding: 9px 14px; border-radius: 10px; background: #0b7285; color: #fff;
      font: 500 15px/1.35 "IBM Plex Sans", system-ui, sans-serif; box-shadow: 0 8px 24px rgba(0,0,0,.25);
      opacity: 0; transform: translateY(4px); transition: opacity .3s ease, transform .3s ease }
    .label.on { opacity: 1; transform: none }
    .chip { position: fixed; top: 64px; left: 50%; transform: translate(-50%, -10px); display: flex; gap: 12px; align-items: center;
      padding: 10px 20px 10px 12px; border-radius: 999px; background: rgba(9,20,28,.9); color: #fff;
      font: 500 16px/1 "IBM Plex Sans", system-ui, sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,.28);
      opacity: 0; transition: opacity .4s ease, transform .4s ease }
    .chip.on { opacity: 1; transform: translate(-50%, 0) }
    .chip b { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #0b7285;
      font: 600 13px/1 "IBM Plex Sans", system-ui, sans-serif }
    .caption { position: fixed; left: 50%; bottom: 34px; transform: translate(-50%, 6px); max-width: 1040px; padding: 12px 22px;
      border-radius: 12px; background: rgba(9,20,28,.84); color: #fff; text-align: center;
      font: 500 20px/1.4 "IBM Plex Sans", system-ui, sans-serif; opacity: 0; transition: opacity .3s ease, transform .3s ease }
    .caption.on { opacity: 1; transform: translate(-50%, 0) }
  ` + "`" + String.raw`

  let host, root, el = {}
  const cursorSvg = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M3 2l7.6 19 2.6-7.8L21 10.6z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>'

  function place() {
    if (!el.cursor) return
    el.cursor.style.transform = 'translate(' + state.x + 'px,' + state.y + 'px)'
    el.cursor.style.opacity = state.x < 0 ? '0' : '1'
  }
  function paint() {
    if (!el.caption) return
    el.caption.textContent = state.caption || ''
    el.caption.classList.toggle('on', !!state.caption)
    if (state.chip) {
      el.chip.innerHTML = '<b>' + state.chip.n + '</b><span>' + state.chip.title + '</span>'
    }
    el.chip.classList.toggle('on', !!state.chip)
    const s = state.spot
    if (s) {
      const pad = 8
      Object.assign(el.ring.style, { left: s.x - pad + 'px', top: s.y - pad + 'px', width: s.w + pad * 2 + 'px', height: s.h + pad * 2 + 'px', opacity: '1' })
      if (s.label) {
        el.label.textContent = s.label
        const below = s.y + s.h + pad + 14
        const fitsBelow = below + 60 < innerHeight
        el.label.style.top = (fitsBelow ? below : Math.max(12, s.y - pad - 14 - 44)) + 'px'
        el.label.style.left = Math.max(12, Math.min(s.x, innerWidth - 440)) + 'px'
        el.label.classList.add('on')
      } else el.label.classList.remove('on')
    } else {
      el.ring.style.opacity = '0'
      el.label.classList.remove('on')
    }
  }
  function mount() {
    if (host && host.isConnected) return
    host = document.createElement('div')
    host.id = '__demo-host'
    host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;pointer-events:none'
    root = host.attachShadow({ mode: 'open' })
    root.innerHTML = '<style>' + css + '</style><div class="ring"></div><div class="label"></div><div class="chip"></div><div class="caption"></div><div class="cursor">' + cursorSvg + '</div>'
    el = { ring: root.querySelector('.ring'), label: root.querySelector('.label'), chip: root.querySelector('.chip'), caption: root.querySelector('.caption'), cursor: root.querySelector('.cursor') }
    document.documentElement.appendChild(host)
    place(); paint()
    window.__demo.ready = true
  }
  function ripple(x, y) {
    if (!root) return
    const r = document.createElement('div')
    r.className = 'ripple'
    r.style.left = x + 'px'; r.style.top = y + 'px'
    root.appendChild(r)
    setTimeout(() => r.remove(), 700)
  }

  window.addEventListener('mousemove', (e) => {
    state.x = e.clientX; state.y = e.clientY
    place()
    try { sessionStorage.setItem('__demo_cursor', JSON.stringify({ x: state.x, y: state.y })) } catch (err) {}
  }, true)
  window.addEventListener('mousedown', (e) => ripple(e.clientX, e.clientY), true)

  window.__demo = {
    ready: false,
    caption(text) { state.caption = text || null; paint() },
    chip(chip) { state.chip = chip || null; paint() },
    spot(rect, label) { state.spot = rect ? { x: rect.x, y: rect.y, w: rect.w, h: rect.h, label: label || null } : null; paint() },
    snapshot() { return { caption: state.caption, chip: state.chip, spot: state.spot } },
  }

  // Mount after the app has hydrated, so React never sees a stranger in <html>.
  const start = () => { setTimeout(mount, 450); setInterval(mount, 600) }
  if (document.readyState === 'complete') start()
  else window.addEventListener('load', start)
})()`
