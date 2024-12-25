import { DefaultTheme, type Theme  } from "@react-navigation/native";

export const palette = {
  primary: "#0564d4",
  secondary: "#ff6a00",
  background: "#f6f8fa",
  white: "#fff",
  black: "#101214",
  button: "#1c1e21",
  shadow: "#757575",
  text: "#30363b",
  borderColor: "#d0d7de",
  borderColorDark: "#333942",
  placeholder: "#a1a1a1",
  danger: "rgb(208, 2, 27)",
  title: "rgb(102, 102, 102)",
  separator: "rgb(194, 194, 195)",
  highlight: "rgb(199, 198, 203)",
  blackOverlay: "rgba(0,0,0,0.6)",
  iconWhite: "#fff",
  iconBlack: "#101214",
  dynamicWhite: "#fff",
  dynamicBlack: "#1c1e21",
  dynamicBackground: "#fff",
  transparent: "transparent",
  calpyse: "#2b7488",
  regisColorText: "FEB7C3",
  regisColorButton: "FFAEBC",

};

export const LightTheme: Theme  = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        ...palette,
    },
    fonts: {
        regular: {
            fontFamily: "",
            fontWeight: "normal"
        },
        medium: {
            fontFamily: "",
            fontWeight: "normal"
        },
        bold: {
            fontFamily: "",
            fontWeight: "normal"
        },
        heavy: {
            fontFamily: "",
            fontWeight: "normal"
        }
    }
};

export const DarkTheme: Theme  = {
  ...DefaultTheme,
  colors: {
    ...LightTheme.colors,
    background: palette.black,
    text: palette.white,
  },
};
