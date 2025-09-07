import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ChooseSportPage from './screens/ChooseSportPage';
import ChoosePositionPage from './screens/ChoosePositionPage';
import StatCounterPage from './screens/StatCounterPage';
import HistoricalStats from './screens/HistoricalStats';
import TeamInfoPage from './screens/TeamInfoPage';
import AdditionalTeamInfoPage from './screens/AdditionalTeamInfoPage';
import Logo from './components/Logo';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation'; // import interface

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
          {/* Displays Login page upon opening the app since its the first page in the stack */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
          <Stack.Screen
            name="ChooseSport"
            component={ChooseSportPage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="TeamInfo"
            component={TeamInfoPage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="AdditionalTeamInfo"
            component={AdditionalTeamInfoPage}
            options={{ title: '' }}
          />
          <Stack.Screen name="ChoosePosition" component={ChoosePositionPage} />
          <Stack.Screen name="StatCounter" component={StatCounterPage} />
          <Stack.Screen name="HistoricalStats" component={HistoricalStats} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {},
});
