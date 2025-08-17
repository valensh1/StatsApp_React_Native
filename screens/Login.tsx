// screens/Login.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type

// Define type for the navigation prop
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>; // Will be your screen name defined in your App.tsx file with the stack navigation
};

const Login: React.FC<Props> = ({ navigation }) => {
  const buttonHandler = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>This is the Login page!!!</Text>
      <Pressable onPress={buttonHandler} style={styles.button}>
        <Text style={styles.buttonText}>Press me</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
