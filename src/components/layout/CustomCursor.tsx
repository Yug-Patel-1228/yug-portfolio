import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");

    if (!mediaQuery.matches) {
      return;
    }

    const moveX = gsap.quickTo(cursor, "left", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "top", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleMouseEnter = () => {
      cursor.classList.add("cursor-visible");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("cursor-visible");
      cursor.classList.remove("cursor-hover");
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor]",
    );

    const handleInteractiveEnter = () => {
      cursor.classList.add("cursor-hover");
    };

    const handleInteractiveLeave = () => {
      cursor.classList.remove("cursor-hover");
    };

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleInteractiveEnter);
      element.addEventListener("mouseleave", handleInteractiveLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    document.documentElement.addEventListener(
      "mouseenter",
      handleMouseEnter,
    );

    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave,
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );

      interactiveElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          handleInteractiveEnter,
        );

        element.removeEventListener(
          "mouseleave",
          handleInteractiveLeave,
        );
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}

export default CustomCursor;