import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { View } from "react-native";
import { colors } from "../../src/theme/colors";
import TabFilter from "../../src/components/runs/TabFilter";
import { LiftsTab } from "../../src/components/lifts/types";
import LiftFoldersList from "../../src/components/lifts/LiftFolders.ios";

export default function Lifts() {
  const [tab, setTab] = useState<LiftsTab>("folders");
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.background }}
      className="px-4 pt-4 pb-6"
    >
      {/* Folder toggle here */}
      <TabFilter value={tab} onChange={setTab} />
      {/* Users folder scroll view here */}
      <LiftFoldersList />
    </SafeAreaView>
  );
}
