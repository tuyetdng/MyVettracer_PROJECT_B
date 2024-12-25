import React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity,ScrollView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products';
  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Networ......');
        }
        return response.json();
      })
      .then((d) => { setData(d.products); console.log(data); }
      )
      .catch((error) => { console.log(error); });
  }, []);

  const newBooking =
  {
    name: 'Daniel Kordan',
    location: 'Chamberlain',
    date: '28 Jan',
    time: '09:40-10:00',
    image: 'https://png.pngtree.com/thumb_back/fw800/background/20240421/pngtree-beautiful-and-cute-3d-girl-in-chibi-animation-image_15718262.jpg', // Replace with actual image URL
  }

    ;

  const upcomingConsultation = {
    name: 'Julia Wimmerlin',
    location: 'Chamberlain',
    time: '09:40-10:00',
    image: 'https://png.pngtree.com/thumb_back/fw800/background/20240421/pngtree-beautiful-and-cute-3d-girl-in-chibi-animation-image_15718262.jpg', // Replace with actual image URL
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual profile image URL
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hello</Text>
            <Text style={styles.name}>Dr. Carly Garcia</Text>
            <Text style={styles.subtitle}>Have a nice day</Text>
          </View>
        </View>

      </LinearGradient>

      {/* New Booking Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>New Booking</Text>
        {/* <View style={styles.card}>
          <Image source={{ uri: newBooking.image }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardName}>{newBooking.name}</Text>
            <Text style={styles.cardSubtitle}>{newBooking.location}</Text>
            <Text style={styles.cardTime}>
              {newBooking.date} | {newBooking.time}
            </Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <FlatList data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image source={{ uri: newBooking.image }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardName}>{newBooking.name}</Text>
                  <Text style={styles.cardSubtitle}>{newBooking.location}</Text>
                  <Text style={styles.cardTime}>
                    {newBooking.date} | {newBooking.time}
                  </Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* Upcoming Consultation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Consultation</Text>
        <FlatList data={data}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image source={{ uri: upcomingConsultation.image }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardName}>{upcomingConsultation.name}</Text>
                  <Text style={styles.cardSubtitle}>{upcomingConsultation.location}</Text>
                  <Text style={styles.cardTime}>{upcomingConsultation.time}</Text>
                </View>
              </View>
            );
          }}
        />
        {/* <View style={styles.card}>
          <Image source={{ uri: upcomingConsultation.image }} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardName}>{upcomingConsultation.name}</Text>
            <Text style={styles.cardSubtitle}>{upcomingConsultation.location}</Text>
            <Text style={styles.cardTime}>{upcomingConsultation.time}</Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flex: 0.4,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  headerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  cardTime: {
    fontSize: 14,
    color: '#555',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
  },
});

export default App;