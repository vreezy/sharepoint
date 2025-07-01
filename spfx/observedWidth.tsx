import * as React from "react";

export function PbserveWidth(): React.ReactElement {

  const [width, setWidth] = React.useState(0);
  const observedSection = React.useRef<HTMLElement>(null);

  React.useEffect(
    () => {
      if (!observedSection.current) {
        // we do not initialize the observer unless the ref has
        // been assigned
        return;
      }

      // we also instantiate the resizeObserver and we pass
      // the event handler to the constructor
      const resizeObserver = new ResizeObserver(() => {
        if (
          observedSection.current &&
          observedSection.current.offsetWidth &&
          observedSection.current.offsetWidth !== width
        ) {
          setWidth(observedSection.current.offsetWidth);
        }
      });

      // the code in useEffect will be executed when the component
      // has mounted, so we are certain observedDiv.current will contain
      // the div we want to observe
      resizeObserver.observe(observedSection.current);

      // if useEffect returns a function, it is called right before the
      // component unmounts, so it is the right place to stop observing
      // the div
      return function cleanup() {
        resizeObserver.disconnect();
      };
    },
    // only update the effect if the ref element changed
    [observedSection.current]
  );

  const isMobile = width < 600;


  return (
    <div ref={observedSection}>
      {isMobile ? "ja" : "nein"}
    </div>
  );
}
