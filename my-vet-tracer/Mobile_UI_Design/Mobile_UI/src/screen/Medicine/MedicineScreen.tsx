import React, { useMemo } from 'react';
import { useEffect, useState } from "react";
import createStyles from "./MedicineScreen.style";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { useGetUserInfo } from '../../queries/auth/useGetUserInfo';
import { useGetListPets } from '../../queries/pet/useGetPets';
import { useGetPetById } from '../../queries/pet/useGetPetById';
import * as NavigationService from "react-navigation-helpers";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

import { SCREENS } from "../../shared/constants";
import { useGetMedicineByPet, useGetMedicinesByPets } from '../../queries/medicine/useGetMedicineByPet';

const MedicineScreen: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { data: owner } = useGetUserInfo();
    if (!owner) {
        return <Text>Loading or Error: No user info available</Text>;
    }

    const { data: pets, isFetching: isFetchingPets } = useGetListPets(owner.idOwnerUser);

    const petIds = pets?.map((pet) => pet.idPet) || [];

    const { data: medicines, isFetching: isFetchingMedicines } = useGetMedicinesByPets(petIds);

    if (isFetchingPets || isFetchingMedicines) {
        return <Text>Loading...</Text>;
    }
    const today = new Date();

    const renderMedicineItem = ({ item }: { item: any }) => {
        const pet = pets?.find((p) => p.idPet === item.pet.idPet);
     
        return (
            <View style={styles.card}>
                <Image source={{ uri: pet?.img }} style={styles.profileImage} />

                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{item.medName}</Text>
                    <Text style={styles.cardTime}>Amount: {item.amount}</Text>
                    <Text style={styles.cardSubtitle}>Pet Name: {pet?.petName || "Unknown"}</Text>
                    <Text style={styles.cardSubtitle}>Dose: {item.dose}</Text>
                    <Text style={styles.cardSubtitle}>Total: $ {item.total}</Text>
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
                <Text style={styles.sectionTitle}>Your Petie's Medicine</Text>

                <FlatList
                    data={medicines}
                    keyExtractor={(item) => `${item.idMed}`}
                    renderItem={renderMedicineItem}
                />
            </View>


        </ScrollView>
    );
};



export default MedicineScreen;