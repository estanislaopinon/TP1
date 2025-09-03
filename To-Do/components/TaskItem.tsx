import React, { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, Alert, StyleSheet, View } from 'react-native';
import { Task } from './ToDo';

interface TaskItemProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const startEditing = (id: string, text: string) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const saveEdit = (id: string) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    setEditingTaskId(null);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Confirmar', '¿Eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => onDelete(id) },
    ]);
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      {editingTaskId === item.id ? (
        <TextInput
          value={editText}
          onChangeText={setEditText}
          onSubmitEditing={() => saveEdit(item.id)}
          onBlur={() => saveEdit(item.id)}
          autoFocus
          style={styles.editInput}
        />
      ) : (
        <View style={styles.taskContent}>
          <Pressable
            onPress={() => onToggleComplete(item.id)}
            onLongPress={() => handleDelete(item.id)}
            style={styles.textContainer}
          >
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.text}
            </Text>
          </Pressable>
          <Pressable
            style={styles.editButton}
            onPress={() => startEditing(item.id, item.text)}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  taskItem: {
    borderWidth: 1, // Reborde entre tareas
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5, // Espacio entre tareas
    backgroundColor: '#f9f9f9', // Fondo claro para destacar el reborde
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  editInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 15,
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TaskItem;