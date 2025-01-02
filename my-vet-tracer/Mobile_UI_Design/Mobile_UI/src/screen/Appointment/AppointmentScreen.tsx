import React, { useMemo } from 'react';
import { useEffect, useState } from "react";
import createStyles from "./AppointmentScreen.style";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { useGetUserInfo } from '../../queries/auth/useGetUserInfo';
import { useGetListPets } from '../../queries/pet/useGetPets';
import { useGetVaccinesByPets } from '../../queries/vaccine/useGetVaccineByPet';
import { useGetPetById } from '../../queries/pet/useGetPetById';
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { useGetAppointmentsByPets } from '../../queries/appoinment/useGetAppointmentByPet';

const AppointmentScreen: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { data: owner } = useGetUserInfo();
    if (!owner) {
        return <Text>Loading or Error: No user info available</Text>;
    }

    const { data: pets, isFetching: isFetchingPets } = useGetListPets(owner.idOwnerUser);

    const petIds = pets?.map((pet) => pet.idPet) || [];

    const { data: appointments, isFetching: isFetchingAppointments } = useGetAppointmentsByPets(petIds);

    if (isFetchingPets || isFetchingAppointments) {
        return <Text>Loading...</Text>;
    }
    const handleAddPress = () => {
        NavigationService.push(SCREENS.BEFOREADDAPPOINTMENT);
    };
    const renderAppointmentItem = ({ item }: { item: any }) => {
        const pet = pets?.find((p) => p.idPet === item.pet.idPet);

        const isConfirmed = item.isConfirmed;
        const checkConfirm = isConfirmed === 1;

        return (
            <View style={styles.card}>
                <Image source={{ uri: pet?.img }} style={styles.profileImage} />

                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{item.time}</Text>
                    <Text style={styles.cardTime}>Date: {item.veterinarian}</Text>
                    <Text style={styles.cardSubtitle}>Pet Name: {pet?.petName || "Unknown"}</Text>

                </View>
                <View
                    style={[
                        styles.statusLabel,
                        { backgroundColor: checkConfirm ? "blue" : "red" },
                    ]}
                >
                    <Text style={styles.statusLabelText}>
                        {checkConfirm ? "Accepted" : "Request"}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <ScrollView style={styles.container}>


            <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.header}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                        style={styles.goBackButton}
                        onPress={() => NavigationService.goBack()}
                    >
                        <Icon
                            name="arrow-back-sharp"
                            type={IconType.Ionicons}
                            color='#ffffff'
                            size={35}
                        />
                    </TouchableOpacity>
                    <View style={styles.profileContainer}>
                        <View>
                            <Text style={[styles.greeting, { textAlign: 'right', marginRight: 20, }]}>Hello</Text>
                            <Text style={[styles.name, { textAlign: 'right', marginRight: 10, }]}>{owner?.fullName}</Text>
                        </View>
                        <Image
                            source={{ uri: owner?.img }}
                            style={styles.profileImage}
                        />
                    </View>

                </View>
            </LinearGradient>

            <View style={styles.section}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.sectionTitle}>Your Appointment</Text>
                    <TouchableOpacity style={styles.cardAdd} onPress={() => handleAddPress()}>
                        <Icon
                            name={"plus"}
                            style={styles.addIcon}
                            size={24}
                            color="#EF506B"
                            type={IconType.Entypo}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={appointments}
                    keyExtractor={(item) => `${item.idAppointment}`}
                    renderItem={renderAppointmentItem}
                />
            </View>


        </ScrollView>
    );
};



export default AppointmentScreen;