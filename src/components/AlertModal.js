import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function AlertModal({ visibleParam, onCancel, onAllow, onDeny, resolveCheckValue }){

    const [visible, setVisible] = useState(visibleParam);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setVisible(visibleParam);
    }, [visibleParam]);

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text>Este aplicativo está solicitando permissão de acesso à galeria do seu dispositivo</Text>
                    <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setIsChecked}
                    />
                    <Text>Não perguntar novamente</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.btn, styles.btnLeft]} 
                        onPress={onCancel}
                    >
                        <Text>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.btn, styles.btnMid]} 
                        onPress={() => {
                            onDeny();
                            resolveCheckValue(isChecked);
                        }}
                    >
                        <Text>Negar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.btn, styles.btnRight]} 
                        onPress={() => {
                            if(onAllow) onAllow(isChecked)
                            resolveCheckValue(isChecked);
                        }}
                    >
                        <Text>Permitir</Text>
                    </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: '80%', height: 200, backgroundColor: 'white', borderRadius: 10, padding: 20, justifyContent: 'space-between' },
    checkboxContainer: { alignItems: 'flex-start', flexDirection: 'row', gap: 15},
    buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%' },
    btn: { width: 80, height: 40, borderRadius: 5, marginLeft: 10 },
    btnLeft: { backgroundColor: '#e0e0e0', alignItems: 'center', justifyContent: 'center' },
    btnMid: { backgroundColor: '#ff3d3d', alignItems: 'center', justifyContent: 'center' },
    btnRight: { backgroundColor: '#37a97e', alignItems: 'center', justifyContent: 'center' }
});