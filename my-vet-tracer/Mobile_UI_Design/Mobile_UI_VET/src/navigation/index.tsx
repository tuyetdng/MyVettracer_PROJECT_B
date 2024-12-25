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
import ProfileScreen from "../screen/Setting/ProfileScreen";
import LoginScreen from "../screen/Login/LoginScreen";
import TestScreen from "../screen/Test/TestScreen";
import RegisterScreen from "../screen/register/RegisterScreen";
import PetDetailScreen from "../screen/pet/PetDetailScreen";
import EditPetScreen from "../screen/pet/PetEditScreen";
import AddPetScreen from "../screen/pet/PetAddScreen";
import TrackingScreen from "../screen/Tracking/TrackingScreen";


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
            case SCREENS.TESTSCREEN:
                iconName = focused ? "calendar" : "calendar-clear-outline";
                break;
            case SCREENS.LOGIN:
                iconName = focused ? "person" : "person-outline";
                break;
            case SCREENS.PROFILE:
                iconName = focused ? "settings" : "settings-outline";
                break;
            case SCREENS.TRACKING:
                iconName = focused ? "fitness" : "fitness-outline";
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
                    name={SCREENS.TRACKING}
                    component={TrackingScreen}
                />

                <Tab.Screen
                    name={SCREENS.TESTSCREEN}
                    component={TestScreen}
                />
                <Tab.Screen
                    name={SCREENS.PROFILE}
                    component={ProfileScreen}
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
                <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
                <Stack.Screen name={SCREENS.ROOT} component={renderTabNavigation} />
                <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
                <Stack.Screen name={SCREENS.PETDETAIL}>
                    {(props) => <PetDetailScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name={SCREENS.EDITPET}>
                    {(props) => <EditPetScreen {...props} />}
                </Stack.Screen>
                <Stack.Screen name={SCREENS.ADDPET} component={AddPetScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;