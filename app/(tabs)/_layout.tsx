import "../../global.css";
import { Tabs } from "expo-router";
import NavBar from "../../src/components/Navbar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <NavBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="runs" options={{ title: "Runs" }} />
      <Tabs.Screen name="logging" options={{ title: "" }} />
      <Tabs.Screen name="lifts" options={{ title: "Lifts" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
