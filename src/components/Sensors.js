import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MotionSensors(){

    const [accelData, setAccelData] = useState({x: 0, y: 0, z: 0});
    const [gyroData, setGyroData] = useState({x: 0, y: 0, z: 0});

    const [sensorData, setSensorData] = useState({
        gyro: null,
        accel: null,
        date: null
    });

    const [isSecureLocked, setIsSecureLocked] = useState(false);

    useEffect(() => {

        // alert(JSON.stringify(sensorData));

        Accelerometer.setUpdateInterval(500);
        Gyroscope.setUpdateInterval(500);

        const accelSub = Accelerometer.addListener(data => {
            if(!isSecureLocked){
                setAccelData(data);

            }
            const safetyCheck = (data.x*data.x + data.y*data.y + data.z*data.z);

            if(safetyCheck >= 2.0){
                alert(JSON.stringify(sensorData));
                setIsSecureLocked(true);
                Alert.alert(
                    "Aviso",
                    "Foi detectada uma movimentação brusca possivelmente acidental. Envio de dados interrompido.",
                    [
                        {text: "Desativar trava de segurança", onPress: () => {
                            setIsSecureLocked(false);
                        }}
                    ]
                );
            }
        });
        const gyroSub = Gyroscope.addListener(data => setGyroData(data));

        return () => {
            setSensorData({...sensorData, 
                gyro: gyroData,
                accel: accelData,
                date: Date.now()
            });
            accelSub.remove();
            gyroSub.remove();
        };
    }, []);

    useEffect(() => {
        setInterval(async () => {
            try {
                const storedSensorData = JSON.stringify(await AsyncStorage.getItem("sensorData"));
                let dataList = [];

                if(!storedSensorData){
                    dataList.push(sensorData);
                    await AsyncStorage.setItem("sensorData", JSON.stringify(dataList));
                }
                else{
                    storedSensorData.push(sensorData);
                    await AsyncStorage.setItem("sensorData", JSON.stringify(storedSensorData));
                }

            }
            catch (error) {
                console.log("Error ao salvar:", error);
            }
        }, 5000);
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.historyBtn} onPress={async () => {
                alert(JSON.stringify(await AsyncStorage.getItem("sensorData")));
            }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Ver histórico</Text>
            </TouchableOpacity>
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
    textData: {fontSize: 16, fontFamily: 'monospace', marginVertical: 2, color: '#ffffff'},
    historyBtn: {height: 20, width: '100%', backgroundColor: '#014701', alignItems: 'center', justifyContent: 'center'}
})