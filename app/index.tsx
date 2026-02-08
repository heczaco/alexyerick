import { useLocalSearchParams } from "expo-router";
import React from "react";
import InvitacionScreen from "./(tabs)/invitacion";
import SaveTheDateScreen from "./(tabs)/savethedate";

export default function HomeScreen() {
  const pageType = process.env.EXPO_INDEX_PAGE || 'savethedate';
  const params = useLocalSearchParams();
  console.log("environment variable EXPO_INDEX_PAGE:", process.env.EXPO_INDEX_PAGE);
  if (pageType === 'invitacion') {
    return <InvitacionScreen />;
  }
  
  return <SaveTheDateScreen />;
}