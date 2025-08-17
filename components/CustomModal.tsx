import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors_app';

interface ModalProps {
  message: string;
}

const CustomModal = ({ message }: ModalProps) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    width: '85%',
    height: '20%',
    padding: '1%',
    borderWidth: 2,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%', // Moves the modal container halfway down the screen
    left: '50%', // Centers the container horizontally
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }], // Shifts the modal left by half of its width to truly center it
    backgroundColor: colors.globalSecondaryColor,
    zIndex: 100,
    boxShadow: '20',
    borderRadius: 3,
    borderColor: colors.globalAlternateColor,
    shadowColor: 'black', // shadow color (black in this case)
    shadowOffset: { width: 5, height: 5 }, // offset of the shadow (vertical shadow here)
    shadowOpacity: 0.8, // opacity of the shadow
    shadowRadius: 10, // blur radius of the shadow
  },
  message: {
    textAlign: 'center',
    fontWeight: 600,
    fontStyle: 'italic',
  },
});
export default CustomModal;
