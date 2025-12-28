document.addEventListener("DOMContentLoaded", () => {

  /* ===== Mobile Menu ===== */
  window.toggleMenu = function () {
    document.querySelector(".nav-links")?.classList.toggle("open");
  };

  /* ===== Scroll Reveal ===== */
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const h = window.innerHeight;
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < h - 100) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* ===== Typing Effect ===== */
  const typing = document.getElementById("typing");
  if (typing) {
    const words = [
      "Frontend Developer",
      "Python Full Stack Developer",
      "backend developer",
      "Problem Solver"
    ];
    let i = 0, j = 0, del = false;
    (function type() {
      typing.textContent = words[i].substring(0, j);
      if (!del && j < words[i].length) j++;
      else if (del && j > 0) j--;
      else {
        del = !del;
        if (!del) i = (i + 1) % words.length;
      }
      setTimeout(type, del ? 80 : 120);
    })();
  }

  /* ===== 🌗 Theme Toggle ===== */
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    const saved = localStorage.getItem("theme");
    if (saved === "light") document.body.classList.add("light");
    toggle.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      toggle.textContent = isLight ? "🌞" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  /* ===== ✨ Particle Background ===== */
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.querySelector(".hero").offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5
      });
    }

    (function animate() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "rgba(56,189,248,0.7)";
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    })();
  }

  /* ===== Hero Tilt (performance safe) ===== */
  const tilt = document.querySelector(".tilt");
  if (tilt && !("ontouchstart" in window)) {
    tilt.addEventListener("mousemove", e => {
      const r = tilt.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      tilt.style.transform = `rotateX(${(-y/r.height)*12}deg) rotateY(${(x/r.width)*12}deg)`;
    });
    tilt.addEventListener("mouseleave", () => {
      tilt.style.transform = "rotateX(0) rotateY(0)";
    });
  }

});
