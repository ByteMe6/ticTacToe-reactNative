// import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
// import {
  // SafeAreaProvider,
  // useSafeAreaInsets,
// } from 'react-native-safe-area-context';
import Main from './src/Main';


// import { Text } from 'react-native/types_generated/index';

function App() {
  
  return (
    // <SafeAreaProvider>
      <View style={styles.container}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        {/* <Text>HELLO</Text> */}
        <Main></Main>
      </View>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
