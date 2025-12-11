import React from "react";
import { View, ScrollView } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from "victory-native";
import type { WeeklyPoint } from "./types";
import { colors } from "../../theme/colors";

type WeeklyMileageChartProps = {
  data: WeeklyPoint[];
};

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

export function WeeklyMileageChart({ data }: WeeklyMileageChartProps) {
  // Map WeeklyPoint -> Victory's { x, y } format
  const victoryData = data.map((point, index) => ({
    x: index, // Use index for proper spacing
    y: point.distanceKm,
  }));

  // TODO: if no run logged that day, turn null -> 0.

  return (
    <ScrollView>
      <View
        className="rounded-2xl p-4 mt-4 h-75 w-full"
        style={{ backgroundColor: colors.card }}
      >
        <VictoryChart
          padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
          domainPadding={{ x: 20, y: 10 }}
          height={224}
          width={350}
        >
          {/* X-axis: days of week */}
          <VictoryAxis
            tickValues={[0, 1, 2, 3, 4, 5, 6]}
            tickFormat={(t) => weekdayLabels[t]}
            style={{
              tickLabels: { fontSize: 12, fill: "#aaa" },
              axis: { stroke: "#555" },
            }}
          />

          {/* Y-axis: distance */}
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `${t} km`}
            style={{
              tickLabels: { fontSize: 12, fill: "#aaa" },
              axis: { stroke: "#555" },
              grid: { stroke: "#333", strokeDasharray: "4,4" },
            }}
          />

          {/* Line for weekly mileage */}
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
          {/* Circular points on the data line */}
          <VictoryScatter
            data={victoryData}
            size={2}
            style={{
              data: {
                fill: "#FF3B3B",
                stroke: "#fff",
                strokeWidth: 0.5,
              },
            }}
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
