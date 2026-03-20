// The button logic to push the data for the run to firestore.
import { db } from "../../firebase/firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

// temporary UID since logging isnt a thing yet
const TEMP_UID = "testUser";
// general folder id before adding create folder button
const GENERAL_FOLDER_ID = "general";

// Interface for the data being pushed
type CreateRunArgs = {};

async function pushRunToDB() {
  // check if general folder is there.
  await setDoc(
    doc(db, "users", TEMP_UID, "runFolders", GENERAL_FOLDER_ID),
    { name: "General", isDefault: true, createdAt: serverTimestamp() },
    { merge: true },
  );

  //
}
