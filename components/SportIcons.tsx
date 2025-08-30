import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import colors from '../styles/colors_app';

interface SportIconsProps {
  sport: string;
  iconName: string;
  iconLibrary:
    | 'Iconicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'FontAwesome5'
    | 'FontAwesome6';
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const SportIcons: React.FC<SportIconsProps> = ({
  sport,
  iconName,
  iconLibrary,
  navigation,
}) => {
  const sportSelectionHandler = () => {
    navigation.navigate('ChoosePosition', { sport });
  };

  let IconComponent;
  switch (iconLibrary) {
    case 'Iconicons':
      IconComponent = Ionicons;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      IconComponent = MaterialIcons;
      break;
    case 'FontAwesome5':
      IconComponent = FontAwesome5;
      break;
    case 'FontAwesome6':
      IconComponent = FontAwesome6;
      break;
    default:
      console.error('Invalid icon library');
      break;
  }

  return (
    <View>
      <Pressable onPress={sportSelectionHandler} style={styles.container}>
        <IconComponent
          name={iconName}
          size={60}
          color={colors.globalWhiteText}
        />
        <Text style={styles.sportLabels}>{sport}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.globalBackgroundColor,
    width: '65%',
    borderRadius: '5%',
    marginTop: '2.5%',
    alignSelf: 'center',
    paddingLeft: '5%',
    height: 75,
  },
  sportLabels: {
    color: colors.globalWhiteText,
    fontWeight: '600',
    fontSize: 18,
    marginLeft: '10%',
  },
});
export default SportIcons;
