import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import { STREAK_DAYS, STREAK_DAYS_ARRAY } from "./data";
import HorizontalRule from "../HorizontalRule";

export default function StreakCard() {
  return (
    <View
      className="rounded-2xl px-4 pt-4 pb-3 mt-4"
      style={{
        backgroundColor: colors.card,
        shadowColor: "#000",
        shadowOpacity: 0.22,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 10 },
      }}
    >
      {/* Days row */}
      <View className="flex-row justify-between">
        {STREAK_DAYS_ARRAY.map((_, idx) => (
          <View key={idx} className="items-center flex-1">
            <Text className="text-[15px] text-gray-300 font-medium">
              {"SMTWTFS"[idx]}
            </Text>
            <View
              className="mt-2 h-9 w-9 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
          </View>
        ))}
      </View>

      {/* Streak + button */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-white text-2xl font-semibold">
          Streak: {STREAK_DAYS} days
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: colors.accent }}
        >
          <Text className="text-[13px] font-semibold text-white">
            Add Activity
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-3">
        <HorizontalRule />
      </View>

      {/* Subtext */}
      <View className="mt-3">
        <Text className="text-[15px] font-semibold text-gray-300">
          Streak dies in 14h 22m
        </Text>
        <Text className="text-[13px] text-gray-400 mt-1">
          Keep your streak alive.
        </Text>
      </View>
    </View>
  );
}
