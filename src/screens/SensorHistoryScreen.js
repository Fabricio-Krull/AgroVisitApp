import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SensorScreen() {

  const HISTORY_KEY = "sensorData";

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {

      try{
        const currentHistoryString = await AsyncStorage.getItem(HISTORY_KEY);

        const currentHistory = currentHistoryString ? JSON.parse(currentHistoryString) : [];

        console.log(currentHistory);

        setHistory(currentHistory);
      }
      catch(error){
        console.log("Erro ao carregar histórico: " + error);
      }
  }

  loadHistory();
  }, []);

  return (
        <View>
          <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                  <View >
                      {item.accel && item.gyro && item.date && (
                          <>
                              <Text style={styles.contactName}>{item.name}</Text>
                              <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                          </>
                      )}
                  </View>
              )}
              style={styles.list}
          />
        </View>
  );
}