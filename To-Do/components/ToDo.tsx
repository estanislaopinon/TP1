import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, UIManager, LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './TaskInput'
import TaskItem from './TaskItem';
import FilterBar from './FilterBar';

// Tipo para tareas
export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

// Habilitar animaciones en Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Cargar tareas desde AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };
    loadTasks();
  }, []);

  // Guardar tareas en AsyncStorage
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error al guardar tareas:', error);
      }
    };
    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  // Agregar tarea
  const addTask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask: Task = { id: Date.now().toString(), text: trimmed, completed: false };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks([...tasks, newTask]);
  };

  // Toggle completada
  const toggleComplete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Eliminar tarea
  const deleteTask = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Editar tarea
  const editTask = (id: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: trimmed } : task)));
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <FilterBar tasks={tasks} filter={filter} setFilter={setFilter} />
      <TaskInput onAddTask={addTask} />
      <TaskItem tasks={filteredTasks} onToggleComplete={toggleComplete} onDelete={deleteTask} onEdit={editTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default ToDo;