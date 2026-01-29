import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

function getTodayISO() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

function formatDecimal(input: string) {
  // digits + one dot only
  let s = input.replace(/[^0-9.]/g, "");
  const parts = s.split(".");
  if (parts.length > 2) s = parts[0] + "." + parts.slice(1).join("");
  if (s.startsWith(".")) s = "0" + s;
  return s;
}

function formatMMSS(input: string) {
  // numeric pad friendly mm:ss (up to 99:59)
  const digits = input.replace(/\D/g, "").slice(0, 4); // mmss
  if (digits.length <= 2) return digits; // "m" or "mm"
  const mm = digits.slice(0, digits.length - 2);
  const ss = digits.slice(-2);
  return `${mm}:${ss}`;
}

function formatHHMMSS(input: string) {
  // numeric pad friendly hh:mm:ss (up to 99:59:59) using 6 digits
  const digits = input.replace(/\D/g, "").slice(0, 6); // hhmmss
  if (digits.length <= 2) return digits; // ss
  if (digits.length <= 4) {
    const mm = digits.slice(0, digits.length - 2);
    const ss = digits.slice(-2);
    return `${mm}:${ss}`;
  }
  const hh = digits.slice(0, digits.length - 4);
  const mm = digits.slice(-4, -2);
  const ss = digits.slice(-2);
  return `${hh}:${mm}:${ss}`;
}

const UI = {
  bg: "bg-[#0D0907]",
  pageX: "px-5",
  topPad: Platform.OS === "ios" ? "pt-14" : "pt-10",
  sectionTitle: "text-white text-[20px] font-semibold",
  sectionLabel: "text-gray-400 text-[13px] font-semibold",
  divider: "h-px bg-white/10",
  card: "rounded-2xl bg-zinc-900/80 border border-white/10",
  row: "flex-row items-center justify-between px-4 py-4",
  rowLeft: "flex-row items-center",
  rowLabel: "text-white text-[16px]",
  rowValue: "text-gray-300 text-[15px]",
  subtle: "text-gray-500",
};

function Row({
  icon,
  label,
  value,
  onPress,
  isLast,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress?: () => void;
  isLast?: boolean;
}) {
  const content = (
    <View className={`${UI.row} ${isLast ? "" : "border-b border-white/10"}`}>
      <View className={UI.rowLeft}>
        <View className="w-10 h-10 rounded-xl bg-white/5 items-center justify-center mr-3">
          <Ionicons name={icon} size={20} color="#E5E7EB" />
        </View>
        <Text className={UI.rowLabel}>{label}</Text>
      </View>

      <View className="flex-row items-center">
        <Text className={`${UI.rowValue} mr-2`}>{value}</Text>
        <Text className="text-white/25 text-[18px]">›</Text>
      </View>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} className="active:opacity-80">
      {content}
    </Pressable>
  );
}

