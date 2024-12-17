import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {

        if (!userName || !password) {
            Alert.alert('Error', 'Please enter both phone and password');
            return;
        }

        console.log("🚀 Payload being sent:", { userName, password });

        try {
            const result = await authAPI.login(userName, password);

            if (response.data.result && response.data.result.token) {
                Alert.alert('Login Sucessfully', 'Welcome back');
                console.log("🚀 Login with: ", { userName, password });

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Login failed. Please check your credentials.');
        }
    };

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.logo}>Login</Text>

            <View style={styles.formContainer}>
                <View style={[styles.inputContainer, { marginBottom: 10 }]}>
                    <Icon name="phone" size={24} color="#EF506B" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={userName}
                        onChangeText={setUserName}
                        keyboardType="phone-pad"
                        placeholderTextColor="#5f6368"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={24} color="#EF506B" style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, { flex: 1, marginRight: 0 }]}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#5f6368"
                    />
                    <TouchableOpacity
                        style={styles.passwordToggle}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Icon
                            name={showPassword ? "visibility-off" : "visibility"}
                            size={24}
                            color="#EF506B"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.button, !userName || !password ? styles.buttonDisabled : null]}
                    onPress={handleLogin}
                    disabled={!userName || !password}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;