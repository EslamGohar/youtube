import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (matchMediaQuery = "max-width: 768px") => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) setTargetReached(true);
    else setTargetReached(false);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(${matchMediaQuery})`);
    media.addEventListener("change", updateTarget);

    // callback is not called until a change occurs (when the window is resized)
    if (media.matches) setTargetReached(true);

    return () => media.removeEventListener("change", updateTarget);
  }, [matchMediaQuery, updateTarget]);

  return targetReached;
};
