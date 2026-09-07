import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';

export default function MotionSensors(){

    const [accelData, setAccelData] = useState({x: 0, y: 0, z: 0});
    const [gyroData, setGyroData] = useState({x: 0, y: 0, z: 0});    

    useEffect(() => {

        Accelerometer.setUpdateInterval(500);
        Gyroscope.setUpdateInterval(500);

        const accelSub = Accelerometer.addListener(data => setAccelData(data));
        const gyroSub = Gyroscope.addListener(data => setGyroData(data));

        return () => {
            accelSub.remove();
            gyroSub.remove();
        };
    }, []);    

    return (
        <View style={styles.container}>
            <View style={styles.sensorSection}>
                <Text style={styles.sensorTitle}>Acelerômetro (m/s2)</Text>
                <Text style={styles.textData}>Eixo X: {accelData.x.toFixed(2)}</Text>
                <Text style={styles.textData}>Eixo Y: {accelData.y.toFixed(2)}</Text>
                <Text style={styles.textData}>Eixo Z: {accelData.z.toFixed(2)}</Text>
            </View>

            <View style={styles.sensorSection}>
                <Text style={styles.sensorTitle}>Giroscópio (rad/s)</Text>
                <Text style={styles.textData}>Eixo X: {gyroData.x.toFixed(2)}</Text>
                <Text style={styles.textData}>Eixo Y: {gyroData.y.toFixed(2)}</Text>
                <Text style={styles.textData}>Eixo Z: {gyroData.z.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    sensorSection: {backgroundColor: '#719676', padding: 20, borderRadius: 8, marginVertical: 10, elevation: 2},
    sensorTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#ffffff'},
    textData: {fontSize: 16, fontFamily: 'monospace', marginVertical: 2, color: '#ffffff'}
})