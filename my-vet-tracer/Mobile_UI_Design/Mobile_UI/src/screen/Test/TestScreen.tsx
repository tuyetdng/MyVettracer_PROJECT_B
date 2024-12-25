import React, { useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./TestScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";

const TestScreen: React.FC = () => {
  const { data: ownerUser } = useGetUserInfo();
  const handleSubmit = () => {

  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Pet Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Image URL"

      />
      <TextInput
        style={styles.input}
        placeholder="Pet Type (e.g., Dog, Cat)"

      />
      <TextInput
        style={styles.input}
        placeholder="Pet Name"

      />
      <TextInput
        style={styles.input}
        placeholder="Age (in years)"

        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Sex (e.g., Male, Female)"

      />
      <TextInput
        style={styles.input}
        placeholder="Weight (e.g., 10kg)"

      />
      <TextInput
        style={styles.input}
        placeholder="Height (e.g., 50cm)"

      />
      <TextInput
        style={styles.input}
        placeholder="Identification (e.g., Microchip ID)"

      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
