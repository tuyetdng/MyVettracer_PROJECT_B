import React, { useMemo } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
// import Text from "../../shared/components/text-wrapper/TextWrappers";
import { useTheme } from "@react-navigation/native";
// import createStyles from "./HomeScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { OwnerUser } from "../../zustand/auth/types";

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  // const styles = useMemo(() => createStyles(theme), [theme]);
  const { data } = useGetUserInfo();
  if (!data) {
    return <Text>Loading or Error: No user info available</Text>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Image source={{ uri: data.img }} style={styles.avatar} />
    <Text style={styles.name}>{data.userName}</Text>
    <Text style={styles.detail}>Full Name: {data.fullName}</Text>
    <Text style={styles.detail}>Email: {data.email}</Text>
    <Text style={styles.detail}>Phone: {data.phoneNum}</Text>
    <Text style={styles.detail}>Date of Birth: {data.dob}</Text>
    <Text style={styles.detail}>Gender: {data.gender}</Text>
    <Text style={styles.detail}>Number of Pets: {data.numOfPet}</Text>

   
  </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  roleContainer: {
    marginTop: 10,
    alignSelf: "stretch",
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 5,
  },
  roleName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  permission: {
    fontSize: 14,
    marginLeft: 10,
    color: "#555",
  },
});
export default HomeScreen;
