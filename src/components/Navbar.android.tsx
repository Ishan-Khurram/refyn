import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLogFab } from "./logging/useLogFab";

type NavBarProps = BottomTabBarProps;

export default function NavBar({
  state,
  descriptors,
  navigation,
}: NavBarProps) {
  const { toggle } = useLogFab();
  return (
    <SafeAreaView edges={[]}>
      <View className="mb-8 rounded-2xl bg-[#0D0907] flex-row items-center justify-between px-4 py-6 shadow-lg shadow-black/40">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const descriptor = descriptors[route.key];

          if (!descriptor) {
            return null;
          }

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
                className="flex-1 items-center -mt-8"
                activeOpacity={0.9}
              >
                <View
                  className={
                    isFocused
                      ? "w-16 h-16 rounded-full bg-emerald-500 items-center justify-center"
                      : "w-16 h-16 rounded-full bg-zinc-800 items-center justify-center"
                  }
                >
                  <Text className="text-white text-2xl font-bold">+</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
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
