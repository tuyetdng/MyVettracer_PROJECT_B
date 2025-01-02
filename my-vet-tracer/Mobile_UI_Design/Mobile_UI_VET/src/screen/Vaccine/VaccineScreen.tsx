import React, { useMemo } from 'react';
import { useEffect, useState } from "react";
import createStyles from "./VaccineScreen.style";
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
import { useGetVetUserInfo } from '../../queries/vet/useGetUserInfo';

const VaccineScreen: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { data: vet } = useGetVetUserInfo();
    if (!vet) {
        return <Text>Loading or Error: No user info available</Text>;
    }

    const { data: pets, isFetching: isFetchingPets } = useGetListPets(vet.idVetUser);

    const petIds = pets?.map((pet) => pet.idPet) || [];

    const { data: vaccines, isFetching: isFetchingVaccines } = useGetVaccinesByPets(petIds);

    if (isFetchingPets || isFetchingVaccines) {
        return <Text>Loading...</Text>;
    }
    const today = new Date();

    const renderVaccineItem = ({ item }: { item: any }) => {
        const pet = pets?.find((p) => p.idPet === item.pet.idPet);
        const vaccineDate = new Date(item.date);
        const isUpcoming = vaccineDate > today;
        const statusImage = isUpcoming
            ? "https://i.pinimg.com/736x/cc/36/e7/cc36e75e69ceb1ebc1bb2a8161771159.jpg"
            : "https://i.pinimg.com/736x/8e/41/2c/8e412c2c7bc71225cec07afcbc8f5326.jpg";

        return (
            <View style={styles.card}>
                <Image source={{ uri: pet?.img }} style={styles.profileImage} />

                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{item.vacName}</Text>
                    <Text style={styles.cardTime}>Date: {item.date}</Text>
                    <Text style={styles.cardSubtitle}>Pet Name: {pet?.petName || "Unknown"}</Text>
                    <Text style={styles.cardSubtitle}>Dose: {item.dose}</Text>
                    <Text style={styles.cardSubtitle}>Total: $ {item.total}</Text>
                </View>
                <View style={styles.statusLabel}>
                    <Image source={{ uri: statusImage }} style={styles.statusLabel} />
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
                            <Text style={[styles.name, { textAlign: 'right', marginRight: 10, }]}>{vet?.fullName}</Text>
                        </View>
                        <Image
                            source={{ uri: vet?.img }}
                            style={styles.profileImage}
                        />
                    </View>

                </View>
            </LinearGradient>

            <View style={styles.section}>
                <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.sectionTitle}>Manage Vaccine</Text>
                    <TouchableOpacity style={styles.addButton}
                        onPress={() => NavigationService.navigate(SCREENS.ADDVACCINE)}
                    >
                        <Icon

                            name="pluscircle"
                            type={IconType.AntDesign}
                            color='orange'
                            size={35}

                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={vaccines}
                    keyExtractor={(item) => `${item.idVac}`}
                    renderItem={renderVaccineItem}
                />

            </View>


        </ScrollView>
    );
};



export default VaccineScreen;