import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import backgroundImage from './assets/background.png';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem('profileImage');
      if (storedImage !== null) {
        setProfileImage(storedImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileImage(selectedImage);
      await AsyncStorage.setItem('profileImage', selectedImage);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Perfil</Text>
      </View>
      <View style={styles.belowHeaderContainer}>  
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={100} color="white" />
        )}
      </TouchableOpacity>
        <View style={styles.ativoContainer}>
          <Ionicons name="ellipse" size={16} color="green" style={styles.ativoIcon} />
          <Text style={styles.ativo}>Ativo</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    height: 95,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    position: 'absolute',
    left: 30,
    top: 43,
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    width: '100%',
    bottom: 10,
  },
  belowHeaderContainer: {
    backgroundColor: 'black',
    height: 265,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ativoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
  },
  ativo: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
  },
  ativoIcon: {
    marginRight: 8,
  },
  profileImageContainer: {
    marginTop: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    padding: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});
