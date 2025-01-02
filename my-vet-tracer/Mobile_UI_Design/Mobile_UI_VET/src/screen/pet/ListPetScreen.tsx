import React, { useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useTheme } from "@react-navigation/native";
import { useGetListPets } from "../../queries/pet/useGetPets";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { PetResponseType } from "../../queries/pet/types";
import { useGetVetUserInfo } from "../../queries/vet/useGetUserInfo";
import LinearGradient from "react-native-linear-gradient";
import { useGetIsConfirmAppointmentByVet } from "../../queries/appoinment/useGetIsConfirmAppointmentByVet";
import { VetResponseType } from "../../queries/vet/types";
import { useGetNotConfirmAppointmentByVet } from "../../queries/appoinment/useGetNotConfirmAppointmentByVet";
import { useGetPetsByVetID } from "../../queries/pet/useGetPetsByVetID";
import { useConfirmAppointment } from "../../queries/appoinment/useConfirmAppointment";
import { useQueryClient } from "react-query";
import { API_QUERIES } from "../../queries/keys";

interface ListPetScreenProp {
    vet: VetResponseType;
}

const ListPetScreen: React.FC<ListPetScreenProp> = () => {
    const { data: vet, isFetching: isVetLoading } = useGetVetUserInfo();
    const { data: pets } = useGetPetsByVetID(Number(vet?.idVetUser));
    const [idPet, setIdPet] = useState<number>(1);

    if (isVetLoading) {
        return <Text>Loading......</Text>;
    }

    if (!vet) {
        return <Text>Loading or Error: No user info available</Text>;
    }

    const handleViewDetails = (idPet: number) => {
        NavigationService.push(SCREENS.VIEWPET, { idPet: idPet });

    }
    const renderPetItem = ({ item }: { item: PetResponseType }) => (
        <TouchableOpacity
            style={[styles.card, idPet === item.idPet && styles.selectedCard]}
            onPress={() => setIdPet(item.idPet)}
        >
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
                <Text style={styles.cardName}>{item.petName}</Text>
                <Text style={styles.cardSubtitle}>{item.petType}</Text>
            </View>
            <TouchableOpacity
                style={styles.detailButton}
                onPress={() => handleViewDetails(item.idPet)}
            >
                <Text style={styles.detailButtonText}>Details</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.header}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: vet.img }} 
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.greeting}>Hello</Text>
                        <Text style={styles.name}>Dr.{vet.fullName}</Text>
                        <Text style={styles.subtitle}>Have a nice day</Text>
                    </View>
                </View>

            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>All your Assigned Pets</Text>

                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.idPet.toString()}
                    renderItem={renderPetItem}
                />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    header: {
        flex: 0.4,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    selectedCard: {
        borderColor: "blue",
        borderWidth: 2,
    },
    detailButton: {
        backgroundColor: "blue",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    detailButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    greeting: {
        color: '#fff',
        fontSize: 16,
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#fff',
        fontSize: 14,
    },
    headerImage: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    section: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 10,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    cardDetails: {
        flex: 1,
        marginLeft: 15,
    },
    cardName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#999',
    },
    cardTime: {
        fontSize: 14,
        color: '#555',
    },
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rejectButton: {
        backgroundColor: '#f44336',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    acceptButton: {
        backgroundColor: '#4caf50',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopColor: '#ddd',
    },
})
    ;

export default ListPetScreen;
