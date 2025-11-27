import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  });

  return <>{children}</>;
}
