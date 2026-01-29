// actual modal for logging
// ensure !isOpen returns null to prevent invis mounts/overlays
// make darken backdrop pressable to allow for closing

import React from "react";
import { Pressable, Text, View } from "react-native";
import { useLogFab } from "./useLogFab";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../src/firebase/firebase";
import { router } from "expo-router";

export function LogFab() {
  const { isOpen, close } = useLogFab();

  if (!isOpen) return null;

  return (
    <View className="absolute inset-0 z-50 justify-end pb-28">
      {/* Backdrop */}
      <Pressable className="absolute inset-0 bg-black/60" onPress={close} />

      {/* Action buttons */}
      <View className="items-center space-y-4">
        <Pressable
          onPress={() => {
            close();
            router.push("/(modals)/add-run");
          }}
          className="min-w-[180px] rounded-2xl bg-zinc-900 py-4 items-center"
        >
          <Text className="text-white text-base font-semibold">Add Run</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            close();
            console.log("Add Lift"); // TODO: replace with screen
          }}
          className="min-w-[180px] rounded-2xl bg-zinc-900 py-4 items-center"
        >
          <Text className="text-white text-base font-semibold">Add Lift</Text>
        </Pressable>
      </View>
    </View>
  );
}
