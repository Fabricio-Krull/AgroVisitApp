import { StyleSheet, Text, View } from 'react-native';
import ImageSelector from '../components/ImagePicker.js';

export default function ImageScreen() {
  return (
    <View style={styles.container}>
      <ImageSelector/>
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
