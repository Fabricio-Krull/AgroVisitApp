import MotionSensors from './src/components/Sensors.js';

export default function SensorScreen() {
  return (
        <View style={styles.container}>
          <MotionSensors/>
        </View>
  );
}