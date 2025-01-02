import React, { useMemo } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useTheme } from "@react-navigation/native";
import createStyles from "./BeforeAddAppointmentScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetListPets } from "../../queries/pet/useGetPets";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { PetResponseType } from "../../queries/pet/types";

const BeforeAddAppointmentScreen: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const { data: owner, isFetching: isOwnerLoading } = useGetUserInfo();
    const { data: pets, isFetching: isFetchingPets } = useGetListPets(owner?.idOwnerUser || 0);

    if (!owner) {
        return <Text>Loading or Error: No user info available</Text>;
    }

    const handleItemPress = (id: number) => {
        NavigationService.push(SCREENS.ADDAPPOINMENT, { idPet: id });
    };

    const renderItem = ({ item }: { item: PetResponseType }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item?.idPet)}>
            <Image source={{ uri: item?.img }} style={styles.petImage} />
            <Text style={styles.petName}>{item?.petName} || 🐾 </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.pinimg.com/736x/37/db/f2/37dbf21d505e0af7ac65cae722fc2a16.jpg' }} style={styles.back} />
            <Text style={[styles.header, { marginBottom: 30, fontWeight: "bold", marginLeft: 10, }]}>Choose A Pet</Text>
            <View style={styles.containerContent}>


                <FlatList
                    data={pets}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.idPet.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContainer}
                />
            </View>


        </View>
    );
};

export default BeforeAddAppointmentScreen;
