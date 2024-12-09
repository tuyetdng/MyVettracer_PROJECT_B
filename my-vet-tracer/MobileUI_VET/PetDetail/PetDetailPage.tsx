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
import * as NavigationService from "react-navigation-helpers";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import LinearGradient from "react-native-linear-gradient";
import EditProfile from "./EditPetPage";

import styles from "./PetDetail.style";
// import useGetpetInfo from "queries/auth/useGetpetInfo";

const ProfileScreen = () => {
  // const { data: petInfo, isFetching, isError, onGetpetInfo } = useGetpetInfo();

  const petInfo =
  {
    img: "https://i.pinimg.com/564x/53/2f/09/532f09ec0ecb7d40cfd8f5d226d60a5e.jpg",
        "petType": "Dog",
        "petName": "Simon",
        "age": 5,
        "sex": "Male",
        "weight": "30kg",
        "height": "50cm",
        "identification": "Golden retriever with a white patch on chest",
        "idOwnerUser": 2,
        "idVetUser": 1
  }

    ;
  // if (isFetching) {
  //   return <Text>Loading...</Text>;
  // }

  // if (isError || !petInfo) {
  //   return <Text>Failed to load user information.</Text>;
  // }

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
          <Text style={styles.name}>{petInfo.petName || "Anonymous"}</Text>
          <Text style={styles.role}>{petInfo.petType || "Pet"}</Text>
          <Image
            style={styles.profileImage}
            source={{
              uri: petInfo.img || "https://via.placeholder.com/150",
            }}
          />
          <View style={styles.statsRow}>
          
          </View>
        </LinearGradient>

        {/* About Me Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Description</Text>
          <Text style={styles.description}>
            {petInfo.identification || "No description provided."}
          </Text>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoItem}>
            
            <Icon name="birthday-cake" type={IconType.FontAwesome} size={14} /> {petInfo.age || "N/A"}
          </Text>
          {/* <Text style={styles.infoItem}>
            <Icon name="birthday-cake" size={14} />{" "+ petInfo.dateOfBirth || "Unknown"}
          </Text> */}
          <Text style={styles.infoItem}>
            <Icon name="transgender"   type={IconType.FontAwesome} size={14} /> {petInfo.sex || "Not specified"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="weight-kilogram"  type={IconType.MaterialCommunityIcons} size={14} /> {petInfo.weight || "Not specified"}
          </Text>
          <Text style={styles.infoItem}>
            <Icon name="height"  type={IconType.MaterialIcons} size={14} /> {petInfo.height || "Not specified"}
          </Text>
        </View>

       
        <TouchableOpacity style={styles.editButton}    onPress={() => NavigationService.navigate("EditProfile")} >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;


// const { data, onGetpetInfo } = useGetpetInfo();

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
