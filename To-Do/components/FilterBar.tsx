import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Task } from './ToDo';

interface FilterBarProps {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ tasks, filter, setFilter }) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;

  return (
    <View>
      <Text style={styles.counter}>Total: {total} | Completadas: {completed}</Text>
      <View style={styles.filterContainer}>
        <Button title="Todas" onPress={() => setFilter('all')} color={filter === 'all' ? '#007AFF' : '#666'} />
        <Button title="Activas" onPress={() => setFilter('active')} color={filter === 'active' ? '#007AFF' : '#666'} />
        <Button title="Completadas" onPress={() => setFilter('completed')} color={filter === 'completed' ? '#007AFF' : '#666'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default FilterBar;