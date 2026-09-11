import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GpsScreen() {

  const HISTORY_KEY = "gpsData";

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
          <Text style={styles.title}>Histórico de Coordenadas</Text>
          <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                  <View style={styles.item}>
                      {item.coords.latitude && item.coords.longitude && item.coords.accuracy && (
                        <>
                            <Text style={styles.text}>Data: {item.date}</Text>
                            <Text style={styles.text}>Latitude: {item.coords.latitude}</Text>
                            <Text style={styles.text}>Longitude: {item.coords.longitude}</Text>
                            <Text style={styles.text}>Margem de erro: {item.coords.accuracy?.toFixed(2)}</Text>
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
      height: '100%',
      // backgroundColor: '#ff0000',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    list: {
      top: 100,
      height: '100%',
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