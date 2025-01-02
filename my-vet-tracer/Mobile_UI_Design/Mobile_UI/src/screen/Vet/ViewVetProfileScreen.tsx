import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";

import styles from "./ViewVetProfileScreen.style";
import { SCREENS } from "../../shared/constants";
import { useGetVetById } from "../../queries/vet/useGetVetById";

interface ViewVetProfileProp {
  route: any;
}

const ViewVetProfileScreen: React.FC<ViewVetProfileProp> = ({ route }) => {
  const { vet_id } = route.params;
  const { data: vet } = useGetVetById(vet_id);


  return (
    <ScrollView>
      <View style={styles.container}>
        <LinearGradient
          colors={["#FF7E5F", "#FEB47B", "#cc66ff"]}
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
          <Text style={styles.name}>{vet?.fullName || "Anonymous"}</Text>
          <Text style={styles.role}>{vet?.userName || "User"}</Text>
          <Text style={styles.location}>
            <Icon name="map-marker" type={IconType.FontAwesome} size={14} />{" "}
            {vet?.clinicAddress || "Unknown Location"}
          </Text>

          <Image
            style={styles.profileImage}
            source={{
              uri: vet?.img || "https://via.placeholder.com/150",
            }}
          />
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.iconButton}>
                <Icon
                  name="phone"
                  type={IconType.FontAwesome}
                  size={20}
                  color="#FF7E5F"
                />
                <Text> {"\t"} {vet?.phoneNum || "No phone available"}</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Me</Text>
          <Text style={styles.aboutDescription}>
            {vet?.qualification || "No qualifications provided."}
          </Text>
          <Text style={styles.aboutDescription}>
            {vet?.experience
              ? `${vet?.experience} years of experience`
              : "Experience not specified."}
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoItem}>
            <Icon
              name="envelope"
              type={IconType.FontAwesome}
              size={14}
            />{" "}
            {vet?.email || "N/A"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon
              name="birthday-cake"
              type={IconType.FontAwesome}
              size={14}
            />{" "}
            {vet?.dob || "Unknown"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon
              name="transgender"
              type={IconType.FontAwesome}
              size={14}
            />{" "}
            {vet?.gender || "Not specified"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon
              name="stethoscope"
              type={IconType.FontAwesome}
              size={14}
            />{" "}
            {vet?.nameOfConsultingRoom || "No consulting room provided"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon
              name="shield"
              type={IconType.FontAwesome}
              size={14}
            />{" "}
            {vet?.authentication === 1
              ? "Verified"
              : "Not verified"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewVetProfileScreen;
