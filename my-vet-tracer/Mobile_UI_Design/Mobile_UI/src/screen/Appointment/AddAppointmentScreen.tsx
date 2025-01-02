import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CalenderScreen from '../Calender/CalenderScreen';
import * as NavigationService from "react-navigation-helpers";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { useGetUserInfo } from '../../queries/auth/useGetUserInfo';
import { useGetPetById } from '../../queries/pet/useGetPetById';
import { useGetVetOfPetByPetId } from '../../queries/pet/useGetVetOfPetByPetId';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_QUERIES } from '../../queries/keys';
import { useQueryClient } from 'react-query';
import { SCREENS } from '../../shared/constants';

interface AppointmentFormData {
    route: any;
    ownerName: string;
    veterinarian: string;
    time: string;
    idUser: number;
    idPet: number;
    isConfirmed: number;
}

const AddAppointmentScreen: React.FC<AppointmentFormData> = ({ route }) => {
    const { idPet } = route.params;
    const [selectedDate, setSelectedDate] = useState<string>(''); // State for selected date
    const [timeInput, setTimeInput] = useState<string>(''); // State for time input
    const { data: owner } = useGetUserInfo();
    const { data: vet } = useGetVetOfPetByPetId(idPet);
    const { control, handleSubmit, reset } = useForm<AppointmentFormData>({
        defaultValues: {
            ownerName: '',
            veterinarian: '',
            time: '',
            isConfirmed: 0,
            idPet: idPet,
            idUser: vet?.idVetUser,

        },
    });
    const queryClient = useQueryClient();

    const onSubmit = async (data: AppointmentFormData) => {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
            Alert.alert("Error", "Unable to authenticate. Please log in again.");
            return;
        }
        console.log("Appointment Form: " + data);
        if (!data.ownerName || !data.veterinarian || !data.time) {
            Alert.alert('Error', 'Please fill all required fields!');
            return;
        }
        try {
            console.log("Payload:", data);

            const response = await axios.post(
                `http://10.0.2.2:8080/myvettracer/appointment`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.code === 1000) {
                console.log("Response:", response.data);

                queryClient.invalidateQueries([API_QUERIES.APPOINTMENT]);
                Alert.alert("Success", "Appointment added successfully!", [
                    { text: "OK", onPress: () =>  NavigationService.push(SCREENS.APPOINMENT) },
                ]);
            } else {
                Alert.alert("Error", "Failed to add pet.");
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(
                "Error",
                error.response?.data?.message || "An error occurred. Please try again later."
            );
        }
        reset();
    };

    return (

        <ScrollView>

            {/* Calendar Component */}
            <CalenderScreen onDateSelect={(date) => {
                setSelectedDate(date)
                setTimeInput(date);
            }
            } />

            <View style={styles.container}>
                <Text style={styles.title}>Add New Appointment</Text>
                {/* Name Field */}
                <Controller
                    name="ownerName"
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
                    name="veterinarian"
                    control={control}
                    rules={{ required: 'veterinarian is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Veterian"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
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
                                    setTimeInput(text);
                                    onChange(text);
                                }}
                                value={timeInput}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />

                <Button title="Add Appointment" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15
    },
    errorInput: {
        borderColor: 'red'
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    goBackButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        marginTop: 16,
        marginLeft: 16,
        paddingVertical: 8,
    },
    goBackText: {
        fontSize: 16,
        marginLeft: 8,
        color: "#000000",
    },
});

export default AddAppointmentScreen;