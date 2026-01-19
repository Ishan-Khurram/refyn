import React from "react";
import { View, ScrollView, Text, useWindowDimensions } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from "victory-native";
import type { WeeklyPoint } from "./types";
import { colors } from "../../theme/colors";
import { WEEKLY_POINTS } from "./data";

type WeeklyMileageChartProps = {
  data: WeeklyPoint[];
};

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

const totalDistance = WEEKLY_POINTS.reduce((sum, p) => sum + p.distanceKm, 0);

export function WeeklyMileageChart({ data }: WeeklyMileageChartProps) {
  const { width } = useWindowDimensions();

  // Card has horizontal padding + margins, so give the chart a safe width.
  const chartWidth = Math.min(380, Math.max(320, width - 32 - 32));
  const chartHeight = 210;

  const victoryData = data.map((point, index) => ({
    x: index,
    y: point.distanceKm,
  }));

  return (
    <ScrollView>
      <View
        className="rounded-2xl px-4 pt-4 pb-3 mt-4 w-full"
        style={{
          backgroundColor: colors.card,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 10 },
        }}
      >
        <View className="items-center">
          <VictoryChart
            padding={{ top: 10, bottom: 36, left: 48, right: 10 }}
            domainPadding={{ x: 10, y: 10 }}
            height={chartHeight}
            width={chartWidth}
          >
            <VictoryAxis
              tickValues={[0, 1, 2, 3, 4, 5, 6]}
              tickFormat={(t) => weekdayLabels[t]}
              style={{
                tickLabels: { fontSize: 12, fill: "#a1a1aa" },
                axis: { stroke: "#52525b" },
              }}
            />

            <VictoryAxis
              dependentAxis
              tickFormat={(t) => `${t} km`}
              style={{
                tickLabels: { fontSize: 12, fill: "#a1a1aa" },
                axis: { stroke: "#52525b" },
                grid: { stroke: "#3f3f46", strokeDasharray: "4,4" },
              }}
            />

            <VictoryLine
              data={victoryData}
              interpolation="linear"
              style={{
                data: {
                  stroke: "#FF3B3B",
                  strokeWidth: 3,
                },
              }}
            />

            <VictoryScatter
              data={victoryData}
              size={2.25}
              style={{
                data: {
                  fill: "#FF3B3B",
                  stroke: "#fff",
                  strokeWidth: 0.6,
                },
              }}
            />
          </VictoryChart>
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-1">
            <Text className="text-[11px] text-gray-400">Total Distance</Text>
            <Text className="text-white text-[22px] font-semibold mt-1">
              {totalDistance.toFixed(1)} km
            </Text>
          </View>

          <View className="flex-1 items-end">
            <Text className="text-[11px] text-gray-400">Total Time</Text>
            <Text className="text-white text-[22px] font-semibold mt-1">
              5h 32m
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
