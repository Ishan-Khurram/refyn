import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View } from "react-native";
import { colors } from "../../src/theme/colors";
import TabFilter from "../../src/components/runs/TabFilter";
import RunFoldersList from "../../src/components/runs/RunFolders";
import { RunsTab } from "../../src/components/runs/types";

export default function Runs() {
  // Add tabs once DB functionality is wired in
  const [tab, setTab] = useState<RunsTab>("folders");
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.background }}
      className="px-4 pt-4 pb-6"
    >
      {/* Folders | All Runs Toggle Here */}
      <TabFilter value={tab} onChange={setTab} />
      {/* Folder Scroll View here */}
      <View>
        <RunFoldersList />
      </View>
    </SafeAreaView>
  );
}
