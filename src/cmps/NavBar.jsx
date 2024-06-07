import { NavOptions } from "./NavOptions";
import { Library } from "./Library";
import { useContext } from "react";

import { useResizeDetector } from "react-resize-detector";
import { LayoutContext } from "../RootCmp";

export function NavBar() {
  const [Layout, setLayout] = useContext(LayoutContext);

  const { width, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: "throttle",
    refreshRate: 100,
    onResize,
    handleWidth: true,
  });

  function onResize() {
    setLayout({ nav: { width } });
    //resize
  }

  function setWidth(width) {
    width = width;
  }

  return (
    <section className="nav-bar" ref={ref}>
      <NavOptions />
      <Library width={width} />
    </section>
  );
}
