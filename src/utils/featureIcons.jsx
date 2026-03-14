import {
  FiZap,
  FiMessageSquare,
  FiLayers,
  FiShoppingCart,
  FiBell,
  FiLock,
  FiTool,
  FiSmartphone,
  FiVideo,
} from "react-icons/fi";
import {
  MdArchitecture,
  MdAnimation,
  MdSchool,
  MdBuild,
  MdSwapHoriz,
} from "react-icons/md";

import { SiZoom } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { BsController, BsBoxSeam } from "react-icons/bs";
import { RiCameraLensFill } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";

export const featureIconMap = {
  audio: <FiZap />,
  chat: <FiMessageSquare />,
  features: <FiLayers />,
  performance: <FiZap />,
  video: <FiVideo />,
  gamification: <BsController />,
  cart: <FiShoppingCart />,
  ar: <RiCameraLensFill />,
  notification: <FiBell />,
  bundle: <BsBoxSeam />,
  catering: <IoFastFoodOutline />,
  mobile: <FiSmartphone />,
  auth: <FiLock />,
  tools: <FiTool />,
  cloud: <FiTool />,
  api: <FiZap />,
  websocket: <FiZap />,
  reactnative: <TbBrandReactNative />,
  architecture: <MdArchitecture />,
  animation: <MdAnimation />,
  content: <MdSchool />,
  instructor: <MdSchool />,
  build: <MdBuild />,
  migration: <MdSwapHoriz />,
};
