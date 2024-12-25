import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "@react-navigation/native";

interface Style {
    container: ViewStyle;
    headerContainer: ViewStyle;
    headerText: TextStyle;
    profileImage: ImageStyle;
    listContainer: ViewStyle;
    itemContainer: ViewStyle;
    itemImage: ImageStyle;
    itemText: TextStyle;
}

export default (theme: Theme) => {
    const { colors } = theme;

    return StyleSheet.create<Style>({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 16,
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 16,
        },
        headerText: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#5EC088',
        },
        profileImage: {
            width: 150,
            height: 150,
            borderRadius: 25,
        },
        listContainer: {
            justifyContent: 'center',
        },
        itemContainer: {
            width: 177,
            margin: 8,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.card,
            borderRadius: 8,
            shadowColor: "#000000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.20,
            shadowRadius: 5.62,
            elevation: 7
        },
        itemImage: {
            width: 150,
            height: 150,
        },
        itemText: {
            marginTop: 8,
            fontSize: 16,
            color: colors.text,
        },
        
    });
};
