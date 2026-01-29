import { View, Text, Pressable, TextInput } from "react-native";
import { useMemo, useState } from "react";
import { router } from "expo-router";

function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="rounded-2xl bg-zinc-900/80 border border-white/10 overflow-hidden">
      {children}
    </View>
  );
}

function Row({
  label,
  right,
  isLast,
}: {
  label: string;
  right: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <View
      className={`px-4 py-4 flex-row items-center justify-between ${isLast ? "" : "border-b border-white/10"}`}
    >
      <Text className="text-gray-300 text-[14px]">{label}</Text>
      <View className="flex-row items-center">{right}</View>
    </View>
  );
}

export default function AddRunScreen() {
  const today = useMemo(getTodayISO, []);
  const [title, setTitle] = useState(`${today} Run`);
  const [date, setDate] = useState(today);

  const [distanceKm, setDistanceKm] = useState("");
  const [duration, setDuration] = useState(""); // mm:ss or hh:mm:ss
  const [pace, setPace] = useState(""); // mm:ss
  const [heartRate, setHeartRate] = useState("");
  const [notes, setNotes] = useState("");

  const [folderId, setFolderId] = useState<string | null>(null);

  // simple “Strava-style” save gating (we’ll replace with real parsing/validation next)
  const canSave =
    distanceKm.trim() !== "" && duration.trim() !== "" && pace.trim() !== "";

  return (
    <View className="flex-1 bg-[#0D0907] px-5 pt-14">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={() => router.back()}>
          <Text className="text-white text-base">Cancel</Text>
        </Pressable>

        <Text className="text-white text-lg font-semibold">Add Run</Text>

        <Pressable disabled={!canSave} onPress={() => {}}>
          <Text
            className={`text-base font-semibold ${canSave ? "text-white" : "text-white/30"}`}
          >
            Save
          </Text>
        </Pressable>
      </View>

      {/* Card 1: Details */}
      <Text className="text-gray-400 text-xs mb-2">DETAILS</Text>
      <Card>
        <Row
          label="Title"
          right={
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Run title"
              placeholderTextColor="#777"
              className="text-white text-[15px] text-right min-w-[220px]"
            />
          }
        />
        <Row
          label="Date"
          right={
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#777"
              className="text-white text-[15px] text-right min-w-[140px]"
            />
          }
          isLast
        />
      </Card>

      {/* Card 2: Activity Stats */}
      <Text className="text-gray-400 text-xs mt-6 mb-2">ACTIVITY STATS</Text>
      <View className="rounded-2xl bg-zinc-900/80 border border-white/10 p-4">
        {/* Big stats block */}
        <View className="flex-row justify-between">
          <View className="flex-1 pr-2">
            <Text className="text-gray-400 text-[12px] mb-1">
              Distance (km)
            </Text>
            <TextInput
              value={distanceKm}
              onChangeText={setDistanceKm}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#666"
              className="text-white text-[28px] font-semibold"
            />
          </View>

          <View className="flex-1 px-2 items-center">
            <Text className="text-gray-400 text-[12px] mb-1">Time</Text>
            <TextInput
              value={duration}
              onChangeText={setDuration}
              placeholder="mm:ss"
              placeholderTextColor="#666"
              className="text-white text-[28px] font-semibold text-center"
            />
          </View>

          <View className="flex-1 pl-2 items-end">
            <Text className="text-gray-400 text-[12px] mb-1">Pace</Text>
            <TextInput
              value={pace}
              onChangeText={setPace}
              placeholder="mm:ss"
              placeholderTextColor="#666"
              className="text-white text-[28px] font-semibold text-right"
            />
            <Text className="text-gray-500 text-[12px] -mt-1">/km</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-px bg-white/10 my-4" />

        {/* Smaller rows inside the same card */}
        <Row
          label="Heart rate"
          right={
            <TextInput
              value={heartRate}
              onChangeText={setHeartRate}
              keyboardType="number-pad"
              placeholder="Optional"
              placeholderTextColor="#777"
              className="text-white text-[15px] text-right min-w-[120px]"
            />
          }
        />
        <View className="px-4 py-4">
          <Text className="text-gray-300 text-[14px] mb-2">Notes</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Optional"
            placeholderTextColor="#777"
            multiline
            className="text-white text-[15px] min-h-[90px]"
          />
        </View>
      </View>

      {/* Card 3: More */}
      <Text className="text-gray-400 text-xs mt-6 mb-2">MORE</Text>
      <Card>
        <Row
          label="Folder"
          right={
            <View className="flex-row items-center">
              <Text className="text-white text-[15px] mr-2">
                {folderId ?? "Unsorted"}
              </Text>
              <Text className="text-white/30 text-[16px]">›</Text>
            </View>
          }
        />
        <Row
          label="Photos"
          right={<Text className="text-white/30 text-[15px]">Coming soon</Text>}
          isLast
        />
      </Card>
    </View>
  );
}
