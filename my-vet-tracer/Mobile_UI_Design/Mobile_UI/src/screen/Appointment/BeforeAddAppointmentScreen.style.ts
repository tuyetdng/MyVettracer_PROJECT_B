import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  loadingGif: ImageStyle;
  header: TextStyle;
  listContainer: ViewStyle;
  row: ViewStyle;
  card: ViewStyle;
  petImage: ImageStyle;
  profileImage: ImageStyle;
  petName: TextStyle;
  addIcon: TextStyle;
  cardAdd: ViewStyle;
  back: ImageStyle;
  containerContent: ViewStyle;
}

export default (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
    },
    loadingGif: {
      width: 100,
      height: 100,
      alignSelf: "center",
      marginTop: 20,
    },
    header: {
      fontSize: 28,
      color: colors.text,
      marginRight: 130,
    },
    profileImage: {
      width: 57,
      height: 57,
      borderRadius: 25,

    },
    listContainer: {
      paddingBottom: 20,
      marginLeft: 12,
      marginTop: 20,


    },
    row: {
      justifyContent: "space-between",
      marginBottom: 20,
    },
    card: {
      width: "45%",
      height: 150,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#CBEDEE',
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.20,
      shadowRadius: 5.62,
      elevation: 7
    },
    cardAdd: {
      width: ScreenWidth * 0.9,
      height: 60,
      borderRadius: 20,
      right: 0,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
      backgroundColor: '#5EC088',
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    back: {
      width: 400,
      height: 100,
      justifyContent: "center",
      alignContent: "center",
      marginRight: 10,
      marginTop: 16,
    },
    petImage: {
      width: 70,
      height: 70,
      borderRadius: 30,
      marginBottom: 10,
    },
    petName: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    addIcon: {
      fontWeight: "bold",
      color: "#ffffff",
      fontSize: 25,
    },
    containerContent: {
      marginLeft: 20,

      width: "92%",
      height: "50%",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.23,
      shadowRadius: 11.27,
      elevation: 14
    }
  });
};
