import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import * as NavigationService from "react-navigation-helpers";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { useRoute } from '@react-navigation/native';
import { Gender, User } from "zustand/auth/types";
import { useGetUserInfo } from "queries/auth/useGetUserInfo";
import { launchImageLibrary } from "react-native-image-picker";


interface EditProfileProps {
    route: any;
    data: User;
    ratings: number;
}
const EditProfile: React.FC<EditProfileProps> = ({ route }) => {
    const pickImage = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.didCancel) {
                Alert.alert("Image picker canceled");
            } else if (response.errorMessage) {
                Alert.alert("Error picking image:", response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const uri = response.assets[0].uri;
                if (uri) {
                    Alert.alert("SuccessFull");
                    formData.avatar = uri;
                } else {
                    Alert.alert("Error", "No URI found for the selected image");
                }
            }
        });
    };
    // State for each field
    const { data: userinfo, isFetching, isError, onGetUserInfo } = useGetUserInfo();
    const { userID } = route.params; // Access the userID parameter
    if (isFetching) {
        return <Text>Loading...</Text>;
    }

    if (isError || !userinfo) {
        return <Text>Failed to load user information.</Text>;
    }

    const [formData, setFormData] = useState({
        firstName: userinfo?.firstName || "",
        lastName: userinfo?.lastName || "",
        phoneNumber: userinfo?.phoneNumber || "",
        role: userinfo?.roles || "",
        gender: userinfo?.gender || "",
        email: userinfo?.email || "",
        dateOfBirth: userinfo?.dateOfBirth || "",
        avatar: userinfo?.avatar || "",
    });


    // Handle the save button
    const handleSave = () => {
        console.log(formData);
        Alert.alert("Success", "Profile updated successfully!");
    };

      return (
        <ScrollView style={styles.container}>
            {/* Profile Image */}
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

                <Image
                    style={styles.profileImage}
                    source={{
                        uri: formData.avatar,
                    }}
                />
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.editImageText}>Edit Image</Text>
                </TouchableOpacity>
            </LinearGradient>

            {/* Editable Fields */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => setFormData({ ...formData, firstName: value })}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => setFormData({ ...formData, lastName: value })}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(value) => setFormData({ ...formData, phoneNumber: value })}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.textArea}
                value={formData.role}
                onChangeText={(value) => setFormData({ ...formData, role: value })}
            />

            <Text style={styles.label}>Gender</Text>
            <TextInput
                style={styles.input}
                value={formData.gender}
                onChangeText={(value) => setFormData({ ...formData, gender: value })}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => setFormData({ ...formData, email: value })}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
                style={styles.input}
                value={formData.dateOfBirth.toString()}
                onChangeText={(value) =>
                    setFormData({ ...formData, dateOfBirth: new Date(value) })
                }
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditProfile;

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
