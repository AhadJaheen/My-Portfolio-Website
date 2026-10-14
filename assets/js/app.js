// Live clock, typing effect, counters, skill bars, scroll progress
(() => {
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];

  const clock = $("#live-clock");
  if (clock) {
    const tick = () => clock.textContent = new Date().toLocaleString("en-US", {
      weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    tick(); setInterval(tick, 1000);
  }

  const bar = $("#progress");
  window.addEventListener("scroll", () => {
    if (bar) bar.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight || 1)) * 100 + "%";
  });

  const typed = $("#typed");
  if (typed) {
    const words = typed.dataset.words.split("|");
    let w = 0, c = 0, del = false;
    (function type() {
      const word = words[w];
      typed.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(type, 1500); }
      if (del && c === 0) { del = false; w = (w + 1) % words.length; }
      c += del ? -1 : 1;
      setTimeout(type, del ? 45 : 90);
    })();
  }

  const onView = (els, fn) => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } }), { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  };

  onView($$("[data-count]"), (el) => {
    const end = +el.dataset.count, suffix = el.dataset.suffix || "", t0 = performance.now();
    (function step(t) {
      const p = Math.min((t - t0) / 1500, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  });

  const bars = $$(".progress span");
  bars.forEach((b) => { b.dataset.w = b.style.width; b.style.width = "0"; });
  onView(bars, (b) => { b.style.width = b.dataset.w; });
})();

// Dynamic footer: year, greeting, date, active link
(() => {
  const now = new Date(), h = now.getHours();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set("sf-year", now.getFullYear());
  set("sf-greeting", h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
  set("sf-date", now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sf-nav a").forEach((a) => {
    if (a.getAttribute("href").endsWith(page)) a.classList.add("active");
  });
})();
