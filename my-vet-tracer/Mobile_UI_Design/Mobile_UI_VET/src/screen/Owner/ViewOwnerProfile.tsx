import React, { useMemo } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./ViewOwnerProfile.style";
import LinearGradient from "react-native-linear-gradient";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { SCREENS } from "../../shared/constants";
import { useGetListPets } from "../../queries/pet/useGetPets";
import { useGetAppointmentsByPets } from "../../queries/appoinment/useGetAppointmentByPet";
import { viewOwnerProfileById } from "../../queries/auth/useGetViewOwnerProfileById";

interface ViewOwnerProfileProp {
    route: any;
}
const ViewOwnerProfile: React.FC<ViewOwnerProfileProp> = ({ route }) => {
    const theme = useTheme();
    const { colors } = theme;
    const styles = useMemo(() => createStyles(theme), [theme]);

    const { idOwnerUser } = route.params;
    const { data: owner, onGetOwnerById } = viewOwnerProfileById(idOwnerUser);
 

    
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Gradient Header */}
                <LinearGradient
                    colors={["#d1fdff", "#fddb92"]}
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.goBack}
                        onPress={() => NavigationService.goBack()}
                    >
                        <Icon
                            name="arrow-back-sharp"
                            type={IconType.Ionicons}
                            size={35}
                        />
                    </TouchableOpacity>
                    <Text style={styles.name}>{owner?.fullName || "Anonymous"}</Text>
                    <Text style={styles.role}>{owner?.userName || "User"}</Text>
                    

                    <Image
                        style={styles.profileImage}
                        source={{
                            uri: owner?.img || "https://via.placeholder.com/150",
                        }}
                    />
                    <View style={styles.statsRow}>
                        <View>
                            <Text style={styles.iconButton}>
                                <Icon name="phone" type={IconType.FontAwesome} size={20} color="#FF7E5F" />
                                <Text style={{ fontSize: 18 }}> {"\t"} {owner?.phoneNum || "No phone available"}</Text>
                            </Text>
                        </View>
                    </View>
                </LinearGradient>


                {/* Additional Info */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoItem}>
                        <Icon name="envelope" type={IconType.FontAwesome} size={18} /> {owner?.email || "N/A"}
                    </Text>
                    <Text style={styles.infoItem}>
                        <Icon name="birthday-cake" type={IconType.FontAwesome} size={18} />{" " + owner?.dob || "Unknown"}
                    </Text>
                    <Text style={styles.infoItem}>
                        <Icon name="transgender" type={IconType.FontAwesome} size={18} /> {owner?.gender || "Not specified"}
                    </Text>
                </View>


            </View>
        </ScrollView>
    );
};

export default ViewOwnerProfile;
