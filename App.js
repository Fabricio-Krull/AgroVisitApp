import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ImageSelector from './src/components/ImagePicker.js';
import ContactList from './src/components/ContactList.js';
import GlobalGeolocator from './src/components/GlobalGeolocator.js';

const Stack = createStackNavigator();

export default function App() {
  return (
        <View style={styles.container}>
          <GlobalGeolocator/>
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
