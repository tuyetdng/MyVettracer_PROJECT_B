import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppNavigator } from './navigation/AppNavigator';
import { AuthContext } from './context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const authContext = {
        isAuthenticated: !!userToken,
        userToken,
        isLoading,
        signIn: async (token) => {
            try {
                await AsyncStorage.setItem('loginToken', token);
                setUserToken(token);
            } catch (e) {
                console.error('Error saving token:', e);
                throw e;
            }
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('loginToken');
                setUserToken(null);
            } catch (e) {
                console.error('Error removing token:', e);
                throw e;
            }
        },
    };

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const token = await AsyncStorage.getItem('loginToken');
                setUserToken(token);
            } catch (e) {
                console.error('Error reading token:', e);
            } finally {
                setIsLoading(false);
            }
        };

        bootstrapAsync();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
