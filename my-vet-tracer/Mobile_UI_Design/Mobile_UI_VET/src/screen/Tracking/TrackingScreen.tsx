import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import createStyles from "./TrackingScreen.style";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";

interface DataItem {
  id: string;
  title: string;
  image: string;
}

const TrackingScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const data = [
    { id: "1", title: "APPOINMENT", image: "https://i.pinimg.com/736x/98/b4/a9/98b4a9a016bb1955a00b681757787461.jpg" },
    { id: "2", title: "VACCINE", image: "https://i.pinimg.com/736x/eb/91/81/eb91810b172ec230aa696b5e6df5b94f.jpg" },
    { id: "3", title: "MEDICINE", image: "https://i.pinimg.com/736x/f5/f1/ec/f5f1ec7d42beef0b1f59d3a160e54261.jpg" },
  ];

  const handleAppointment = () => {
    NavigationService.push(SCREENS.APPOINMENT);
  };

  const handleVaccine = () => {
    NavigationService.push(SCREENS.VACCINE);
  };

  const handleMedicine = () => {
    NavigationService.push(SCREENS.MEDICINE);
  };

  const renderItem = ({ item }: { item: DataItem }) => {
    const handlePress = () => {
      if (item.title === "APPOINMENT") {
        handleAppointment();
      } else if (item.title === "VACCINE") {
        handleVaccine();
      } else if (item.title === "MEDICINE") {
        handleMedicine();
      }
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>TRACKING</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#5EC088", marginBottom: 30 }} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default TrackingScreen;
