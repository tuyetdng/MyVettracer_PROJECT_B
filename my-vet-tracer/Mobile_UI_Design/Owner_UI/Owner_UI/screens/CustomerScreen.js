import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';

const CustomerScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('https://kami-backend-5rs0.onrender.com/customers', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch customers');
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.phone}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('AddCustomer')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomerScreen;