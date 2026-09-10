import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import ContactList from './src/components/ContactList.js';
import GlobalGeolocator from './src/components/GlobalGeolocator.js';
import ImageSelector from './src/components/ImagePicker.js';
import MotionSensors from './src/components/Sensors.js';

import HomeScreen from './src/screens/HomeScreen.js';
import SensorScreen from './src/screens/SensorHistoryScreen.js';

import House from 'lucide-react-native/icons/house';
import MapPin from 'lucide-react-native/icons/map-pin';
import Phone from 'lucide-react-native/icons/phone';
import Camera from 'lucide-react-native/icons/camera';
import Siren from 'lucide-react-native/icons/siren';
import Settings from 'lucide-react-native/icons/settings';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function App() {

  const [section, setSection] = useState("home");

  useEffect(() => {
    changeSection(section);
  }, [section]);

  const changeSection = (section) => {
    if(section === "gps") setSection(<GlobalGeolocator/>)
    else if(section === "contacts") setSection(<ContactList/>)
    else if(section === "image") setSection(<ImageSelector/>)
    else if(section === "sensors") setSection(<MotionSensors screenChange={() => setSection("sensorHistory")}/>)
    else if(section === "home") setSection(<HomeScreen/>)
    else if(section === "sensorHistory") setSection(<SensorScreen/>)
  }

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

            <TouchableOpacity style={styles.button} onPress={() => changeSection("gps")}>
                <MapPin/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => changeSection("contacts")}>
                <Phone/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => changeSection("home")}>
              <House/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => changeSection("image")}>
              <Camera/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => changeSection("sensors")}>
              <Siren/>
            </TouchableOpacity>
            

          </View>
          <View style={styles.content}>
            {section}
          </View>
        </View>
  );
}

