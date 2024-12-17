import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddCustomerScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddCustomer = async () => {
        if (!name.trim() || !phone.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('userToken');
            await axios.post(
                'https://kami-backend-5rs0.onrender.com/customers',
                { name, phone },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Success', 'Customer added successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add customer');
        }
    };

    return (
        <ScrollView style={styles.formScreen}>
            <View style={styles.formHeader}>
                <Text style={styles.formTitle}>Add New Customer</Text>
                <Text style={styles.formSubtitle}>Enter customer information</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Customer Name</Text>
                <View style={styles.inputContainer}>
                    <Icon name="person" size={24} color="#1a73e8" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter customer name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#5f6368"
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>
                    <Icon name="phone" size={24} color="#1a73e8" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        placeholderTextColor="#5f6368"
                    />
                </View>
            </View>

            <TouchableOpacity 
                style={[styles.formButton, !name || !phone ? styles.buttonDisabled : null]}
                onPress={handleAddCustomer}
                disabled={!name || !phone}
            >
                <Text style={styles.formButtonText}>Add Customer</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddCustomerScreen;