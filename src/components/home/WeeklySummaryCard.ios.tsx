import { View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { WEEKLY_POINTS } from "./data";
import { WeeklyMileageChart } from "./WeeklyMileageChart";

export default function WeeklySummaryCard() {
  return <WeeklyMileageChart data={WEEKLY_POINTS} />;
}
