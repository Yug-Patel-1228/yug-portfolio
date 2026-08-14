import gsap from "gsap";

export type SceneScrollState = {
  progress: number;
};

export function initSceneScrollController(
  state: SceneScrollState,
) {
  const updateProgress = () => {
    const hero = document.querySelector(".hero");

    if (!hero) {
      state.progress = 0;
      return;
    }

    const heroHeight = hero.getBoundingClientRect().height;

    if (heroHeight <= 0) {
      state.progress = 0;
      return;
    }

    /*
     * Calculate progress based only on the Hero.
     *
     * 0 = Hero is at the top
     * 1 = Hero has completely left the screen
     */

    const progress = window.scrollY / heroHeight;

    state.progress = gsap.utils.clamp(
      0,
      1,
      progress,
    );
  };

  updateProgress();

  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true },
  );

  window.addEventListener(
    "resize",
    updateProgress,
  );

  return () => {
    window.removeEventListener(
      "scroll",
      updateProgress,
    );

    window.removeEventListener(
      "resize",
      updateProgress,
    );
  };
}