import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export const metadata =   {
  title: "Alex y Erick ♡ 30 de Mayo del 2026",
  description: "Save the date! 30 - 5 - 202",
  openGraph: {
    title: 'Alex y Erick ♡ 30 de Mayo del 2026',
    description: 'Save the date! 30 - 5 - 202',
    url: 'https://AlexyErick.com',
    siteName: 'AlexyErick',
    images:[ 
      {
        url: "http://www.alexyerick.com/saveTheDate_mini.png", // Must be an absolute URL
        width: 800,
        height: 600,
        itemProp: "image"
      }]
  }
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
