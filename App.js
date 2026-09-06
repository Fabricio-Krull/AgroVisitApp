import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen.js';
import ImageScreen from './src/screens/ImageScreen.js';
import ImageSelector from './src/components/ImagePicker.js';
import ContactList from './src/components/ContactList.js';

const Stack = createStackNavigator();

export default function App() {
  return (
        <View style={styles.container}>
          <ContactList/>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
