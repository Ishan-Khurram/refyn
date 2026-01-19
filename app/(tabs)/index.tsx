import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { colors } from "../../src/theme/colors";
import StreakCard from "../../src/components/home/StreakCard";
import WeeklySummaryCard from "../../src/components/home/WeeklySummaryCard";
import LastWorkoutCard from "../../src/components/home/LastWorkoutCard";

// Home page
// Refyn title up top
// streak container
// graph of total kms with line graph indicating each days run with left being val in km and bottom being day of the week
// last activity

export default function Index() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
      >
        {/* Header */}
        <View className="mb-2">
          <Text className="text-white text-6xl font-extrabold tracking-[0.05em]">
            REFYN
          </Text>
        </View>

        <StreakCard />
        <WeeklySummaryCard />
        <LastWorkoutCard />
      </ScrollView>
    </SafeAreaView>
  );
}