function StatTile({
  icon,
  label,
  value,
  suffix,
  keyboardType,
  onChangeText,
  placeholder,
  maxLength,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  suffix?: string;
  keyboardType: "number-pad" | "decimal-pad";
  onChangeText: (t: string) => void;
  placeholder: string;
  maxLength?: number;
}) {
  return (
    <View className="flex-1">
      <View className="rounded-2xl bg-zinc-900/80 border border-white/10 p-4">
        <View className="flex-row items-center mb-3">
          <View className="w-8 h-8 rounded-xl bg-white/5 items-center justify-center mr-2">
            <Ionicons name={icon} size={16} color="#E5E7EB" />
          </View>
          <Text className={`${UI.sectionLabel} uppercase`}>{label}</Text>
        </View>

        <View className="flex-row items-end justify-between">
          <TextInput
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#6B7280"
            maxLength={maxLength}
            className="text-white text-[26px] font-semibold flex-1"
          />
          {!!suffix && (
            <Text className="text-gray-400 text-[14px] ml-2 pb-1">
              {suffix}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function AddRunScreen() {
  const today = useMemo(getTodayISO, []);

  // Section 1
  const [title, setTitle] = useState("Morning Run");
  const [date, setDate] = useState(today);

  // Stats
  const [distanceKm, setDistanceKm] = useState("0.00");
  const [duration, setDuration] = useState(""); // hh:mm:ss formatted from digits
  const [pace, setPace] = useState(""); // mm:ss formatted from digits
  const [heartRate, setHeartRate] = useState("");

  // Notes / Details
  const [notes, setNotes] = useState("");
  const [folderId, setFolderId] = useState<string | null>(null);
  const [folderPickerOpen, setFolderPickerOpen] = useState(false);

  // Temporary folders (replace with Firestore later)
  const folders = [
    { id: null, name: "Unsorted" },
    { id: "easy", name: "Easy Runs" },
    { id: "tempo", name: "Tempo" },
    { id: "long", name: "Long Runs" },
  ];

  const folderName = folders.find((f) => f.id === folderId)?.name ?? "Unsorted";

  // Minimal gating (real validation next)
  const canSave =
    distanceKm.trim() !== "" && duration.trim() !== "" && pace.trim() !== "";

  return (
    <View className={`flex-1 ${UI.bg}`}>
      <ScrollView
        className={`flex-1 ${UI.pageX} ${UI.topPad}`}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top bar */}
        <View className="flex-row items-center justify-between pb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-12 h-10 justify-center"
          >
            <Text className="text-white text-[26px]">×</Text>
          </Pressable>

          <Text className="text-white text-[18px] font-semibold">
            Manual Activity
          </Text>

          <Pressable
            disabled={!canSave}
            onPress={() => {
              // Save later (Firestore)
            }}
            className="w-12 h-10 justify-center items-end"
          >
            <Text
              className={`text-[16px] font-semibold ${canSave ? "text-red-400" : "text-white/25"}`}
            >
              Save
            </Text>
          </Pressable>
        </View>

        <View className={UI.divider} />

        {/* Activity Title */}
        <View className="py-5">
          <Text className={UI.sectionLabel}>Activity Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Run title"
            placeholderTextColor="#6B7280"
            className="text-white text-[34px] font-semibold mt-2"
          />
        </View>

        <View className={UI.divider} />

        {/* Rows: Date, Sport */}
        <View className={`${UI.card} mt-5 overflow-hidden`}>
          <Row
            icon="calendar-outline"
            label="Date"
            value={date}
            onPress={() => {
              // date picker later (for now keep editable)
            }}
          />
          <Row icon="walk-outline" label="Sport" value="Run" isLast />
        </View>

        {/* Activity Stats */}
        <View className="mt-8">
          <Text className={`${UI.sectionTitle} mb-4`}>Activity Stats</Text>

          <View className="flex-row gap-4 mb-4">
            <StatTile
              icon="ribbon-outline"
              label="Distance"
              value={distanceKm}
              suffix="km"
              keyboardType="decimal-pad"
              onChangeText={(t) => setDistanceKm(formatDecimal(t))}
              placeholder="0.00"
            />
            <StatTile
              icon="time-outline"
              label="Duration"
              value={duration}
              suffix=""
              keyboardType="number-pad"
              onChangeText={(t) => setDuration(formatHHMMSS(t))}
              placeholder="00:00:00"
              maxLength={8} // up to 99:59:59
            />
          </View>

          <View className="flex-row gap-4">
            <StatTile
              icon="speedometer-outline"
              label="Pace"
              value={pace}
              suffix="/km"
              keyboardType="number-pad"
              onChangeText={(t) => setPace(formatMMSS(t))}
              placeholder="--:--"
              maxLength={5}
            />
            <StatTile
              icon="heart-outline"
              label="Heart Rate"
              value={heartRate}
              suffix="bpm"
              keyboardType="number-pad"
              onChangeText={(t) =>
                setHeartRate(t.replace(/\D/g, "").slice(0, 3))
              }
              placeholder="--"
              maxLength={3}
            />
          </View>
        </View>

        {/* Notes */}
        <View className="mt-8">
          <Text className={`${UI.sectionTitle} mb-3`}>Notes</Text>
          <View className={`${UI.card} p-4`}>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="How did the run feel?"
              placeholderTextColor="#6B7280"
              multiline
              className="text-white text-[16px] min-h-[120px]"
            />
          </View>
        </View>

        {/* Folder dropdown row */}
        <View className="mt-6">
          <Pressable
            onPress={() => setFolderPickerOpen(true)}
            className={`${UI.card} px-4 py-4 flex-row items-center justify-between active:opacity-80`}
          >
            <View className="flex-row items-center">
              <Ionicons name="folder-outline" size={20} color="#E5E7EB" />
              <Text className="text-white text-[16px] ml-3">Add to Folder</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-300 text-[15px] mr-2">
                {folderName}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
            </View>
          </Pressable>
        </View>

        {/* Photos placeholder */}
        <View className="mt-8">
          <Text className={`${UI.sectionTitle} mb-3`}>Photos</Text>
          <View
            className={`${UI.card} border-dashed p-6 items-center justify-center`}
          >
            <Ionicons name="camera-outline" size={34} color="#9CA3AF" />
            <Text className="text-gray-400 text-[14px] mt-3">
              Tap to upload photos
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Folder picker bottom sheet */}
      <Modal
        visible={folderPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFolderPickerOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-end"
          onPress={() => setFolderPickerOpen(false)}
        >
          <Pressable
            onPress={() => {}}
            className="bg-zinc-950 rounded-t-3xl border-t border-white/10 p-4"
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-white text-[18px] font-semibold">
                Choose folder
              </Text>
              <Pressable onPress={() => setFolderPickerOpen(false)}>
                <Text className="text-white/60 text-[16px]">Close</Text>
              </Pressable>
            </View>

            <View className="rounded-2xl overflow-hidden border border-white/10">
              {folders.map((f, idx) => {
                const selected = f.id === folderId;
                const isLast = idx === folders.length - 1;
                return (
                  <Pressable
                    key={String(f.id)}
                    onPress={() => {
                      setFolderId(f.id);
                      setFolderPickerOpen(false);
                    }}
                    className={`px-4 py-4 bg-zinc-900/70 ${isLast ? "" : "border-b border-white/10"}`}
                  >
                    <View className="flex-row items-center justify-between">
                      <Text className="text-white text-[16px]">{f.name}</Text>
                      {selected ? (
                        <Ionicons name="checkmark" size={18} color="#F87171" />
                      ) : (
                        <View />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
