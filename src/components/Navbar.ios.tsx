import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

type NavBarProps = BottomTabBarProps;

// basic right now as im working on android and dont want the render to fail

export default function NavBar({}: NavBarProps) {
  return <View />;
}
