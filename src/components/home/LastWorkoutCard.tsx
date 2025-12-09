// components/home/LastWorkoutCard.tsx
import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { LAST_WORKOUT } from "./data";

export function LastWorkoutCard() {
  const w = LAST_WORKOUT;

  return (
    <View
      className="rounded-2xl p-4 mt-4 mb-6"
      style={{ backgroundColor: colors.card }}
    >
      <Text className="text-white text-xl font-semibold mb-1">{w.title}</Text>
      <Text className="text-xs text-gray-300 mb-3">{w.startedAt}</Text>

      {/* Time row */}
      <View className="flex-row items-center mb-3">
        <Text className="text-base text-white mr-2">{w.elapsed}</Text>
      </View>

      {/* Metrics grid */}
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className="text-[11px] text-gray-400">Pace</Text>
          <Text className="text-white text-sm">{w.pace}</Text>
        </View>
        <View>
          <Text className="text-[11px] text-gray-400">Distance</Text>
          <Text className="text-white text-sm">{w.distanceKm} km</Text>
        </View>
        <View>
          <Text className="text-[11px] text-gray-400">Heart Rate</Text>
          <Text className="text-white text-sm">❤️ {w.heartRate}</Text>
        </View>
      </View>

      {/* Tag pill */}
      <View className="items-end">
        <View
          className="px-4 py-1 rounded-full"
          style={{ backgroundColor: "#2b2b2b" }}
        >
          <Text className="text-xs text-gray-300">{w.kind}</Text>
        </View>
      </View>
    </View>
  );
}
