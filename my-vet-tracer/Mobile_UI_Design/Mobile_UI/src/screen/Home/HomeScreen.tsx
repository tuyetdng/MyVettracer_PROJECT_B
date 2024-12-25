import React, { useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from "@react-navigation/native";
import createStyles from "./HomeScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetListPets } from "../../queries/pet/useGetPets";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { PetResponseType } from "../../queries/pet/types";

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: owner, isFetching: isOwnerLoading } = useGetUserInfo();
  const { data: pets, isFetching: isFetchingPets } = useGetListPets(owner?.idOwnerUser || 0);

  if (isOwnerLoading || isFetchingPets) {
    return <Text>Loading...</Text>;
  }

  if (!owner) {
    return <Text>Loading or Error: No user info available</Text>;
  }

  const handleItemPress = (id: number) => {
    NavigationService.push(SCREENS.PETDETAIL, { idPet: id });
  };

  const handleAddPress = () => {
    NavigationService.push(SCREENS.ADDPET);
  };

  const renderItem = ({ item }: { item: PetResponseType }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item?.idPet)}>
      <Image source={{ uri: item?.img }} style={styles.petImage} />
      <Text style={styles.petName}>{item?.petName} || 🐾 </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
        <Image source={{ uri: owner?.img }} style={styles.profileImage} />
        <Text style={[styles.header, { marginLeft: 10 }]}>Hello {owner?.fullName}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#5EC088', marginBottom: 10 }} />
      <Text style={[styles.header, { marginBottom: 30,fontWeight: "bold", }]}> My List Pets  ฅ^._.^ฅ</Text>

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
