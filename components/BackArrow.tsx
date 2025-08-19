import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // your navigation types
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const BackArrow = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons style={styles.backArrow} name="arrow-back" />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  backArrow: {
    position: 'relative',
    right: '42%',
    color: 'black',
    fontSize: 30,
  },
});
export default BackArrow;
