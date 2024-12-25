import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";

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
import { VetResponseType } from "../../queries/vet/types";

const AddPetScreen: React.FC = () => {
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
      console.log("Payload:", payload);

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
        console.log("Response:", response.data);

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
  const handleViewDetails = (vet_id: number) => {

  }
  const renderVetItem = ({ item }: { item: VetResponseType }) => (

    <TouchableOpacity
      style={[
        styles.card,
        idVetUser === item.idVetUser && styles.selectedCard,
      ]}
      onPress={() => setIdVetUser(item.idVetUser)}
    >
      <Image source={{ uri: item.img }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardName}>{item.fullName}</Text>
        <Text style={styles.cardSubtitle}>{item.nameOfConsultingRoom}</Text>
        <Text style={styles.cardTime}>📍 {item.clinicAddress}</Text>
      </View>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => handleViewDetails(item.idVetUser)}
      >
        <Text style={styles.detailButtonText}>Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>

  );

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={{ flexDirection: "row", marginTop: 24, }}>
        <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
          <Icon
            name="arrow-back-sharp"
            type={IconType.Ionicons}
            color="#000000"
            size={35}
          />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 70, }}>
          <Text style={styles.imageContainer}>Add New Pet</Text>
          <Image source={{ uri: 'https://i.pinimg.com/736x/c9/0b/0d/c90b0db71e33975ab69912ff1a0602e6.jpg' }} style={styles.petImage} />

        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#5EC088', marginBottom: 20 }} />

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
        value={age}
        keyboardType="numeric"
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Identification"
        value={identification}
        onChangeText={setIdentification}
      />

      <TextInput
        style={styles.input}
        placeholder="Upload you petie avata"
        value={img}
        onChangeText={setImg}
      />

      <Text style={styles.sectionTitle}>Select Vet</Text>
      <ScrollView style={{ height: 500 }}>
        <FlatList
          data={vetList}
          renderItem={renderVetItem}
          keyExtractor={(item) => item.idVetUser.toString()}
          contentContainerStyle={styles.flatListContainer}
        />

      </ScrollView>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Pet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPetScreen;
