import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MotionSensors({screenChange}){

    const HISTORY_KEY = "sensorData";

    const accelRef = useRef({x: 0, y: 0, z: 0});
    const gyroRef = useRef({x: 0, y: 0, z: 0});

    const [accelData, setAccelData] = useState({x: 0, y: 0, z: 0});
    const [gyroData, setGyroData] = useState({x: 0, y: 0, z: 0});

    const [sensorData, setSensorData] = useState({
        gyro: null,
        accel: null,
        date: null
    });

    const addToHistory = async (data) => {
        try{
            if(!isSecureLocked){
                const currentHistoryString = await AsyncStorage.getItem(HISTORY_KEY);
                
                const parsedData = currentHistoryString ? JSON.parse(currentHistoryString) : [];
                const currentHistory = Array.isArray(parsedData) ? parsedData : [];
    
                const newHistory = [data, ...currentHistory];
                const limitedHistory = newHistory.slice(0, 10);
    
                await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
            }
        }
        catch(error){
            console.log("Erro ao salvar dados no histórico: " + error);
        }
    }

    const [isSecureLocked, setIsSecureLocked] = useState(false);

    useEffect(() => {

        // alert(JSON.stringify(sensorData));

        Accelerometer.setUpdateInterval(500);
        Gyroscope.setUpdateInterval(500);

        const accelSub = Accelerometer.addListener(data => {
            accelRef.current = data;
            if(!isSecureLocked){
                setAccelData(data);

            }
            const safetyCheck = (data.x*data.x + data.y*data.y + data.z*data.z);

            if(safetyCheck >= 2.0){
                // alert(JSON.stringify(sensorData));
                setIsSecureLocked(true);
                Alert.alert(
                    "Instabilidade Física Detectada",
                    "Foi detectada uma movimentação brusca possivelmente acidental. Envio de dados interrompido. Para reativar o envio, desative a trava de segurança.",
                    [
                        {text: "Desativar trava de segurança", onPress: () => {
                            setIsSecureLocked(false);
                        }}
                    ]
                );
            }
        });

        const gyroSub = Gyroscope.addListener(data => {
            gyroRef.current = data;
            setGyroData(data);
        });

        const intervalId = setInterval(() => {
            if(!isSecureLocked){
                const now = new Date();
                const snapshot = {
                    accel: accelRef.current,
                    gyro: gyroRef.current,
                    date: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
                }
                addToHistory(snapshot);
            }
        }, 5000);

        setSensorData({...sensorData, 
            gyro: gyroData,
            accel: accelData,
            date: Date.now()
        });
        return () => {
            accelSub.remove();
            gyroSub.remove();
            clearInterval(intervalId);
        };
    }, [isSecureLocked]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.historyBtn} onPress={screenChange}>
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