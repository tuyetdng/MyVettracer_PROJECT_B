import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Icon,{ IconType } from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
import styles from "./ProfileScreen.style";
import {useGetUserInfo} from "queries/auth/useGetUserInfo";
import { createStackNavigator } from '@react-navigation/stack';

const ProfileScreen = () => {
  const { data: userinfo, isFetching, isError, onGetUserInfo } = useGetUserInfo();


  const handleItemPress = (id: number) => {
    NavigationService.push(SCREENS.EDITPROFILE, { useriD: id });

  };
  if (isFetching) {
    return <Text>Loading...</Text>;
  }

  if (isError || !userinfo) {
    return <Text>Failed to load user information.</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Gradient Header */}
        <LinearGradient
          colors={["#FF7E5F", "#FEB47B", "#cc66ff"]}
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
          <Text style={styles.name}>{userinfo.firstName+"  "+ userinfo.lastName|| "Anonymous"}</Text>
          <Text style={styles.role}>{userinfo.username || "User"}</Text>
          <Text style={styles.location}>
            <Icon name="map-marker" type={IconType.FontAwesome} size={14} />{" "}
            {userinfo.address || "Unknown Location"}
          </Text>

          <Image
            style={styles.profileImage}
            source={{
              uri: userinfo.avatar || "https://via.placeholder.com/150",
            }}
          />
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.iconButton}>
                <Icon name="phone" type={IconType.FontAwesome} size={20} color="#FF7E5F" />
                <Text> {"\t"} {userinfo.phoneNumber || "No phone available"}</Text>
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* About Me Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Me</Text>
          <Text style={styles.description}>
            {userinfo.roles || "No description provided."}
          </Text>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoItem}>
            <Icon name="envelope" type={IconType.FontAwesome} size={14} /> {userinfo.email || "N/A"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="birthday-cake" type={IconType.FontAwesome} size={14} />{" "+ userinfo.dateOfBirth || "Unknown"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="transgender"  type={IconType.FontAwesome}size={14} /> {userinfo.gender || "Not specified"}
          </Text>
        </View>

        {/* Follow Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText} onPress={()=>{handleItemPress(userinfo.id)}}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;


// const { data, onGetUserInfo } = useGetUserInfo();

// const ProfileScreen = () => {

 
//   // const [username, setUsername] = useState("");
//   // const [firstName, setFirstName] = useState("");
//   // const [lastName, setLastName] = useState("");
//   // const [dateOfBirth, setDateOfBirth] = useState("");
//   // const [gender, setGender] = useState("");
//   // const [phoneNumber, setPhoneNumber] = useState("");
//   // const [address, setAddress] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [imageUri, setImageUri] = useState<string | null>(null);
//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* Gradient Header */}
//         <LinearGradient
//           colors={["#FF7E5F", "#FEB47B", "#cc66ff"]}
//           style={styles.header}
//         >
//           <Text style={styles.name}>{data.name || "Anonymous"}</Text>
//           <Text style={styles.role}>UserName</Text>
//           <Text style={styles.location}>
//             <Icon name="map-marker" size={14} /> San Francisco
//           </Text>

//           <Image
//             style={styles.profileImage}
//             source={{
//               uri: "https://i.pinimg.com/originals/09/3e/ba/093eba58f1420c9a6475f619f93eac89.jpg",
//             }}
//           />
//           <View style={styles.statsRow}>
//             <View>
//               <Text style={styles.iconButton}>
//                 <Icon name="phone" size={20} color="#FF7E5F" />
//                 <Text> {"\t"} 0999999999</Text>
//               </Text>
//             </View>
//           </View>
//         </LinearGradient>

//         {/* About Me Section */}
//         <View style={styles.aboutSection}>
//           <Text style={styles.aboutTitle}>About Me</Text>
//           <Text style={styles.description}>This is all about my profile</Text>
//         </View>

//         {/* Additional Info */}
//         <View style={styles.infoSection}>
//           <Text style={styles.infoItem}>
//             <Icon name="envelope" size={14} /> jane_mile@gmail.com
//           </Text>
//           <Text style={styles.infoItem}>
//             <Icon name="birthday-cake" size={14} /> March 15, 1993
//           </Text>
//           <Text style={styles.infoItem}>
//             <Icon name="female" size={14} /> Female
//           </Text>
//         </View>

//         {/* Follow Button */}
//         <TouchableOpacity style={styles.followButton}>
//           <Text style={styles.followButtonText}>Follow</Text>
//         </TouchableOpacity>

//         {/* Social Links */}
//         <View style={styles.socialRow}>
//           <Text style={styles.socialText}>Follow me on </Text>
//           <Icon name="behance" size={20} style={styles.socialIcon} />
//           <Icon name="instagram" size={20} style={styles.socialIcon} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ProfileScreen;
