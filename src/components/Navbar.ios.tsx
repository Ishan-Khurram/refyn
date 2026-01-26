import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLogFab } from "./logging/useLogFab";

type NavBarProps = BottomTabBarProps;

export default function NavBar({
  state,
  descriptors,
  navigation,
}: NavBarProps) {
  const { toggle } = useLogFab();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={[]}>
      <View
        className="mx-1 rounded-2xl bg-[#0D0907] flex-row items-center justify-between px-4 pt-3"
        style={{
          paddingBottom: 25,
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 10 },
        }}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const descriptor = descriptors[route.key];
          if (!descriptor) return null;

          const { options } = descriptor;

          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
                ? options.title
                : route.name;

          const isLoggingTab = route.name === "logging";

          const onPress = () => {
            if (isLoggingTab) {
              toggle();
              return;
            }

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          if (isLoggingTab) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                activeOpacity={0.9}
                className="flex-1 items-center"
                style={{ marginTop: -10 }} // iOS: less aggressive lift than Android
              >
                <View
                  className={
                    isFocused
                      ? "w-16 h-16 rounded-full bg-emerald-500 items-center justify-center"
                      : "w-16 h-16 rounded-full bg-emerald-500 items-center justify-center"
                  }
                >
                  <Text className="text-white text-3xl font-bold">+</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.9}
              className="flex-1 items-center"
            >
              <Text
                className={
                  isFocused
                    ? "text-white text-xs font-semibold"
                    : "text-zinc-400 text-xs"
                }
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
