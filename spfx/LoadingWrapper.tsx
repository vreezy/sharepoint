import * as React from "react";
import { Shimmer, Stack } from "@fluentui/react";

interface LoadingWrapperProps extends React.PropsWithChildren<{}> {
  loading: boolean;
}
export function LoadingWrapper(props: LoadingWrapperProps) {
  if (props.loading) {
    return (
      <Stack tokens={itemContainerStackTokens}>
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </Stack>
    );
  }

  return props.children;
}
