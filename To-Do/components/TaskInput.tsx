import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleAdd = () => {
    onAddTask(newTask);
    setNewTask('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Nueva tarea..."
        style={styles.input}
      />
      <Button title="Agregar" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default TaskInput;