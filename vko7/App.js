import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new..."
          value={text}
          onChangeText={setText}
        />
        
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TODO', payload: item.id })}>
            <Text style={styles.todo}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 30,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4DB8FF',
    paddingVertical: 13,
    paddingHorizontal: 17,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todo: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
  },
});
