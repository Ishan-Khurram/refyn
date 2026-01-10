import "../global.css";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { LogFabProvider } from "../src/components/logging/LogFabContext";

export default function RootLayout() {
  return (
    <LogFabProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0D0907" }, // global background
        }}
      />
    </LogFabProvider>
  );
}
