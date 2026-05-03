import type { ReactElement } from "react";
import { FiCpu } from "react-icons/fi";
import { TbBrandReactNative } from "react-icons/tb";
import { SiPython, SiJavascript } from "react-icons/si";

export const certIconMap: Record<string, ReactElement> = {
  algo: <FiCpu />,
  python: <SiPython />,
  reactnative: <TbBrandReactNative />,
  javascript: <SiJavascript />,
};
