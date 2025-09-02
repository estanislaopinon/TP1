// filepath: d:\Proyectos\TP1\contador\app\index.tsx
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Counter from "../components/Counter";

export default function Page() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#333" : "#fff" },
      ]}
    >
      <Counter
        initialCount={0}
        maxCount={10}
        minCount={0}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});