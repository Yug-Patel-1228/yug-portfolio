import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  const sections = gsap.utils.toArray<HTMLElement>(".portfolio-section");

  const contexts = sections.map((section) => {
    const label = section.querySelector<HTMLElement>(".section-label");
    const title = section.querySelector<HTMLElement>(".section-title");

    const content = section.querySelector<HTMLElement>(
      ".about-description, .work-placeholder, .skills-grid, .security-content, .journey-list, .contact-email",
    );

    const elements = [label, title, content].filter(
      (element): element is HTMLElement => element !== null,
    );

    if (elements.length === 0) {
      return null;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (label) {
        timeline.fromTo(
          label,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
        );
      }

      if (title) {
        timeline.fromTo(
          title,
          {
            y: 70,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }

      if (content) {
        timeline.fromTo(
          content,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }
    }, section);

    return context;
  });

  ScrollTrigger.refresh();

  return () => {
    contexts.forEach((context) => {
      context?.revert();
    });

    ScrollTrigger.refresh();
  };
}