import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ReactNativeModal = ({ message = 'OK' }: { message: string }) => {
  console.log(`This is the message -->${message}`);
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true} // Makes the background transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Android back button support
        statusBarTranslucent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{message}</Text>
            {/* <Button title="OK" onPress={() => setModalVisible(false)} /> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
  },
});

export default ReactNativeModal;
