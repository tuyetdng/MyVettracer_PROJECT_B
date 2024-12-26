import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import CalenderScreen from './CalenderScreen';

interface AppointmentFormData {
    ownerName: string;
    veterinarian: string;
    time: string;
    idUser: number;
    idPet: number;
}

const EditAppointmentScreen: React.FC = ({ navigation }: any) => {
    const [selectedDate, setSelectedDate] = useState<string>(''); // State for selected date
    const [timeInput, setTimeInput] = useState<string>(''); // State for time input
    const { control, handleSubmit, reset } = useForm<AppointmentFormData>({
        defaultValues: {
            ownerName: '',
            veterinarian: '',
            time: '',
            idPet: 0,
            idUser: 0

        },
    });

    const onSubmit = (data: AppointmentFormData) => {
        if (!data.ownerName || !data.veterinarian || !data.time) {
            Alert.alert('Error', 'Please fill all required fields!');
            return;
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
                <Text style={styles.title}>Edit New Appointment</Text>


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
                                    setTimeInput(text); // Update local time input state
                                    onChange(text); // Update form state
                                }}
                                value={timeInput} // Bind local state to input field
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
                <Button title="Edit Appointment" onPress={handleSubmit(onSubmit)} />
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

export default EditAppointmentScreen;
