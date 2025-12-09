import { WeeklyPoint, LastWorkout } from "./types";

// Currently holding mock data, replaced with real data once db set up -- firebase
export const STREAK_DAYS = 28; // tracks total days in a row an activity is logged
export const STREAK_DAYS_ARRAY: boolean[] = [
  true,
  true,
  true,
  true,
  true,
  true,
]; // false = not logged

export const WEEKLY_POINTS: WeeklyPoint[] = [
  { day: "S", distanceKm: 14 },
  { day: "M", distanceKm: 8 },
  { day: "T", distanceKm: 10 },
  { day: "W", distanceKm: 0 },
  { day: "T2", distanceKm: 6 },
  { day: "F", distanceKm: 12 },
  { day: "S2", distanceKm: 7 },
];

export const LAST_WORKOUT: LastWorkout = {
  title: "Morning Run",
  startedAt: "12/05/25 – 6:42 AM",
  elapsed: "1:02:32",
  pace: "5:02 / km",
  distanceKm: 10.5,
  heartRate: 161,
  kind: "Tempo Run",
};
