import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { isReadyRef, navigationRef } from "react-navigation-helpers";

// import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "../shared/theme/themes";
import { SCREENS } from "../shared/constants";
import HomeScreen from "../screen/Home/HomeScreen";
import ProfileScreen from "../screen/Setting/ProfileScreenScreen";
import LoginScreen from "../screen/Login/LoginScreen";
import AppointmentScreen from "../screen/Appointment/AppointmentScreen";


// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
    const scheme = useColorScheme();
    const isDarkMode = scheme === "dark";

    React.useEffect((): any => {
        return () => (isReadyRef.current = false);
    }, []);

    const renderTabIcon = (
        route: any,
        focused: boolean,
        color: string,
        size: number,
    ) => {
        let iconName = "home";
        switch (route.name) {
            case SCREENS.HOME:
                iconName = focused ? "home" : "home-outline";
                break;
            case SCREENS.APPOINTMENT:
                iconName = focused ? "calendar" : "calendar-clear-outline";
                break;
            case SCREENS.LOGIN:
                iconName = focused ? "person" : "person-outline";
                break;
            case SCREENS.PROFILE:
                iconName = focused ? "settings" : "settings-outline";
                break;
            default:
                iconName = focused ? "home" : "home-outline";
                break;
        }
        return (
            <Icon
                name={iconName}
                type={IconType.Ionicons}
                size={size}
                color={color}
            />
        );
    };

    const renderTabNavigation = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) =>
                        renderTabIcon(route, focused, color, size),
                    tabBarActiveTintColor: palette.primary,
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: isDarkMode ? palette.black : palette.white,
                    },
                })}
            >
                <Tab.Screen name={SCREENS.HOME}
                    component={HomeScreen}
                />
                <Tab.Screen
                    name={SCREENS.APPOINTMENT}
                    component={AppointmentScreen}
                />
                <Tab.Screen
                    name={SCREENS.PROFILE}
                    component={ProfileScreen}
                />
                <Tab.Screen
                    name={SCREENS.LOGIN}
                    component={LoginScreen}
                />

            </Tab.Navigator>
        );
    };

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true;
            }}
            theme={isDarkMode ? DarkTheme : LightTheme}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={SCREENS.ROOT} component={renderTabNavigation} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
