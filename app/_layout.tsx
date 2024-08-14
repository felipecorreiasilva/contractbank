import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/app/context/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="login/index" />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="areapix/index" />
      <Stack.Screen name="cpfkey/index" />
      
    </Stack>
    </Provider>
  );
}
