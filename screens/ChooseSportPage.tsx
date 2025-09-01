import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; // import the type
import { useUserContext } from '../store/context/userContext';
import colors from '../styles/colors_app';
import SportIcons from '../components/SportIcons';
import Logo from '../components/Logo';

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'ChooseSport'> {}

const { height } = Dimensions.get('window');

const ChooseSportPage = ({ navigation }: Props) => {
  const { user, setUser } = useUserContext();
  const [isUserAccountCreated, setIsUserAccountCreated] = useState(false);
  console.log(`This is the user from the stats page ${JSON.stringify(user)}`);

  useEffect(() => {
    user?.displayName
      ? setIsUserAccountCreated(true)
      : setIsUserAccountCreated(false);
    console.log(`This is the isUserAccountCreated ${isUserAccountCreated}`);
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Logo height={height * 0.1} marginTop={1} />
      <Text style={styles.title}>Choose Your Sport</Text>
      <View style={styles.sportCategories}>
        <SportIcons
          sport="Basketball"
          iconName="basketball-outline"
          iconLibrary="Iconicons"
          navigation={navigation}
        />
        <SportIcons
          sport="Hockey"
          iconName="sports-hockey"
          iconLibrary="MaterialIcons"
          navigation={navigation}
        />
      </View>
    </View>
  );
};
export default ChooseSportPage;

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: height * 0.025,
    height: '100%',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: '7.5%',
    fontWeight: 600,
    fontSize: 28,
  },
  sportCategories: {
    marginLeft: '2.5%',
    marginTop: '2.5%',
  },
});
