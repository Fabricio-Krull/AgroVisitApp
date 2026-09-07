import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { getContactsAsync } from 'expo-contacts/legacy';

export default function ContactList(){

    const [contacts, setContacts] = useState([]);

    const loadContacts = async () => {
        
        const { status } = await Contacts.requestPermissionsAsync();

        if(status === 'granted'){
            const { data } = await getContactsAsync({
                Fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });

            // console.log(data);

            if(data.length > 0){
                setContacts(data);
            }
            else
                alert("Permissão de acesso aos contatos negada.");
        };
    }

    const filterData = (list) => {
        return list.filter(item => item.name != "null null");
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={loadContacts}>
                <Text style={styles.buttonText}>Listar contatos</Text>
            </TouchableOpacity>
            <FlatList
                data={filterData(contacts)}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.contactItem}>
                        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
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

const styles = StyleSheet.create({
    container: {flex: 1, paddingTop: 50, alignItems: 'center'},
    button: {backgroundColor: '#018d86', padding: 15, borderRadius: 8, marginBottom: 20},
    buttonText: {color: '#fff', fontWeight: 'bold'},
    list: {width: '120%', paddingHorizontal: 20},
    contactItem: {padding: 15, borderBottomWidth: 1, borderBottomColor: '#cccccc'},
    contactName: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
    contactNumber: {fontSize: 14, color: '#666'}
})