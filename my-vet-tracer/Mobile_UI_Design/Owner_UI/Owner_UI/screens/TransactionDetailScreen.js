import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransactionDetailScreen = ({ route }) => {
    const { transaction } = route.params;

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

    return (
        <ScrollView style={styles.detailContainer}>
            <View style={styles.detailHeader}>
                <Text style={styles.detailTitle}>Transaction Details</Text>
                <Text style={styles.detailSubtitle}>
                    #{transaction._id.slice(-6)}
                </Text>
            </View>

            <View style={styles.detailContent}>
                <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                            <Icon name="person" size={20} color="#5f6368" />
                            <Text style={styles.detailLabel}>Customer</Text>
                        </View>
                        <Text style={styles.detailValue}>
                            {transaction.customer?.name || 'Unknown Customer'}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                            <Icon name="attach-money" size={20} color="#5f6368" />
                            <Text style={styles.detailLabel}>Total Amount</Text>
                        </View>
                        <Text style={[styles.detailValue, styles.amount]}>
                            {Number(transaction.amount).toLocaleString('vi-VN')}₫
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={styles.detailLabelContainer}>
                            <Icon name="event" size={20} color="#5f6368" />
                            <Text style={styles.detailLabel}>Date</Text>
                        </View>
                        <Text style={styles.detailValue}>
                            {formatDate(transaction.date)}
                        </Text>
                    </View>
                </View>

                {transaction.services && transaction.services.length > 0 && (
                    <View style={styles.detailSection}>
                        <Text style={styles.sectionTitle}>Services</Text>
                        {transaction.services.map((service, index) => (
                            <View key={index} style={styles.serviceItem}>
                                <View style={styles.serviceInfo}>
                                    <Icon name="spa" size={20} color="#5f6368" />
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                </View>
                                <Text style={styles.servicePrice}>
                                    {Number(service.price).toLocaleString('vi-VN')}₫
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default TransactionDetailScreen;