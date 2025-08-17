import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useUserContext } from '../store/context/userContext';
import colors from '../styles/colors_app';
import SportIcons from '../components/SportIcons';

export const Stats = () => {
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
      <SportIcons
        sport="Baseball"
        iconName="baseball-bat"
        iconLibrary="MaterialCommunityIcons"
      />
      <SportIcons
        sport="Basketball"
        iconName="basketball-outline"
        iconLibrary="Iconicons"
      />
      <SportIcons
        sport="Football"
        iconName="american-football-outline"
        iconLibrary="Iconicons"
      />
      <SportIcons
        sport="Hockey"
        iconName="sports-hockey"
        iconLibrary="MaterialIcons"
      />
    </View>
  );
};
export default Stats;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: colors.globalBackgroundColor,
    height: '100%',
    width: '100%',
  },
});
