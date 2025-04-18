import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import { useState, useEffect } from "react";
import SplashScreen from "../components/SplashScreen";
import { TareasProvider } from "../contexts/TareasContext";

export default function Layout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <TareasProvider>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" backgroundColor="black" />
        <Slot />
      </View>
    </TareasProvider>
  );
}
