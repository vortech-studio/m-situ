import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function LoadingBar() {
  const loadingBarRef = useRef(null);

  useEffect(() => {
    const loadingBar = loadingBarRef.current;
    gsap.fromTo(
      loadingBar,
      { scaleX: 0 },
      {
        duration: 2,
        scaleX: 1,
        translateX: "100%",
        repeat: -1,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={loadingBarRef}
        className="h-1.5 w-full origin-left scale-x-0 bg-primary"
      ></div>
    </div>
  );
}

export default LoadingBar;
