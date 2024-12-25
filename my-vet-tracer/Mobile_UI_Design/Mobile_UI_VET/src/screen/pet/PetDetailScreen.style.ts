import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  imageContainer: ViewStyle;
  petImage: ImageStyle;
  petName: TextStyle;
  petDetails: TextStyle;
  petLocation: TextStyle;
  infoContainer: ViewStyle;
  infoCard: ViewStyle;
  infoValue: TextStyle;
  infoLabel: TextStyle;
  aboutTitle: TextStyle;
  aboutText: TextStyle;
  ownerContainer: ViewStyle;
  ownerImage: ImageStyle;
  ownerName: TextStyle;
  viewProfile: TextStyle;
  adoptButton: ViewStyle;
  adoptButtonText: TextStyle;
  goBackText:TextStyle;
  goBackButton: ViewStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    imageContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    petImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 5,
      borderColor: "#EDEDED",
    },
    petName: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
      textAlign: "center",
      marginTop: 10,
    },
    petDetails: {
      fontSize: 16,
      color: colors.text,
      textAlign: "center",
      marginVertical: 5,
    },
    petLocation: {
      fontSize: 14,
      color: colors.text,
      textAlign: "center",
      marginBottom: 20,
    },
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginBottom: 20,
    },
    infoCard: {
      alignItems: "center",
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.primary,
    },
    infoLabel: {
      fontSize: 14,
      color: colors.text,
    },
    aboutTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 10,
    },
    aboutText: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 20,
    },
    ownerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
    },
    ownerImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    ownerName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    viewProfile: {
      fontSize: 14,
      color: colors.primary,
    },
    adoptButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 30,
      alignItems: "center",
    },
    adoptButtonText: {
      color: colors.card,
      fontSize: 18,
      fontWeight: "bold",
    },
    goBackButton: {
      marginTop: 20,
    },
    goBackText: {
      fontSize: 16,
      color: "#007BFF",
    },
  });
};
