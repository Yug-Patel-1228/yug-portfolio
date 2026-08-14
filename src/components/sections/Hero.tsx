import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Scene from "../three/Scene";

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-eyebrow", {
          y: 24,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.4",
        )
        .from(
          ".hero-role",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5",
        )
        .from(
          ".hero-scroll",
          {
            y: 15,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3",
        );
    },
    {
      scope: heroRef,
    },
  );

  return (
    <section ref={heroRef} className="hero">
      <Scene />
      <div className="hero-content">
        <p className="hero-eyebrow">HELLO, I'M</p>

        <h1 className="hero-title">YUG</h1>

        <p className="hero-role">
          <span>SOFTWARE DEVELOPER</span>
          <span className="hero-role-dot">•</span>
          <span>OFFENSIVE SECURITY</span>
        </p>
      </div>

      <div className="hero-scroll">
        <span>SCROLL</span>
        <span className="hero-scroll-arrow">↓</span>
      </div>
    </section>
  );
}

export default Hero;