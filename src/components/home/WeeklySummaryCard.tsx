import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { WEEKLY_POINTS } from "./data";

export function WeeklySummaryCard() {
  const totalDistance = WEEKLY_POINTS.reduce((sum, p) => sum + p.distanceKm, 0);

  return (
    <View
      className="rounded-2xl p-4 mt-4"
      style={{ backgroundColor: colors.card }}
    >
      {/* Fake chart area */}
      <View
        className="h-44 mb-3 rounded-xl justify-end"
        style={{ backgroundColor: colors.grid }}
      >
        {/* x-axis labels */}
        <View className="flex-row justify-between px-7 pb-2">
          {WEEKLY_POINTS.map((p, idx) => (
            <Text key={idx} className="text-[11px] text-gray-300">
              {p.day === "T2" ? "T" : p.day === "S2" ? "S" : p.day}
            </Text>
          ))}
        </View>
      </View>

      {/* y-axis labels */}
      <View></View>

      {/* Totals row */}
      <View className="flex-row justify-between">
        <View>
          <Text className="text-[11px] text-gray-400">Total Distance:</Text>
          <Text className="text-white text-2xl font-semibold mt-1">
            {totalDistance.toFixed(1)} km
          </Text>
        </View>
        <View>
          <Text className="text-[11px] text-gray-400 text-right">
            Total Time:
          </Text>
          <Text className="text-white text-2xl font-semibold mt-1 text-right">
            5h 32m
          </Text>
        </View>
      </View>
    </View>
  );
}
