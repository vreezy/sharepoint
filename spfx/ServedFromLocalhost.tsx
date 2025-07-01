import * as React from "react";
import { MainProps } from "../../webparts/medienspiegel/components/main/Main";
import { MessageBar, MessageBarType } from "@fluentui/react";

interface ServedFromLocalhost extends MainProps, React.PropsWithChildren<{}> {
  children?: React.ReactElement;
}

export function ServedFromLocalhost(
  props: ServedFromLocalhost
): React.ReactElement {
  if (props.context.isServedFromLocalhost) {
    return (
      <MessageBar isMultiline={true} messageBarType={MessageBarType.info}>
        <p>Served from Localhost</p>
        {props.children}
      </MessageBar>
    );
  }

  return <></>;
}
