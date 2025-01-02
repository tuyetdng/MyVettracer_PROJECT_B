import React, { useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_QUERIES } from '../../queries/keys';
import { SCREENS } from '../../shared/constants';
import * as NavigationService from 'react-navigation-helpers';
import Icon, { IconType } from 'react-native-dynamic-vector-icons';
import { useTheme } from '@react-navigation/native';

interface EditMedicineFormData {
  medName: string;
  amount: string;
  notice: string;
  dose: string;
  total: number;
  idUser: number;
  idPet: number;
}

interface EditMedicineScreenProps {
  route: {
    params: {
      medicine: {
        idMed: number;
        medName: string;
        amount: string;
        notice: string;
        dose: string;
        total: number;
        pet: { idPet: number };
        vetUser: { idVetUser: number };
      };
    };
  };
}

const EditMedicineScreen: React.FC<EditMedicineScreenProps> = ({ route }) => {
  const { medicine } = route.params;
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<EditMedicineFormData>({
    defaultValues: {
      medName: medicine.medName,
      amount: medicine.amount,
      notice: medicine.notice,
      dose: medicine.dose,
      total: medicine.total,
      idPet: medicine.pet.idPet,
      idUser: medicine.vetUser.idVetUser,
    },
  });

  const onSubmit = async (data: EditMedicineFormData) => {
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

      console.log('Payload:', payload);

      const response = await axios.put(
        `http://10.0.2.2:8080/myvettracer/medicine/${medicine.idMed}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 1000) {
        queryClient.invalidateQueries([API_QUERIES.MEDICINE]);
        Alert.alert('Success', 'Medicine updated successfully!', [
          { text: 'OK', onPress: () => NavigationService.push(SCREENS.MEDICINE) },
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update medicine.');
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
          <Icon
            name="arrow-back-sharp"
            type={IconType.Ionicons}
            color="#000000"
            size={35}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Medicine</Text>
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

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Medicine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginLeft: 50 },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
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
    saveButtonText: { color: '#fff', fontSize: 16 },
  });

export default EditMedicineScreen;
