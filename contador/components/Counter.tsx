import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';

interface CounterProps {
  initialCount?: number;
  maxCount?: number;
  minCount?: number;
  isDark: boolean;
  toggleTheme: () => void;
}

const useThemeStyles = (isDark: boolean) => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#333' : '#fff',
      padding: 20,
    },
    card: {
      padding: 40,
      backgroundColor: isDark ? '#444' : '#eee',
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 16,
      color: isDark ? '#fff' : '#333',
    },
    countText: {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
      flexWrap: 'wrap',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      margin: 5,
      minWidth: 80,
      alignItems: 'center',
    },
    incrementButton: {
      backgroundColor: '#4CAF50', // verde
    },
    decrementButton: {
      backgroundColor: '#F44336', // rojo
    },
    resetButton: {
      backgroundColor: '#2196F3', // azul
    },
    themeButton: {
      backgroundColor: '#FF9800', // naranja
    },
    disabledButton: {
      backgroundColor: '#bbb',
      opacity: 0.7,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    icon: {
      fontSize: 20,
      marginRight: 8,
    },
  });
};

const Counter: React.FC<CounterProps> = ({
  initialCount = 0,
  maxCount = 10,
  minCount = 0,
  isDark,
  toggleTheme,
}) => {
  const [count, setCount] = useState<number>(initialCount);
  const styles = useThemeStyles(isDark);

  const increment = () => {
    if (count >= maxCount) {
      Alert.alert('¡Límite alcanzado!', `Ya has llegado al máximo de ${maxCount}.`);
      return;
    }
    setCount(count + 1);
    if (count + 1 === maxCount) {
      Alert.alert('¡Límite alcanzado!', `Ya has llegado al máximo de ${maxCount}.`);
    }
  };

  const decrement = () => {
    if (count <= minCount) {
      Alert.alert('Límite alcanzado', `No puedes decrementar más allá de ${minCount}`);
      return;
    }
    setCount(count - 1);
  };

  const reset = () => setCount(initialCount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador</Text>
      <View style={styles.card}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.incrementButton,
            count >= maxCount && styles.disabledButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={increment}
          disabled={count >= maxCount}
        >
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.decrementButton,
            count <= minCount && styles.disabledButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={decrement}
          disabled={count <= minCount}
        >
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.resetButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.themeButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={toggleTheme}
        >
          <Text style={styles.buttonText}>
            <Text style={styles.icon}>{isDark ? '🌙' : '🌞'}</Text>
            {isDark ? ' Tema Oscuro' : ' Tema Claro'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;