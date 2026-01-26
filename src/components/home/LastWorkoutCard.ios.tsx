// components/home/LastWorkoutCard.ios.tsx
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { LAST_WORKOUT } from "./data";

export default function LastWorkoutCard() {
  const w = LAST_WORKOUT;

  return (
    <View
      className="rounded-2xl px-4 pt-4 pb-3 mt-4 mb-6"
      style={{
        backgroundColor: colors.card,
        shadowColor: "#000",
        shadowOpacity: 0.28,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 10 },
      }}
    >
      {/* Header */}
      <View className="mb-3">
        <Text className="text-white text-[19px] font-semibold">{w.title}</Text>
        <Text className="text-[12px] text-gray-300 mt-1">{w.startedAt}</Text>
      </View>

      {/* Time row */}
      <View className="flex-row items-center mb-3">
        <Text className="text-[16px] text-white">{w.elapsed}</Text>
      </View>

      {/* Metrics row */}
      <View className="flex-row justify-between mb-3 mt-3">
        <View className="min-w-[88px]">
          <Text className="text-[14px] text-gray-400">Pace</Text>
          <Text className="text-white text-[16px] mt-1">{w.pace}</Text>
        </View>

        <View className="min-w-[88px] items-center">
          <Text className="text-[14px] text-gray-400">Distance</Text>
          <Text className="text-white text-[16px] mt-1">{w.distanceKm} km</Text>
        </View>

        <View className="min-w-[88px] items-end">
          <Text className="text-[14px] text-gray-400">Heart Rate</Text>
          <Text className="text-white text-[16px] mt-1">❤️ {w.heartRate}</Text>
        </View>
      </View>

      {/* Divider (subtle, iOS-friendly) */}
      <View className="h-px bg-white/10 mb-3" />

      {/* Tag pill */}
      <View className="flex-row justify-end">
        <View className="px-3 py-1 rounded-full bg-zinc-800">
          <Text className="text-[12px] text-gray-200">{w.kind}</Text>
        </View>
      </View>
    </View>
  );
}
