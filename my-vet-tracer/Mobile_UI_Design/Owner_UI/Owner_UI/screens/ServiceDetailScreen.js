import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ServiceDetailScreen = ({ route, navigation }) => {
    const { service } = route.params;

    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            await axios.delete(
                `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Success', 'Service deleted successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete service');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this service?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: handleDelete, style: 'destructive' }
            ]
        );
    };

    return (
        <View style={styles.formScreen}>
            <View style={styles.detailCard}>
                <Text style={styles.detailTitle}>{service.name}</Text>
                <Text style={styles.detailPrice}>
                    {Number(service.price).toLocaleString('vi-VN')}₫
                </Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('EditService', { service })}
                >
                    <Icon name="edit" size={24} color="#1a73e8" />
                    <Text style={styles.actionButtonText}>Edit Service</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={confirmDelete}
                >
                    <Icon name="delete" size={24} color="#dc3545" />
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                        Delete Service
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ServiceDetailScreen;