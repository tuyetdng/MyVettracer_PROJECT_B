import React, { useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme } from "@react-navigation/native";
import createStyles from "./HomeScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetListPets } from "../../queries/pet/useGetPets";
import { useGetAppointmentByPet, useGetAppointmentsByPets } from "../../queries/appoinment/useGetAppointmentByPet";
import { useGetMedicinesByPets } from "../../queries/medicine/useGetMedicineByPet";
import { useGetVaccinesByPets } from "../../queries/vaccine/useGetVaccineByPet";
import { PetResponseType } from "../../queries/pet/types";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

interface PetScreenProps {
  route: any;
  pets: PetResponseType;
}
const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: owner } = useGetUserInfo();
  if (!owner) {
    return <Text>Loading or Error: No user info available</Text>;
  }

  const { data: pets, isFetching: isFetchingPets } = useGetListPets(owner.idOwnerUser);

  if (isFetchingPets) {
    return <Text>Loading...</Text>;
  }
  const handleItemPress = (id: number) => {
    NavigationService.push(SCREENS.PETDETAIL, { idPet: id });
  };
  const handleAddPress = () => {
    NavigationService.push(SCREENS.ADDPET);
  };
  const renderItem = ({ item }: { item: PetResponseType }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item?.idPet)}>
      <Image source={{ uri: item?.img }} style={styles.petImage}/>
      <Text style={styles.petName}>{item?.petName} || 🐾 </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Pets</Text>
      <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item.idPet.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      /> 
      <TouchableOpacity style={styles.cardAdd} onPress={() => handleAddPress()}>
        <Text style={styles.addIcon}>Add New Pet</Text>
        
      </TouchableOpacity>
    </View>
  );
};



export default HomeScreen;
