import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import ContactList from './src/components/ContactList.js';
import GlobalGeolocator from './src/components/GlobalGeolocator.js';
import ImageSelector from './src/components/ImagePicker.js';
import MotionSensors from './src/components/Sensors.js';

import HomeScreen from './src/screens/HomeScreen.js';
import SensorScreen from './src/screens/SensorHistoryScreen.js';
import GpsScreen from './src/screens/GPSHistoryScreen.js';

import House from 'lucide-react-native/icons/house';
import MapPin from 'lucide-react-native/icons/map-pin';
import Phone from 'lucide-react-native/icons/phone';
import Camera from 'lucide-react-native/icons/camera';
import Siren from 'lucide-react-native/icons/siren';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function App() {

  const [section, setSection] = useState(<HomeScreen/>);

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {backgroundColor: '#1e8676', width: width, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 25, position: 'absolute', top: 0},
    button: {backgroundColor: '#37a97e', height: 40, width: 40, borderRadius: 100, justifyContent: 'center', alignItems: 'center'},
    buttonText: {color: '#fff', fontSize: 10},
    content: {height: height - 100, width: '85%'}
  });

  return (
        <View style={styles.container}>
          <View style={styles.header}>

            <TouchableOpacity style={styles.button} onPress={() => setSection(<GlobalGeolocator screenChange={() => setSection(<GpsScreen/>)}/>)}>
                <MapPin/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setSection(<ContactList/>)}>
                <Phone/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setSection(<HomeScreen/>)}>
              <House/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setSection(<ImageSelector/>)}>
              <Camera/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setSection(<MotionSensors screenChange={() => setSection(<SensorScreen/>)}/>)}>
              <Siren/>
            </TouchableOpacity>
            

          </View>
          <View style={styles.content}>
            {section}
          </View>
        </View>
  );
}

