import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SensorScreen() {

  const HISTORY_KEY = "sensorData";

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {

      try{
        const currentHistoryString = await AsyncStorage.getItem(HISTORY_KEY);

        const currentHistory = currentHistoryString ? JSON.parse(currentHistoryString) : [];

        // console.log(currentHistory);

        setHistory(currentHistory);
      }
      catch(error){
        console.log("Erro ao carregar histórico: " + error);
      }
  }

  loadHistory();
  }, []);

  return (
        <View style={styles.container}>
          <Text style={styles.title}>Histórico de Sensores</Text>
          <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                  <View style={styles.item}>
                      {item.accel && item.gyro && item.date && (
                          <>
                              <Text style={styles.text}>Data: {item.date}</Text>
                              <Text style={styles.text}>Acelerômetro: X: {item.accel.x?.toFixed(2)} - Y: {item.accel.y?.toFixed(2)} - Z: {item.accel.z?.toFixed(2)}</Text>
                              <Text style={styles.text}>Giroscópio: X: {item.gyro.x?.toFixed(2)} - Y: {item.gyro.y?.toFixed(2)} - Z: {item.gyro.z?.toFixed(2)}</Text>
                          </>
                      )}
                  </View>
              )}
              style={styles.list}
          />
        </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      top: 100,
      height: '90%',
      width: '100%',
      paddingHorizontal: 20,
    },
    text: {
      color: '#FFFFFF',
      fontSize: 12,
      marginBottom: 10,
    },
    item: {
      backgroundColor: '#333333',
      padding: 10,
      marginBottom: 10,
    },
    title: {
      color: '#ffef5c',
      fontWeight: 'bold',
      fontSize: 20,
      top: 50
    }
  });