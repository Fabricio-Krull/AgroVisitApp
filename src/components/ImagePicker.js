import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AlertModal from './AlertModal';

export default function ImageSelector(){

    const [imageData, setImageData] = useState({
        uri: null,
        perm: 'denied',
        canAskAgain: true
    });

    // const handleAllow = async (isChecked) => {
    //     setImageData({...imageData, canAskAgain: !isChecked});
    // }

    const [modalVisible, setModalVisible] = useState(false);

    const resolveCheckValue = (isChecked) => {
        setImageData({...imageData, canAskAgain: !isChecked})
    }

    const selectImage = async () => {
        
        setModalVisible(true);

        console.log(imageData);

        // if(imageData.canAskAgain)
        //     Alert.alert(
        //     "Alerta",
        //     "O aplicativo AgroVisitApp está solicitando acesso à galeria do dispositivo",
        //     [
        //         { text: "Não permitir", onPress: () => {
        //             setImageData({...imageData, perm:'denied'});
        //         }},

        //         { text: "Permitir", onPress: async () => {
        //             setImageData({...imageData, perm:'granted'});

        //             // chamada da galeria aqui dentro pois o Alert.alert não é assíncrono

        //             if(imageData.perm === 'granted'){
        //                 const result = await ImagePicker.launchImageLibraryAsync({
        //                     // mediaTypes: ImagePicker.MediaType.Images, //retorna erro
        //                     allowsEditing: true,
        //                     aspect: [1,1],
        //                     quality: 1,
        //                 });

        //                 if(!result.canceled){
        //                     setImageData({...imageData,
        //                         uri: result.assets[0].uri
        //                     });
        //                 }

        //             } // if(imagePerm)
        //         }},
        //     ]
        // );





        // Configurar depois

        // if(!resultPermission.granted){
        //     alert("A permissão de acesso à mídia é obrigatória.");
        //     return;
        // }

        // if(!resultPermission.canAskAgain){
        //     alert("Essa permissão foi bloqueada permanentemente no aplicativo");
        //     return;
        // }

    };

    return(
        <View style={styles.container}>
            <AlertModal visibleParam={modalVisible} resolveCheckValue={resolveCheckValue}
                onDeny={() => {
                    setImageData({...imageData, perm: 'denied'});
                    setModalVisible(false);
                }} 
                onAllow={async () => {
                    setImageData({...imageData, perm: 'granted'});
                    setModalVisible(false);
                    // handleAllow();

                    if(imageData.perm === 'granted'){
                        const result = await ImagePicker.launchImageLibraryAsync({
                            // mediaTypes: ImagePicker.MediaType.Images, //retorna erro
                            allowsEditing: true,
                            aspect: [1,1],
                            quality: 1,
                        });

                        if(!result.canceled){
                            setImageData({...imageData,
                                uri: result.assets[0].uri
                            });
                        }
                    }

                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
                />
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