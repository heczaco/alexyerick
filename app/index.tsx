import { useLocalSearchParams } from "expo-router";
import React from "react";
import InvitacionScreen from "./(tabs)/invitacion";
import SaveTheDateScreen from "./(tabs)/savethedate";

export default function HomeScreen() {
  const pageType = process.env.EXPO_PUBLIC_PAGE_TYPE || 'savethedate';
  const params = useLocalSearchParams();
  console.log("environment variable EXPO_INDEX_PAGE:", process.env.EXPO_PUBLIC_PAGE_TYPE);
  if (pageType === 'invitacion') {
    return <InvitacionScreen />;
  }
  
  return <SaveTheDateScreen />;
}