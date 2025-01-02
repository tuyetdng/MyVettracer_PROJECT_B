import React, { useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./TestScreen.style";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useGetIsConfirmAppointmentByVet } from "../../queries/appoinment/useGetIsConfirmAppointmentByVet";
import { AppointmentResponseType } from "../../queries/appoinment/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_QUERIES } from "../../queries/keys";
import { useConfirmAppointment } from "../../queries/appoinment/useConfirmAppointment";
import { useGetNotConfirmAppointmentByVet } from "../../queries/appoinment/useGetNotConfirmAppointmentByVet";

const TestScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: "bold", alignItems: "center", justifyContent:"center" , marginTop: 100}}>COMMING SOON</Text>
    </ScrollView>
  );
};

export default TestScreen;


