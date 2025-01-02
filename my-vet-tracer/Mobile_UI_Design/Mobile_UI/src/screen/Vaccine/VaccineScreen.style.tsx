import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  profileContainer: ViewStyle;
  profileImage: ImageStyle;
  greeting: TextStyle;
  name: TextStyle;
  subtitle: TextStyle;
  headerImage: ImageStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  card: ViewStyle;
  cardImage: ImageStyle;
  cardDetails: ViewStyle;
  cardName: TextStyle;
  cardSubtitle: TextStyle;
  cardTime: TextStyle;
  cardActions: ViewStyle;
  rejectButton: ViewStyle;
  acceptButton: ViewStyle;
  buttonText: TextStyle;
  bottomNav: ViewStyle;
  statusLabelText: TextStyle;
  statusLabel: ImageStyle;
  goBackButton: ViewStyle;
  goBackText: TextStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: "#f6f6f6",
    },
    header: {
      flex: 0.4,
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    goBackButton: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      paddingVertical: 8,
    },
    goBackText: {
      fontSize: 16,
      marginLeft: 8,
      color: "#000000",
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 10,
    },
    greeting: {
      color: "#fff",
      fontSize: 16,
      width: '100%', 
    },
    name: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      width: '100%', 
    },
    subtitle: {
      color: "#fff",
      fontSize: 14,
    },
    headerImage: {
      width: "100%",
      height: 120,
      resizeMode: "contain",
      alignSelf: "center",
    },
    section: {
      marginHorizontal: 20,
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 10,
    },
    card: {
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      marginBottom: 10,
    },
    cardImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    cardDetails: {
      flex: 1,
      marginLeft: 15,
    },
    cardName: {
      fontSize: 20,
      fontWeight: "bold",
    },
    cardSubtitle: {
      fontSize: 14,
      color: "#999",
    },
    cardTime: {
      fontSize: 14,
      color: "#555",
      fontWeight: "bold",

    },
    cardActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    statusLabel: {
      height: 50,
      width: 50,
      marginTop: 20,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    statusLabelText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    rejectButton: {
      backgroundColor: "#f44336",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginRight: 10,
    },
    acceptButton: {
      backgroundColor: "#4caf50",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 14,
    },
    bottomNav: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderTopColor: "#ddd",
    },
  });
};
