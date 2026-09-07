import GlobalGeolocator from './src/components/GlobalGeolocator.js';

export default function GeolocatorScreen() {
  return (
        <View style={styles.container}>
          <GlobalGeolocator/>
        </View>
  );
}