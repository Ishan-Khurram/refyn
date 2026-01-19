import { View, Text, Pressable, ScrollView } from "react-native";
import { colors } from "../../theme/colors";
import { Folder, RunFoldersListProps } from "./types";

const DUMMY_FOLDERS: Folder[] = [
  { id: "long", name: "Long Runs" },
  { id: "tempo", name: "Tempo Runs" },
  { id: "track", name: "Track / Sprints" },
];

export default function RunFoldersList({ onPressFolder }: RunFoldersListProps) {
  return (
    <ScrollView
      className="mt-4"
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {DUMMY_FOLDERS.map((folder) => (
        <Pressable
          key={folder.id}
          onPress={() => onPressFolder?.(folder)}
          className="rounded-2xl px-4 py-4 mb-3"
          style={{ backgroundColor: colors.card }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-lg font-semibold">
              {folder.name}
            </Text>

            <Text className="text-gray-400 text-xl">›</Text>
          </View>

          <Text className="text-gray-400 text-sm mt-1">Tap to view runs</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
