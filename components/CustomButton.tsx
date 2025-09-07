import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import colors from '../styles/colors_app';

interface ButtonComponent {
  text: string;
  navigation?: any; //! pass the navigation prop from the parent screen!!!!
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonAdditionalStyleProps?: object;
  buttonFunctionOnPress?: () => void; // Pass in a function to be executed upon button press
  isDisabled?: boolean;
}

const { height } = Dimensions.get('window');

const CustomButton = ({
  text,
  navigation,
  buttonBackgroundColor,
  buttonTextColor,
  buttonAdditionalStyleProps,
  buttonFunctionOnPress,
  isDisabled,
}: ButtonComponent) => {
  //? USE STATE

  //? FUNCTIONS
  const buttonPressHandler = () => {
    if (buttonFunctionOnPress) {
      buttonFunctionOnPress();
      console.log(`This is the navigation path ${navigation}`);
      if (navigation) {
        return;
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
      onPress={() => buttonPressHandler()}
      disabled={isDisabled ?? false}>
      <Text
        style={[
          styles.buttonText,
          buttonTextColor ? { color: buttonTextColor } : null,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    height: height * 0.05,
    width: '85%',
    alignSelf: 'center',
    marginTop: height * 0.02,
    borderRadius: 7,
    backgroundColor: colors.globalBackgroundColor,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    color: colors.globalWhiteText,
  },
});

export default CustomButton;
