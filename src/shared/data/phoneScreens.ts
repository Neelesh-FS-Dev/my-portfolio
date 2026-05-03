import type { PhoneScreens } from "../types";

const defaultScreen = {
  bg: "linear-gradient(180deg, #0a0a0a 0%, #141414 100%)",
  bars: ["#3b82f6", "#3b82f6", "#3b82f6"] as [string, string, string],
  title: "App",
  subtitle: "Today's Activity",
};

const phoneScreens: PhoneScreens = {
  "#3b82f6": defaultScreen,
  "#00e5ff": defaultScreen,
  "#7c4dff": defaultScreen,
  "#ff6b35": defaultScreen,
  "#00ff88": defaultScreen,
};

export default phoneScreens;
