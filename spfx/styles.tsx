import {
  createTheme,
  IButtonStyles,
  IIconProps,
  IPalette,
  IStackTokens,
  ITheme,
} from "@fluentui/react";

export interface CustomWindow extends Window {
  __themeState__: {
    theme: unknown;
  };
}

declare let window: CustomWindow;

const ThemeColorsFromWindow = window.__themeState__.theme;
export const siteTheme: ITheme = createTheme({
  palette: ThemeColorsFromWindow as Partial<IPalette>,
});

export const itemContainerStackStyles = {
  root: {
    cursor: "Pointer",
    backgroundColor: siteTheme.palette.neutralLight,
  },
};

const titleFontStyles = {
  fontSize: "1rem",
  fontWeight: "600",
};

const overFlowTwoLineStyles = {
  // "-webkit-line-clamp": "2",
  "-webkit-box-orient": "vertical",
  display: "-webkit-box",
  textOverflow: "ellipsis",
  wordBreak: "break-word",
};

const overFlowMultiLineStyles = {
  "-webkit-line-clamp": "5",
  "-webkit-box-orient": "vertical",
  display: "-webkit-box",
  textOverflow: "ellipsis",
};


export const calendarIcon: IIconProps = { iconName: "Calendar" };
export const newsIcon: IIconProps = { iconName: "News" };
export const openInNewWindow: IIconProps = { iconName: "OpenInNewWindow" };

export const metaDataStackTokens: IStackTokens = {
  childrenGap: 10,
};

export const disabledButtonButWithPrimaryStyles: IButtonStyles = {
  root: {
    height: "unset",
    margin: 0,
    padding: 0,
  },
  label: {
    textAlign: "left",
  },
  icon: {
    margin: 0,
  },
  rootDisabled: {
    cursor: "Pointer",
    color: siteTheme.palette.themePrimary,
  },
};

