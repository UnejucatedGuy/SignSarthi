import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './android/screens/HomeScreen';
import SignToTextScreen from './android/screens/SignToTextScreen';
import TextToSignScreen from './android/screens/TextToSignScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignToTextScreen" component={SignToTextScreen} />
        <Stack.Screen name="TextToSignScreen" component={TextToSignScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
