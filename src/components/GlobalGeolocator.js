import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import GPSAccuracyMeter from './GPSAccuracyMeter';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import MapPin from 'lucide-react-native/icons/map-pin';

export default function GlobalGeolocator({screenChange}) {

    const HISTORY_KEY = "gpsData";

    const addToHistory = async (data) => {
        try{
            const currentHistoryString = await AsyncStorage.getItem(HISTORY_KEY);
            
            const parsedData = currentHistoryString ? JSON.parse(currentHistoryString) : [];
            const currentHistory = Array.isArray(parsedData) ? parsedData : [];

            const newHistory = [data, ...currentHistory];
            const limitedHistory = newHistory.slice(0, 10);

            await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
        }
        catch(error){
            console.log("Erro ao salvar dados no histórico: " + error);
        }
    }
    
    const [position, setPosition] = useState(null);

    const getCurrentPosition = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted'){
            alert("A permissão de localização é necessária.");
            return;
        }

        let locationResult = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });
        setPosition(locationResult);

        const now = new Date();

        const locationCopy = {...locationResult, date: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}` };

        // AsyncStorage.clear();

        addToHistory(locationCopy);
    };

    return (

        <View style={styles.container}>
            <View style={{flexDirection: 'row', gap: 25}}>
                <TouchableOpacity style={styles.button} onPress={getCurrentPosition}>
                    <Text style={styles.buttonText}>
                        Obter coordenadas GPS
                    </Text>
                </TouchableOpacity>
                {position && <GPSAccuracyMeter margin={position.coords.accuracy}/>}
            </View>

            {position && (
                <View style={styles.posPanel}>
                    <Text style={styles.dataText}>Latitude: {position.coords.latitude}</Text>
                    <Text style={styles.dataText}>Longitude: {position.coords.longitude}</Text>
                    <Text style={styles.dataText}>Margem de erro: {position.coords.accuracy?.toFixed(2)} metros</Text>
                </View>
            )}
            <TouchableOpacity style={styles.historyBtn} onPress={screenChange}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Ver histórico</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    button: {backgroundColor: '#719676', padding: 15, borderRadius: 8},
    buttonText: {color: '#ffffff', fontWeight: 'bold'},
    posPanel: {marginTop: 30, padding: 20, backgroundColor: '#ecffda', borderRadius: 8, elevation: 2},
    dataText: {fontSize: 16, marginVertical: 5, fontFamily: 'monospace'},
    historyBtn: {height: 30, width: '60%', margin: 100, backgroundColor: '#02882a', alignItems: 'center', justifyContent: 'center', borderRadius: 8}
});