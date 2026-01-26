import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import type { TabFilterProps } from "./types";

export default function TabFilter({ value, onChange, labels }: TabFilterProps) {
  const isFolders = value === "folders";

  const activeShadow = {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  } as const;

  return (
    <View
      className="mt-4 rounded-2xl p-4 flex-row"
      style={{ backgroundColor: colors.card }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onChange("folders")}
        className="flex-1 py-2.5 rounded-xl items-center justify-center"
        style={{
          backgroundColor: isFolders ? colors.accent : "transparent",
          ...(isFolders ? activeShadow : {}),
        }}
      >
        <Text
          className={
            isFolders
              ? "text-white text-[13px] font-semibold"
              : "text-gray-300 text-[13px] font-semibold"
          }
        >
          {labels?.folders ?? "Folders"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onChange("all")}
        className="flex-1 py-2.5 rounded-xl items-center justify-center"
        style={{
          backgroundColor: !isFolders ? colors.accent : "transparent",
          ...(!isFolders ? activeShadow : {}),
        }}
      >
        <Text
          className={
            !isFolders
              ? "text-white text-[13px] font-semibold"
              : "text-gray-300 text-[13px] font-semibold"
          }
        >
          {labels?.all ?? "All Runs"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
