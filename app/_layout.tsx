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
      >
        <Stack.Screen
          name="(modals)/add-run"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </LogFabProvider>
  );
}
