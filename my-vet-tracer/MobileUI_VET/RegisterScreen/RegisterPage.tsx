import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import createStyles from "./RegisterPage.style";

const RegisterPage: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleRegister = () => {
    if (!username || !email || !password || !phoneNumber) {
      Alert.alert(
        "Error",
        "Username, Email,  Password and Phone Number  are required!",
      );
      return;
    }

    const newUser = {
      username,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      address,
      email,
      password,
      imageUri,
    };
    console.log(newUser);
    Alert.alert("Success", "Registration details submitted!");
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        Alert.alert("Image picker canceled");
      } else if (response.errorMessage) {
        Alert.alert("Error picking image:", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImageUri(uri);
        } else {
          Alert.alert("Error", "No URI found for the selected image");
        }
      }
    });
  };

  return (
    <ScrollView>
      <View style={{ ...styles.titlecontainer }}>
        <Text style={styles.title}> Welcome to Groseri Register</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender (e.g., MALE/FEMALE)"
          value={gender}
          onChangeText={setGender}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
          <Text style={{ paddingHorizontal: 15, fontSize: 16, color: "black" }}>
            Avatar:{" "}
          </Text>
        </View>

        <View style={{ ...styles.avatarContainer }}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={{ ...styles.avatar }} />
          )}
          <TouchableOpacity
            onPress={pickImage}
            style={{ ...styles.buttonAvatar }}
          >
            <Text style={{ ...styles.buttonText }}>Upload Avatar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterPage;
