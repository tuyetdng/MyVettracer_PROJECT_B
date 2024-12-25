import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./ProfileScreen.style";
import LinearGradient from "react-native-linear-gradient";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { SCREENS } from "../../shared/constants";
import { useGetListPets } from "../../queries/pet/useGetPets";


const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { data: userinfo, onGetUserInfo } = useGetUserInfo();
  const { data: pets, isFetching: isFetchingPets } = useGetListPets(userinfo?.idOwnerUser || 0);
  const petsCount = pets?.length || 0;

  const handleItemPress = (id: number) => {
    NavigationService.push(SCREENS.EDITPROFILE, { idOwnerUser: id });

  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={["#d1fdff", "#fddb92"]}
          // colors={["#84fab0", "#84fab0", "#8fd3f4"]}

          style={styles.header}
        >
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => NavigationService.goBack()}
          >
            <Icon
              name="arrow-back-sharp"
              type={IconType.Ionicons}
              size={35}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{userinfo?.fullName || "Anonymous"}</Text>
          <Text style={styles.role}>{userinfo?.userName || "User"}</Text>
          <Text style={styles.location}>
            <Icon name="paw" type={IconType.FontAwesome} size={18} />{" "}
            {petsCount || "Opps, you dont have any pet now"}
          </Text>

          <Image
            style={styles.profileImage}
            source={{
              uri: userinfo?.img || "https://via.placeholder.com/150",
            }}
          />
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.iconButton}>
                <Icon name="phone" type={IconType.FontAwesome} size={20} color="#FF7E5F" />
                <Text style={{ fontSize: 18 }}> {"\t"} {userinfo?.phoneNum || "No phone available"}</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>


        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoItem}>
            <Icon name="envelope" type={IconType.FontAwesome} size={18} /> {userinfo?.email || "N/A"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="birthday-cake" type={IconType.FontAwesome} size={18} />{" " + userinfo?.dob || "Unknown"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="transgender" type={IconType.FontAwesome} size={18} /> {userinfo?.gender || "Not specified"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Consultation</Text>
          <FlatList data={pets}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <Image source={{ uri: item.img }} style={styles.cardImage} />
                  <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{item.petName}</Text>
                    <Text style={styles.cardSubtitle}>{item.petType}</Text>
                    <Text style={styles.cardTime}>{item.height} || {item.weight}</Text>

                  </View>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (userinfo?.idOwnerUser) {
              handleItemPress(userinfo.idOwnerUser);
            } else {
              console.warn("User ID is undefined");
            }
          }}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
