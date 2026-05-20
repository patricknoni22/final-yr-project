import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} >
      {/* handles authtication flow */}
       <Stack.Screen name="(auth)" />
       {/* handles student */}
       <Stack.Screen name="(student)" />



    </Stack>;

}
