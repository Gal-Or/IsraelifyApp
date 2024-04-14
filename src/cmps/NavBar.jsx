import { NavOptions } from "./NavOptions";
import { Library } from "./Library";

import { useResizeDetector } from "react-resize-detector";

export function NavBar() {
  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: "throttle",
    refreshRate: 100,
    onResize,
    handleWidth: true,
    handleHeight: false,
  });

  function onResize() {
    console.log("width", width);
  }

  return (
    <section className="nav-bar" ref={ref}>
      <NavOptions />
      <Library width={width} />
    </section>
  );
}
