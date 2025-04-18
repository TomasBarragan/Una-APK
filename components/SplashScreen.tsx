import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import Logo from "./Logo";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const bookPosition = useRef(new Animated.Value(height * 0.7)).current;
  const textPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(bookPosition, {
          toValue: height * 0.1,
          duration: 1500,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          useNativeDriver: true,
        }),
        Animated.timing(textPosition, {
          toValue: -50,
          duration: 1500,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Texto ya visible desde el inicio, más arriba */}
      <Animated.Text
        style={[styles.title, { transform: [{ translateY: textPosition }] }]}
      >
        StudyFlow
      </Animated.Text>

      {/* Logo debajo del texto, oculto al inicio */}
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: bookPosition }] },
        ]}
      >
        <Logo size={width * 0.6} color="#007AFF" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: width * 0.18,
    fontWeight: "bold",
    position: "absolute",
    top: "35%",
  },
  logoContainer: {
    position: "absolute",
  },
});
