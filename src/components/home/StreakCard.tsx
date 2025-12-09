import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import { STREAK_DAYS, STREAK_DAYS_ARRAY } from "./data";
import HorizontalRule from "../HorizontalRule";

export function StreakCard() {
  return (
    <View
      className="rounded-2xl p-4 mt-4"
      style={{ backgroundColor: colors.card }}
    >
      {/* Days row */}
      <View className="flex-row justify-between mb-3">
        {STREAK_DAYS_ARRAY.map((_, idx) => (
          <View key={idx} className="items-center flex-1">
            <Text className="text-lg text-gray-300">{"SMTWTFS"[idx]}</Text>
            <View
              className="mt-3 h-10 w-10 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
          </View>
        ))}
      </View>

      {/* Streak + button */}
      <View className="flex-row items-center justify-between mb-1 mt-3">
        <Text className="text-white text-3xl font-semibold">
          Streak: {STREAK_DAYS} days
        </Text>
        <TouchableOpacity
          className="px-6 py-1 rounded-full"
          style={{ backgroundColor: colors.accent }}
        >
          <Text className="text-md font-semibold text-white">Add Activity</Text>
        </TouchableOpacity>
      </View>
      <HorizontalRule />

      {/* Subtext */}
      <Text className="text-lg font-semibold text-gray-300">
        Streak dies in 14h 22m
      </Text>
      <Text className="text-md text-gray-400 mt-1">
        Keep your streak alive.
      </Text>
    </View>
  );
}
