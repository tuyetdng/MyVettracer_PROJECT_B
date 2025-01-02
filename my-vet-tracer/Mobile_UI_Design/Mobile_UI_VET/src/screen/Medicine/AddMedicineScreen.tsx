import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Image,
    FlatList,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as NavigationService from 'react-navigation-helpers';
import Icon, { IconType } from 'react-native-dynamic-vector-icons';
import { useTheme } from '@react-navigation/native';
import { API_QUERIES } from '../../queries/keys';
import { SCREENS } from '../../shared/constants';
import { useGetVetUserInfo } from '../../queries/vet/useGetUserInfo';
import { useGetPetsByVetID } from '../../queries/pet/useGetPetsByVetID';
import { PetResponseType } from '../../queries/pet/types';

interface AddMedicineFormData {
    medName: string;
    amount: string;
    notice: string;
    dose: string;
    total: number;
    idUser: number;
    idPet: number;
}

const AddMedicineScreen: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);
    const { data: vet } = useGetVetUserInfo();
    const { data: petList } = useGetPetsByVetID(Number(vet?.idVetUser));
    const [idPet, setIdPet] = useState<number>(1);
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<AddMedicineFormData>({
        defaultValues: {
            medName: '',
            amount: '',
            notice: '',
            dose: '',
            total: 0,
            idPet: 1,
            idUser: 1,
        },
    });

    const onSubmit = async (data: AddMedicineFormData) => {
        if (
            !data.medName ||
            !data.amount ||
            !data.notice ||
            !data.dose ||
            !data.total ||
            !data.idPet ||
            !data.idUser
        ) {
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
                amount: data.amount,
            };

            const response = await axios.post(
                'http://10.0.2.2:8080/myvettracer/medicine',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.code === 1000) {
                queryClient.invalidateQueries([API_QUERIES.MEDCINEBYVET]);
                Alert.alert('Success', 'Medicine added successfully!', [
                    { text: 'OK', onPress: () => NavigationService.goBack() },
                ]);
            } else {
                Alert.alert('Error', response.data.message || 'Failed to add medicine.');
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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 24 }}>
                <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
                    <Icon name="arrow-back-sharp" type={IconType.Ionicons} color="#000000" size={35} />
                </TouchableOpacity>
                <Text style={styles.title}>Add Medicine</Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#5EC088', marginBottom: 20 }} />

            <Controller
                name="medName"
                control={control}
                rules={{ required: 'Medicine name is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[styles.input, error ? styles.errorInput : null]}
                            placeholder="Medicine Name"
                            value={value}
                            onChangeText={onChange}
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />

            <Controller
                name="amount"
                control={control}
                rules={{ required: 'Amount is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[styles.input, error ? styles.errorInput : null]}
                            placeholder="Amount"
                            value={value}
                            onChangeText={onChange}
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />

            <Controller
                name="notice"
                control={control}
                rules={{ required: 'Notice is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[styles.input, error ? styles.errorInput : null]}
                            placeholder="Notice"
                            value={value}
                            onChangeText={onChange}
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />

            <Controller
                name="dose"
                control={control}
                rules={{ required: 'Dose is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[styles.input, error ? styles.errorInput : null]}
                            placeholder="Dose"
                            value={value}
                            onChangeText={onChange}
                        />
                        {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                )}
            />

            <Controller
                name="total"
                control={control}
                rules={{ required: 'Total is required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TextInput
                            style={[styles.input, error ? styles.errorInput : null]}
                            placeholder="Total"
                            value={value.toString()}
                            onChangeText={onChange}
                            keyboardType="numeric"
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
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Medicine</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginLeft: 50
        },
        input: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 8,
            padding: 10,
            marginBottom: 15,
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
        errorInput: { borderColor: 'red' },
        errorText: { color: 'red', marginBottom: 10 },
        goBackButton: { marginRight: 10 },
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
        saveButtonText: { color: '#fff', fontSize: 16 },
    });

export default AddMedicineScreen;
