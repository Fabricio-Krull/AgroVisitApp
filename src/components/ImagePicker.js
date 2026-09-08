import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AlertModal from './AlertModal';

export default function ImageSelector(){

    const [imageData, setImageData] = useState({
        uri: null,
        perm: 'denied',
        canAskAgain: true
    });

    const [modalVisible, setModalVisible] = useState(false);

    const resolveAlertValues = (isChecked, perm) => {
        setImageData({...imageData, perm: perm});
        setImageData({...imageData, canAskAgain: !isChecked});
    }

    const selectImage = async () => {
        
        // console.log((await ImagePicker.getMediaLibraryPermissionsAsync()));

        if(imageData.canAskAgain){
            setModalVisible(true);
        }

        else if(!imageData.canAskAgain && imageData.perm === 'denied'){
                Alert.alert(
                "Alerta",
                "Você bloqueou o acesso a mídia do dispositivo permanentemente. Para ativar novamente, vá até as configurações internas do dispositivo",
                [
                    { text: "Cancelar", onPress: () => {
                    }},

                    { text: "Ir às configurações", onPress: async () => {
                        setImageData({...imageData, canAskAgain: true});
                        Linking.openSettings();
                    }},
                ]
            );
        }
        else{
            // não perguntar novamente, permissão garantida
            if(imageData.canAskAgain === false && imageData.perm === 'granted'){
                ImagePicker.launchImageLibraryAsync();
            }
        }

    };

    return(
        <View style={styles.container}>
            {imageData.canAskAgain === true && <AlertModal visibleParam={modalVisible} resolveAlertValues={resolveAlertValues}
                onDeny={(isChecked) => {
                    setImageData(prev => ({
                        ...prev,
                        perm: 'denied',
                        canAskAgain: !isChecked
                    }));
                    setModalVisible(false);
                }}
                onAllow={async (isChecked) => {

                    setImageData(prev => ({
                        ...prev,
                        perm: 'granted',
                        canAskAgain: !isChecked
                    }));
                    setModalVisible(false);

                    const result = await ImagePicker.launchImageLibraryAsync({
                        allowsEditing: true,
                        aspect: [1,1],
                        quality: 1,
                    });

                    if (!result.canceled) {
                        setImageData(prev => ({
                            ...prev,
                            uri: result.assets[0].uri
                        }));
                    }
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
                />}
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Selecionar imagem da galeria</Text>
            </TouchableOpacity>
            {imageData.uri && <Image source={{ uri: imageData.uri }} style={styles.imagePreview}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex:1, justifyContent: 'center', alignItems: 'center'},
    button: { backgroundColor: '#018d86', padding: 15, borderRadius: 8},
    buttonText: { color: '#ffffff', fontWeight: 'bold'},
    imagePreview: { width: 300, height: 300, marginTop: 20, borderRadius: 8}
});