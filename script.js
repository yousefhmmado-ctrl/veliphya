const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) document.querySelectorAll('animateTransform').forEach(a => a.remove());

function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
  if (reduce) return;
  (function frame(t) {
    const p = Math.min((t - t0) / 1800, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(frame);
  })(t0);
}

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  io.unobserve(e.target);
  e.target.classList.add('in');
  if (e.target.dataset.count) countUp(e.target);
}), { threshold: .15 });
document.querySelectorAll('.reveal, [data-count]').forEach(el => io.observe(el));

// mockup counters tick up to feel alive (illustration only)
if (!reduce) setInterval(() => document.querySelectorAll('[data-tick]').forEach(el => {
  el.textContent = (+el.textContent.replace(/,/g, '') + Math.ceil(Math.random() * el.dataset.tick)).toLocaleString('en-US');
}), 1800);
