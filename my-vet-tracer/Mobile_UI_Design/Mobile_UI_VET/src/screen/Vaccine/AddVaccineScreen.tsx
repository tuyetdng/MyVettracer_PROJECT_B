import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CalenderScreen from '../Calender/CalenderScreen';
import * as NavigationService from "react-navigation-helpers";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { API_QUERIES } from '../../queries/keys';
import { SCREENS } from '../../shared/constants';
import { useGetPetsByVetID } from '../../queries/pet/useGetPetsByVetID';
import { useGetVetUserInfo } from '../../queries/vet/useGetUserInfo';
import { PetResponseType } from '../../queries/pet/types';

interface VaccineFormData {
    vacName: string;
    dose: string;
    time: string;
    total: number;
    idUser: number;
    idPet: number;
}

const AddVaccineScreen: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(''); // State for selected date
    const [timeInput, setTimeInput] = useState<string>(''); // State for time input
    const { data: vet } = useGetVetUserInfo();
    const { data: petList } = useGetPetsByVetID(Number(vet?.idVetUser));
    const [idPet, setIdPet] = useState<number>(1);
    const { control, handleSubmit, reset } = useForm<VaccineFormData>({
        defaultValues: {
            vacName: '',
            dose: '',
            time: '',
            total: 0,
            idPet: 0,
            idUser: vet?.idVetUser

        },
    });
    const queryClient = useQueryClient();

    const onSubmit = async (data: VaccineFormData) => {
        if (!data.vacName || !data.dose || !data.time || !data.total) {
            Alert.alert('Error', 'Please fill all required fields!');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'Unable to authenticate. Please log in again.');
                return;
            }

            const payload = {
                ...data,
                total: Number(data.total),
            };

            const response = await axios.post(
                'http://10.0.2.2:8080/myvettracer/vaccine',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.code === 1000) {
                queryClient.invalidateQueries([API_QUERIES.VACCINE]);
                Alert.alert('Success', 'Vaccine added successfully!', [
                    { text: 'OK', onPress: () => NavigationService.push(SCREENS.VACCINE) },
                ]);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to add Vaccine.');
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(
                'Error',
                error.response?.data?.message || 'An error occurred. Please try again later.'
            );
        }
        reset();
    };
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
        <ScrollView>
            <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
                <Icon
                    name="arrow-back-sharp"
                    type={IconType.Ionicons}
                    color='#000000'
                    size={35}
                />
            </TouchableOpacity>
            {/* Calendar Component */}
            <CalenderScreen onDateSelect={(date) => {
                setSelectedDate(date)

                setTimeInput(date);
            }
            } />

            <View style={styles.container}>
                <Text style={styles.title}>Add New Vaccine</Text>


                {/* Name Field */}
                <Controller
                    name="vacName"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />

                {/* Role Field */}
                <Controller
                    name="dose"
                    control={control}
                    rules={{ required: 'Dose is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Dose"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />
                <Controller
                    name="total"
                    control={control}
                    rules={{ required: 'Dose is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Total"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={Number(value).toString()}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />
                <Controller
                    name="time"
                    control={control}
                    rules={{ required: 'Time is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Time"
                                onBlur={onBlur}
                                onChangeText={(text) => {
                                    setTimeInput(text); // Update local time input state
                                    onChange(text); // Update form state
                                }}
                                value={timeInput} // Bind local state to input field
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />
               
                <Text style={styles.sectionTitle}>Select Vet</Text>
                <ScrollView style={{ height: 500 }}>
                    <FlatList
                        data={petList}
                        renderItem={renderPetItem}
                        keyExtractor={(item) => item.idPet.toString()}
                        contentContainerStyle={styles.flatListContainer}
                    />

                </ScrollView>
                <Button title="Add Appointment" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    errorInput: { borderColor: 'red' },
    errorText: { color: 'red', marginBottom: 10 },
    goBackButton: {
        marginTop: 20,
    },
    goBackText: {
        fontSize: 16,
        color: "#007BFF",
    },
    saveButton: {
        backgroundColor: '#5EC088',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        backgroundColor: "#ffffff",
    },
    selectedCard: {
        borderColor: "blue",
        borderWidth: 2,
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    cardDetails: {
        flex: 1,
    },
    cardName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#888",
    },
    cardTime: {
        fontSize: 12,
        color: "#888",
        marginTop: 5,
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
    flatListContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 10,
    },
    saveButtonText: { color: '#fff', fontSize: 16 },
});

export default AddVaccineScreen;