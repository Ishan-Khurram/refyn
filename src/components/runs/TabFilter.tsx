import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import type { TabFilterProps } from "./types";

export default function TabFilter({ value, onChange, labels }: TabFilterProps) {
  const isFolders = value === "folders";

  return (
    <View
      className="mt-4 rounded-2xl p-1 flex-row"
      style={{ backgroundColor: colors.card }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onChange("folders")}
        className="flex-1 py-3 rounded-xl items-center"
        style={{ backgroundColor: isFolders ? colors.accent : "transparent" }}
      >
        <Text
          className={
            isFolders
              ? "text-white text-sm font-semibold"
              : "text-gray-300 text-sm font-semibold"
          }
        >
          {labels?.folders ?? "Folders"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onChange("all")}
        className="flex-1 py-3 rounded-xl items-center"
        style={{ backgroundColor: !isFolders ? colors.accent : "transparent" }}
      >
        <Text
          className={
            !isFolders
              ? "text-white text-sm font-semibold"
              : "text-gray-300 text-sm font-semibold"
          }
        >
          {labels?.all ?? "All Runs"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
