import React from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SensorScreen() {
  return (
        <View style={styles.container}>
          <FlatList />
        </View>
  );
}