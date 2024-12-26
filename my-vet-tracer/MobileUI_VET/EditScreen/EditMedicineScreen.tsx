import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface EditMedicineFormData {
    medName: string;
    amount: string;
    notice: string;
    dose: string;
    total: number;
    idUser: number;
    idPet: number;
}

const EditMedicineScreen: React.FC = ({ navigation }: any) => {
    const { control, handleSubmit, reset } = useForm<EditMedicineFormData>({
        defaultValues: {
            medName: '',
            amount: '',
            notice: '',
            dose: '',
            total: 0,
            idPet: 0,
            idUser: 0

        },
    });

    const onSubmit = (data: EditMedicineFormData) => {
        if (!data.medName || !data.amount || !data.notice || !data.dose || !data.total || !data.idPet || !data.idUser) {
            Alert.alert('Error', 'Please fill all required fields!');
            return;
        }

        reset();
    };

    return (
        <ScrollView>
            {/* Calendar Component */}

            <View style={styles.container}>
                <Text style={styles.title}>Add New Appointment</Text>


                {/* Name Field */}
                <Controller
                    name="medName"
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
                    name="amount"
                    control={control}
                    rules={{ required: 'Amount is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="amount"
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
                    name="notice"
                    control={control}
                    rules={{ required: 'Notice is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Notice"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />



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
                    rules={{ required: 'Total is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="Dose"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={Number(value).toString()}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />
                <Controller
                    name="idPet"
                    control={control}
                    rules={{ required: 'Pet ID is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="idPet"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={"" + Number(value)}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />
                <Controller
                    name="idUser"
                    control={control}
                    rules={{ required: 'User ID is required' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                style={[styles.input, error ? styles.errorInput : null]}
                                placeholder="idUser"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={"" + Number(value)}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />

                {/* Submit Button */}
                <Button title="Add Medicine" onPress={handleSubmit(onSubmit)} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, alignItems: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    errorInput: { borderColor: 'red' },
    errorText: { color: 'red', marginBottom: 10 },
});

export default EditMedicineScreen;
