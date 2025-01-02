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
import { useGetVetUserInfo } from '../../queries/vet/useGetUserInfo';
import { MedicineResponseType } from '../../queries/medicine/types';
import { useGetMedicineByVet } from '../../queries/medicine/useGetMedicineByVet';

const MedicineScreen: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { data: vet } = useGetVetUserInfo();
    if (!vet) {
        return <Text>Loading or Error: No user info available</Text>;
    }

    const { data: medicines, isFetching: isFetchingMedicines } = useGetMedicineByVet(vet.idVetUser);

    if (isFetchingMedicines) {
        return <Text>Loading...</Text>;
    }
    const handleEditPress = (medicine: MedicineResponseType) => {
        NavigationService.navigate(SCREENS.EDITMEDICINE, { medicine: medicine });
    }
    const today = new Date();

    const renderMedicineItem = ({ item }: { item: any }) => {

        return (
            <TouchableOpacity onPress={() => handleEditPress(item)}>
                <View style={styles.card}>

                    <View style={styles.cardDetails}>
                        <Text style={styles.cardName}>{item.medName}</Text>
                        <Text style={styles.cardTime}>Amount: {item.amount}</Text>
                        <Text style={styles.cardSubtitle}>Dose: {item.dose}</Text>
                        <Text style={styles.cardSubtitle}>Total: $ {item.total}</Text>
                    </View>

                </View>
            </TouchableOpacity>
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
                <View style={styles.addButtonContainer}>
                    <Text style={styles.sectionTitle}>Manage Medicine</Text>
                    <TouchableOpacity style={styles.addButton}
                        onPress={() => NavigationService.navigate(SCREENS.ADDMEDICINE)}
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
                    data={medicines}
                    keyExtractor={(item) => `${item.idMed}`}
                    renderItem={renderMedicineItem}
                />
            </View>


        </ScrollView>
    );
};



export default MedicineScreen;