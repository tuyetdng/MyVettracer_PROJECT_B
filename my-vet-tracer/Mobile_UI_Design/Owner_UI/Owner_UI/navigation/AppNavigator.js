import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddServiceScreen from '../screens/AddServiceScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import EditServiceScreen from '../screens/EditServiceScreen';
import CustomerScreen from '../screens/CustomerScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import TransactionScreen from '../screens/TransactionScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ServiceStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ServicesList" 
      component={HomeScreen} 
      options={{ title: 'Services' }}
    />
    <Stack.Screen 
      name="AddService" 
      component={AddServiceScreen} 
      options={{ title: 'Add Service' }}
    />
    <Stack.Screen 
      name="ServiceDetail" 
      component={ServiceDetailScreen} 
      options={{ title: 'Service Details' }}
    />
    <Stack.Screen 
      name="EditService" 
      component={EditServiceScreen} 
      options={{ title: 'Edit Service' }}
    />
  </Stack.Navigator>
);

const CustomerStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CustomersList" 
      component={CustomerScreen} 
      options={{ title: 'Customers' }}
    />
    <Stack.Screen 
      name="AddCustomer" 
      component={AddCustomerScreen} 
      options={{ title: 'Add Customer' }}
    />
  </Stack.Navigator>
);

const TransactionStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="TransactionsList" 
      component={TransactionScreen} 
      options={{ title: 'Transactions' }}
    />
    <Stack.Screen 
      name="TransactionDetail" 
      component={TransactionDetailScreen} 
      options={{ title: 'Transaction Details' }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Services') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Customers') {
          iconName = focused ? 'people' : 'people-outline';
        } else if (route.name === 'Transactions') {
          iconName = focused ? 'cash' : 'cash-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen 
      name="Services" 
      component={ServiceStack} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Customers" 
      component={CustomerStack} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Transactions" 
      component={TransactionStack} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{ headerShown: true }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Main" 
      component={MainTabs} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
