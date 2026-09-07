import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

export default function GlobalGeolocator() {
    
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
    };

    return (

        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={getCurrentPosition}>
                <Text style={styles.buttonText}>
                    Obter coordenadas GPS
                </Text>
            </TouchableOpacity>

            {position && (
                <View style={styles.posPanel}>
                    <Text style={styles.dataText}>Latitude: {position.coords.latitude}</Text>
                    <Text style={styles.dataText}>Longitude: {position.coords.longitude}</Text>
                    <Text style={styles.dataText}>Precisão: {position.coords.accuracy} metros</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    button: {backgroundColor: '#719676', padding: 15, borderRadius: 8},
    buttonText: {color: '#ffffff', fontWeight: 'bold'},
    posPanel: {marginTop: 30, padding: 20, backgroundColor: '#d0f6ac', borderRadius: 8, elevation: 2},
    dataText: {fontSize: 16, marginVertical: 5, fontFamily: 'monospace'}
});