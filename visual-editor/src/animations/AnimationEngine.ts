// AnimationEngine.ts
// Pure CSS + data-attribute animation runtime
// Works in preview mode and live mode

export class AnimationEngine {
  private static instance: AnimationEngine | null = null;
  private observer: IntersectionObserver | null = null;

  static init() {
    if (!AnimationEngine.instance) {
      AnimationEngine.instance = new AnimationEngine();
      AnimationEngine.instance.start();
    }
  }

  start() {
    this.setupIntersectionObserver();
    this.applyLoadAnimations();
    this.applyScrollAnimations();
    this.applyHoverAnimations();
  }

  // ------------------------------------------------------------
  // 1. ON-LOAD animations
  // ------------------------------------------------------------
  applyLoadAnimations() {
    const elements = document.querySelectorAll("[data-anim-trigger='on-load']");
    elements.forEach((el) => {
      this.applyCSSVars(el as HTMLElement);
      requestAnimationFrame(() => {
        el.classList.add("anim-active");
      });
    });
  }

  // ------------------------------------------------------------
  // 2. ON-VISIBLE animations (IntersectionObserver)
  // ------------------------------------------------------------
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            this.applyCSSVars(el);
            el.classList.add("anim-active");

            const loop = el.getAttribute("data-anim-loop") === "true";
            if (!loop) {
              this.observer?.unobserve(el);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
      "[data-anim-trigger='on-visible']"
    );
    elements.forEach((el) => this.observer?.observe(el));
  }

  // ------------------------------------------------------------
  // 3. ON-SCROLL animations (scroll-speed, scroll-progress)
  // ------------------------------------------------------------
  applyScrollAnimations() {
    const elements = document.querySelectorAll(
      "[data-anim-trigger='on-scroll']"
    );

    if (elements.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;

        const speed = Number(el.getAttribute("data-anim-speed") || 1);
        const threshold = Number(el.getAttribute("data-anim-threshold") || 0);

        const type = el.getAttribute("data-anim");

        if (type === "parallax") {
          const offset = (scrollY - top) * speed;
          el.style.transform = `translateY(${offset}px)`;
        }

        if (type === "scroll-speed") {
          const offset = (scrollY - top) * speed;
          el.style.transform = `translateY(${offset}px)`;
        }

        if (type === "scroll-progress") {
          const progress =
            (scrollY + viewportHeight - top) / (viewportHeight + rect.height);

          if (progress > threshold) {
            this.applyCSSVars(el as HTMLElement);
            el.classList.add("anim-active");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // ------------------------------------------------------------
  // 4. HOVER animations
  // ------------------------------------------------------------
  applyHoverAnimations() {
    const elements = document.querySelectorAll("[data-anim='hover']");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.applyCSSVars(el as HTMLElement);
        el.classList.add("anim-active");
      });

      el.addEventListener("mouseleave", () => {
        el.classList.remove("anim-active");
      });
    });
  }

  // ------------------------------------------------------------
  // Helper: Apply CSS variables for duration, delay, easing
  // ------------------------------------------------------------
  applyCSSVars(el: HTMLElement) {
    const duration = el.getAttribute("data-anim-duration") || "600";
    const delay = el.getAttribute("data-anim-delay") || "0";
    const easing = el.getAttribute("data-anim-easing") || "ease-out";

    el.style.setProperty("--anim-duration", `${duration}ms`);
    el.style.setProperty("--anim-delay", `${delay}ms`);
    el.style.setProperty("--anim-easing", easing);
  }
}