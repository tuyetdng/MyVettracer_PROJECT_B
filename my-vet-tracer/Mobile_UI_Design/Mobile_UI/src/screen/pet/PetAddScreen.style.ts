import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  goBackButton: ViewStyle;
  imageContainer: TextStyle;
  petImage: ImageStyle;
  input: TextStyle;
  label: TextStyle;
  picker: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
  detailButton: ViewStyle;
  detailButtonText: TextStyle;

  // Styles for FlatList and Vet Items
  sectionTitle: TextStyle;
  flatListContainer: ViewStyle;
  card: ViewStyle;
  selectedCard: ViewStyle;
  cardImage: ImageStyle;
  cardDetails: ViewStyle;
  cardName: TextStyle;
  cardSubtitle: TextStyle;
  cardTime: TextStyle;
}


const createStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    goBackButton: {
      marginBottom: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    imageContainer: {
      fontSize: 25,
      fontWeight: "bold",
    },
    petImage: {
      width: 70,
      height: 70,
      borderRadius: 30,
      marginBottom: 10,
    },
    input: {
      height: 50,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: colors.text,
      backgroundColor: '#ffffff',
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.17,
      shadowRadius: 2.54,
      elevation: 3
    },
    label: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 10,
      fontWeight: "600",
    },
    picker: {
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: colors.card,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    saveButtonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: "bold",
    },

    // FlatList and Vet Item Styles
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    flatListContainer: {
      marginBottom: 20,
      // height: ScreenHeight *0.5,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
    selectedCard: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    cardImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    cardDetails: {
      flex: 1,
    },
    cardName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    cardSubtitle: {
      fontSize: 14,
      color: "#888",
    },
    cardTime: {
      fontSize: 12,
      color: "#888",
      marginTop: 5,
    },
    detailButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    detailButtonText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#fff",
    },
  });
};

export default createStyles;

