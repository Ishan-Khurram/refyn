// declare typing for components within home screen
export type Weekday = "S" | "M" | "T" | "W" | "T2" | "F" | "S2";

// streak counter
export type WeeklyPoint = {
  day: Weekday;
  distanceKm: number;
};

// change later to values user sets with folder.
export type WorkoutType = "Easy Run" | "Tempo Run" | "Long Run" | "Lift";

// see later what should be optional or not
export type LastWorkout = {
  title: string;
  startedAt: string; // formatted or iso format
  elapsed: string; // hh:mm:ss
  pace: string; // x:xx / km
  distanceKm: number;
  heartRate: number;
  kind: WorkoutType;
};
