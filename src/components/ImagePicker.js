import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageSelector(){

    const [imageUri, setImageUri] = useState(null);

    const selectImage = async () => {

        const resultPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!resultPermission.granted){
            alert("A permissão de acesso à mídia é obrigatória.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });

        if(!result.canceled){
            setImageUri(result.assets[0].uri);
        }
    };

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Selecionar imagem da galeria</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex:1, justifyContent: 'center', alignItems: 'center'},
    button: { backgroundColor: '#007aff', padding: 15, borderRadius: 8},
    buttonText: { color: '#ffffff', fontWeight: 'bold'},
    imagePreview: { width: 300, height: 300, marginTop: 20, borderRadius: 8}
});