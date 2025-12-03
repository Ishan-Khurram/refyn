import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";

type NavBarProps = BottomTabBarProps;

// destructure props
// current tab index / route index
// per route options
// tab navigation methods

export default function NavBar({
  state,
  descriptors,
  navigation,
}: NavBarProps) {
  return (
    <View className="flex-row items-center justify-between bg-black px-4 py-2 border-t border-zinc-800">
      {/* get array of route objects of tabs */}
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const descriptor = descriptors[route.key];

        // ensure descriptor is not undefined, satisfy ts checks
        if (!descriptor) {
          return null;
        }

        const { options } = descriptor;

        // ensure type is string if i want to use it.
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
              ? options.title
              : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never); // cant infer exact param type, use backdoor only here.
          }
        };

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
  );
}
