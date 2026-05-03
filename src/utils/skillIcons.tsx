import type { ReactElement } from "react";
import {
  SiReact,
  SiTypescript,
  SiRedux,
  SiFirebase,
  SiTailwindcss,
  SiVite,
  SiGithub,
  SiPostman,
  SiFigma,
  SiExpo,
  SiJavascript,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FiZap, FiTool, FiCloud, FiCode } from "react-icons/fi";
import { MdAnimation } from "react-icons/md";

export const skillIconMap: Record<string, ReactElement> = {
  reactnative: <TbBrandReactNative />,
  react: <SiReact />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  redux: <SiRedux />,
  firebase: <SiFirebase />,
  tailwind: <SiTailwindcss />,
  github: <SiGithub />,
  figma: <SiFigma />,
  postman: <SiPostman />,
  expo: <SiExpo />,
  vite: <SiVite />,
  api: <FiCode />,
  websocket: <FiZap />,
  performance: <FiZap />,
  animation: <MdAnimation />,
  cloud: <FiCloud />,
  tools: <FiTool />,
};
