import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { useQueryClient } from "react-query";
import { API_QUERIES } from "../../queries/keys";

const EditProfileScreen: React.FC = () => {
  const { data: userinfo } = useGetUserInfo();

  // State for user fields
  const [fullName, setFullName] = useState(userinfo?.fullName || "");
  const [email, setEmail] = useState(userinfo?.email || "");
  const [phoneNum, setPhoneNum] = useState(userinfo?.phoneNum || "");
  const [dob, setDob] = useState(userinfo?.dob || "");
  const [gender, setGender] = useState(userinfo?.gender || "");
  const queryClient = useQueryClient();

  const handleSave = async () => {
    console.log("idUser: " + userinfo?.idOwnerUser);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Unable to authenticate. Please log in again.");
        return;
      }

      const payload = {
        img: userinfo?.img,
        fullName,
        email,
        phoneNum,
        dob,
        gender,
        numOfPet: userinfo?.numOfPet,
        roles: userinfo?.roles?.map(role => role.name) || [],
      };

      const response = await axios.put(
        `http://10.0.2.2:8080/myvettracer/owneruser/${userinfo?.idOwnerUser}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 1000) {
        queryClient.invalidateQueries([API_QUERIES.USER]);

        Alert.alert("Success", "Profile updated successfully!");
        NavigationService.goBack();
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      Alert.alert("Error", "Failed to update profile. Please try again later.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => NavigationService.goBack()}
      >
        <Icon name="arrow-back" type={IconType.Ionicons} size={30} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={[styles.label, { fontSize: 24 }]}>Edit Profile</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNum}
          onChangeText={setPhoneNum}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Enter your gender"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  goBack: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  statsRow: {
    flexDirection: "row",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginLeft: 130,
    marginTop: 16,

  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editImageText: {
    color: "black",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  textArea: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    backgroundColor: "#FFF",
    height: 100,
  },
  saveButton: {
    backgroundColor: "#FF6F61",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
