import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const BackArrow = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()}>
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
