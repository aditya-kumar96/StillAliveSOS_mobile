/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from "./src/navigation/AppNavigator";
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AppNavigator />;
    </SafeAreaProvider>
  );
}




export default App;
