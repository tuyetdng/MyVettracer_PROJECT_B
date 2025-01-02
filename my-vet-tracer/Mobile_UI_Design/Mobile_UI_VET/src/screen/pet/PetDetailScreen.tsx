import React, { useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useTheme } from "@react-navigation/native";
import createStyles from "./PetDetailScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetListPets } from "../../queries/pet/useGetPets";
import { useGetAppointmentByPet, useGetAppointmentsByPets } from "../../queries/appoinment/useGetAppointmentByPet";
import { useGetMedicinesByPets } from "../../queries/medicine/useGetMedicineByPet";
import { useGetVaccinesByPets } from "../../queries/vaccine/useGetVaccineByPet";
import { PetResponseType } from "../../queries/pet/types";
import { useGetPetById } from "../../queries/pet/useGetPetById";
import * as NavigationService from "react-navigation-helpers";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SCREENS } from "../../shared/constants";
import { useNavigation } from "@react-navigation/native";
import { useGetVetUserInfo } from "../../queries/vet/useGetUserInfo";
import { useGetOwnerOfPetByPetId } from "../../queries/pet/useGetOwnerOfPetByPetId";

interface PetDetailScreenProps {
  route: any;
  data: PetResponseType;
}
const PetDetailScreen: React.FC<PetDetailScreenProps> = ({ route }) => {

  const { idPet } = route.params;
  const { data, isFetching: isFetchingPets } = useGetPetById(idPet);
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: owner } = useGetOwnerOfPetByPetId(idPet);
  if (!owner) {
    return <Text>Loading or Error: No user info available</Text>;
  }

  if (isFetchingPets) {
    return <Text>Loading...</Text>;
  }
  const handleItemPress = (idOwnerUser: number) => {
    console.log("Owner Id:", idOwnerUser);

    NavigationService.push(SCREENS.VIEWOWNERPROFILE, { idOwnerUser: idOwnerUser });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => NavigationService.goBack()} style={styles.goBackButton}>
        <Icon
          name="arrow-back-sharp"
          type={IconType.Ionicons}
          color='#000000'
          size={35}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data?.img }}
          style={styles.petImage}
        />
      </View>


      <Text style={styles.petName}>{data?.petName}</Text>
      <Text style={styles.petDetails}>{data?.petType} | 🐾</Text>
      <Text style={styles.petLocation}>⚧ {data?.sex}</Text>


      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoValue}>{data?.age} Months</Text>
          <Text style={styles.infoLabel}>Age</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoValue}>{data?.weight}</Text>
          <Text style={styles.infoLabel}>Weight</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoValue}>{data?.height}</Text>
          <Text style={styles.infoLabel}>Height</Text>
        </View>
      </View>



      <Text style={styles.aboutTitle}>About {data?.petName}</Text>
      <Text style={styles.aboutText}>
        {data?.identification}
      </Text>


      <View style={styles.ownerContainer}>
        <Image
          source={{ uri: owner?.img }}
          style={styles.ownerImage}
        />
        <View>
          <Text style={styles.ownerName}>{owner?.fullName}</Text>
          <TouchableOpacity onPress={() => handleItemPress(owner?.idOwnerUser)}>
            <Text style={styles.viewProfile}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};



export default PetDetailScreen;
