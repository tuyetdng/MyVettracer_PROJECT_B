import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  
} from "react-native";
import { Picker } from '@react-native-picker/picker';

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import createStyles from "./PetAddScreen.style";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetListVet } from "../../queries/vet/useGetListVet";
import { useQueryClient } from "react-query";
import { API_QUERIES } from "../../queries/keys";
import * as NavigationService from "react-navigation-helpers";

const AddPetScreen: React.FC= () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: owner } = useGetUserInfo();
  const { data: vetList } = useGetListVet();

  const [img, setImg] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [identification, setIdentification] = useState("");
  const [idVetUser, setIdVetUser] = useState<number | undefined>(undefined);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Unable to authenticate. Please log in again.");
      return;
    }

    const payload = {
      img,
      petName,
      petType,
      sex,
      age: parseInt(age, 10),
      weight,
      height,
      identification,
      idOwnerUser: owner?.idOwnerUser,
      idVetUser,
    };

    try {
      const response = await axios.post(
        `http://10.0.2.2:8080/myvettracer/pet`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 1000) {
        queryClient.invalidateQueries([API_QUERIES.PET]);
        Alert.alert("Success", "Pet added successfully!", [
          { text: "OK", onPress: () => NavigationService.goBack() },
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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
        <Icon
          name="arrow-back-sharp"
          type={IconType.Ionicons}
          color="#000000"
          size={35}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} style={styles.petImage} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Pet Name"
        value={petName}
        onChangeText={setPetName}
      />

      <TextInput
        style={styles.input}
        placeholder="Pet Type"
        value={petType}
        onChangeText={setPetType}
      />

      <TextInput
        style={styles.input}
        placeholder="Sex"
        value={sex}
        onChangeText={setSex}
      />

      <TextInput
        style={styles.input}
        placeholder="Age (Months)"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Identification"
        value={identification}
        onChangeText={setIdentification}
      />

      {/* Vet selection */}
      <Text style={styles.label}>Select Vet</Text>
      <Picker
        selectedValue={idVetUser}
        onValueChange={(itemValue) => setIdVetUser(itemValue)}
        style={styles.picker}
      >
        {vetList?.map((vet: any) => (
          <Picker.Item key={vet.idVetUser} label={vet.name} value={vet.idVetUser} />
        ))}
      </Picker>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPetScreen;
