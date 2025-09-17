import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../styles/colors_app';

interface InputField {
  label: string;
  labelColor?: string;
  focusedBackgroundColor?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  additionalStyleProps?: object;
}

const { height } = Dimensions.get('window');

const InputField = ({
  label,
  labelColor,
  focusedBackgroundColor,
  onChangeText,
  secureTextEntry,
  additionalStyleProps,
}: InputField) => {
  //? USE STATE
  const [input, setInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  //? FUNCTIONS
  const inputHandler = (text: string): void => {
    setInput(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.singleFieldContainer, additionalStyleProps]}>
        <Text style={[styles.labels, labelColor && { color: labelColor }]}>
          {label}
        </Text>
        <TextInput
          style={[
            styles.textInput,
            isFocused && [
              styles.focusedState, // Apply default focus styles
              focusedBackgroundColor && {
                backgroundColor: focusedBackgroundColor,
              }, // Override background color if prop exists
            ],
          ]}
          autoCapitalize="none"
          onChangeText={inputHandler}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          value={input}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  singleFieldContainer: {
    marginHorizontal: '5%',
  },
  labels: {
    color: colors.globalSecondaryColor,
    fontWeight: '500',
    fontSize: 15,
  },
  textInput: {
    borderColor: colors.globalSecondaryColor,
    color: colors.globalSecondaryColor,
    borderWidth: 2,
    borderRadius: 7,
    height: 40,
    paddingHorizontal: '3%',
  },
  focusedState: {
    backgroundColor: colors.globalSecondaryColor,
    color: colors.globalAlternateColor,
    fontWeight: 600,
  },
});

export default InputField;
