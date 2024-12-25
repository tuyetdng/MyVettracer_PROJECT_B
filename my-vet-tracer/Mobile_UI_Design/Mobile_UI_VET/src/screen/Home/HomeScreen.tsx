import React, { useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from "@react-navigation/native";
import createStyles from "./HomeScreen.style";
import { useGetListPets } from "../../queries/pet/useGetPets";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { PetResponseType } from "../../queries/pet/types";
import { useGetVetUserInfo } from "../../queries/vet/useGetUserInfo";

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: vet, isFetching: isVetLoading } = useGetVetUserInfo();

  if (isVetLoading) {
    return <Image
      source={{ uri: "https://i.pinimg.com/originals/13/fa/be/13fabe368d08211706da14d461727b50.gif" }}
      style={styles.loadingGif}
    />
  }

  if (!vet) {
    return <Text>Loading or Error: No user info available</Text>;
  }


  return (
    <View style={styles.container}>
      <Text>{vet?.userName}</Text>
      <Text>{vet?.fullName}</Text>
      <Text>{vet?.email}</Text>
      <Text>{vet?.phoneNum}</Text>
      <Text>{vet?.phoneNum}</Text>
      <Text>{vet?.clinicAddress}</Text>
      <Text>{vet?.qualification}</Text>
      <Text>{vet?.fullName}</Text>

    </View>
  );
};

export default HomeScreen;
