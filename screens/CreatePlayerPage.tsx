import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import InputField from '../components/InputField';
import colors from '../styles/colors_app';
import { useUserContext } from '../store/context/userContext';
import CustomButton from '../components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import HelperFunctions from '../utils/HelperFunctions';
import useHttp from '../database/http';

export const CreatePlayerPage = () => {
  const { user, setUser } = useUserContext();

  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { savePlayerAccountData } = useHttp();

  const onChangeText = (field: string, text: string) => {
    switch (field.toLowerCase()) {
      case 'first name': {
        setUser({ ...user, firstName: text });
        break;
      }
      case 'last name': {
        setUser({ ...user, lastName: text });
        break;
      }
      case 'team name': {
        setUser({ ...user, teamName: text });
        break;
      }
      case 'birth date': {
        setBirthDate(new Date(text));
        setShowDatePicker(false);
        setUser({ ...user, birthDate: text });
        break;
      }
    }
  };

  const buttonFunctionOnPress = () => {
    savePlayerAccountData(user);
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Create Player Account</Text>
      <View style={styles.inputFieldsContainer}>
        <InputField
          label="First Name"
          labelColor={colors.globalSecondaryColor}
          focusedBackgroundColor={colors.globalSecondaryColor}
          onChangeText={(text) => onChangeText('first name', text)}
          additionalStyleProps={{ marginTop: '5%' }}
        />
        <InputField
          label="Last Name"
          labelColor={colors.globalSecondaryColor}
          focusedBackgroundColor={colors.globalSecondaryColor}
          onChangeText={(text) => onChangeText('last name', text)}
          additionalStyleProps={{ marginTop: '5%' }}
        />
        <InputField
          label="Team Name"
          labelColor={colors.globalSecondaryColor}
          focusedBackgroundColor={colors.globalSecondaryColor}
          onChangeText={(text) => onChangeText('team name', text)}
          additionalStyleProps={{ marginTop: '5%' }}
        />
        <Text style={styles.birthDateLabel}>Birth Date</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={styles.datepicker}>
          <Text style={{ color: colors.globalSecondaryColor }}>
            {HelperFunctions.formatDateMMDDYYYY(birthDate)}
          </Text>
        </Pressable>

        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          date={birthDate}
          onConfirm={(date) => onChangeText('birth date', date.toDateString())}
          onCancel={() => setShowDatePicker(false)}
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          text="Save"
          navigationPath="(tabs)/stats"
          buttonBackgroundColor={colors.globalSecondaryColor}
          buttonTextColor={colors.globalAlternateColor}
          buttonAdditionalStyleProps={{
            align: 'center',
            width: '50%',
            marginTop: '5%',
            marginLeft: '0%',
          }}
          buttonFunctionOnPress={buttonFunctionOnPress}
        />
      </View>
    </View>
  );
};
export default CreatePlayerPage;

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    width: '100%',
    top: '10%',
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 600,
    textAlign: 'center',
    color: colors.globalSecondaryColor,
  },
  inputFieldsContainer: {
    width: '90%',
    backgroundColor: colors.globalAlternateColor,
    marginLeft: '5%',
    borderRadius: 8, // use number instead of '%' for RN
    marginTop: '5%',
    padding: 13, // add padding so inputs don’t touch edges
    paddingBottom: '10%',
    justifyContent: 'flex-start',
    flexGrow: 0, // don’t stretch, just hug contents
  },
  birthDateLabel: {
    color: colors.globalSecondaryColor,
    fontSize: 15,
    marginTop: '5%',
    marginLeft: '5%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  datepicker: {
    padding: 10,
    marginLeft: '5%',
    borderColor: colors.globalSecondaryColor,
    borderWidth: 2,
    borderRadius: 7,
    height: 40,
    paddingHorizontal: '3%',
    width: '90%',
  },
});
