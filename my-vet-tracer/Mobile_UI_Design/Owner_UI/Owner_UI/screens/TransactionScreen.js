import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionScreen = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('https://kami-backend-5rs0.onrender.com/transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(response.data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch transactions');
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTransactions();
        });
        return unsubscribe;
    }, [navigation]);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.transactionCard}
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
        >
            <View style={styles.transactionHeader}>
                <View style={styles.transactionId}>
                    <Icon name="receipt" size={20} color="#EF506B" />
                    <Text style={styles.transactionIdText}>#{item._id.slice(-6)}</Text>
                </View>
                <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
            </View>
            
            <View style={styles.transactionBody}>
                <View style={styles.customerInfo}>
                    <Icon name="person" size={20} color="#5f6368" />
                    <Text style={styles.customerName}>
                        {item.customer?.name || 'Unknown Customer'}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Amount:</Text>
                    <Text style={styles.amount}>
                        {Number(item.amount).toLocaleString('vi-VN')}₫
                    </Text>
                </View>
            </View>

            <View style={styles.transactionFooter}>
                <Icon name="chevron-right" size={24} color="#1a73e8" />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Icon name="receipt-long" size={48} color="#dadce0" />
                        <Text style={styles.emptyText}>No transactions yet</Text>
                        <Text style={styles.emptySubText}>Transactions will appear here</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default TransactionScreen;