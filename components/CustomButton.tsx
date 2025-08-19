import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import colors from '../styles/colors_app';

interface ButtonComponent {
  text: string;
  navigationPath?: string;
  navigation?: any; //! pass the navigation prop from the parent screen!!!!
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonAdditionalStyleProps?: object;
  buttonFunctionOnPress?: () => void; // Pass in a function to be executed upon button press
}

const { height } = Dimensions.get('window');

const CustomButton = ({
  text,
  navigationPath,
  navigation,
  buttonBackgroundColor,
  buttonTextColor,
  buttonAdditionalStyleProps,
  buttonFunctionOnPress,
}: ButtonComponent) => {
  //? USE STATE

  //? FUNCTIONS
  const buttonPressHandler = () => {
    if (buttonFunctionOnPress) {
      buttonFunctionOnPress();
      console.log(`This is the navigation path ${navigationPath}`);
      if (navigationPath && navigation) {
        navigation.navigate(navigationPath);
      } else {
        console.log('No navigation path or navigation object provided');
      }
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor:
            buttonBackgroundColor || styles.buttonContainer.backgroundColor,
        },
        buttonAdditionalStyleProps,
      ]}
      onPress={() => buttonPressHandler()}>
      <Text style={[styles.buttonText, { color: buttonTextColor }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    height: height * 0.05,
    marginTop: height * 0.02,
    borderRadius: 7,
    backgroundColor: colors.globalSecondaryColor,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
  },
});

export default CustomButton;
