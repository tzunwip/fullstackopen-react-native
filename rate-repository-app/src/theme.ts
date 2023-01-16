import { Platform } from "react-native";

const theme = {
  colors: {
    viewPrimary: "#24292e",
    viewSecondary: "#0366d6",
    viewPrimaryText: "#FFFFFF",
    viewSecondaryText: "#FFFFFF",
    textPrimary: "#000000",
    textSecondary: "#586069",
    error: "#d73a4a",
    green: "#2dc937",
    lightGreen: "#99c140",
    amber: "#e7b416",
    orange: "#db7b2b",
    red: "#cc3232",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
