import React, { useMemo, useState } from "react";
import { Alert, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LoginKey } from "../../queries/auth/keys";
import { useGetUserInfo } from "../../queries/auth/useGetUserInfo";
import { useLogin } from "../../queries/auth/useLogin";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../zustand/auth/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initialLoginFormValue,
  loginFormSchema,
  LoginFormType,
} from "./helper";
import createStyles from "./styles"
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { useIsFocused, useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { setUser, setToken } = useAuthStore();

  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState(false);

  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { token } = data.result;
      console.log("token: " + token);
      Alert.alert("Login Success", "You have successfully logged in", [
        {
          onPress: () => NavigationService.push(SCREENS.ROOT),

        },
      ]);
      AsyncStorage.setItem("token", token).catch((error) => {
        console.error("Failed to save access token:", error);
      });
      setToken(token);

    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: initialLoginFormValue,
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = (data: LoginFormType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    onLogin(data);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo_loginscreen_2.jpg')}
        style={styles.image}
      />

      <Text style={styles.subheader}>Welcome back!</Text>
      <Text style={styles.description}>You’ve been missed</Text>

      <Controller
        name={LoginKey.USERNAME}
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Username"
            placeholderTextColor="#000"
          />
        )}
      />
      {errors.userName && <Text style={styles.error}>{errors.userName.message}</Text>}

      <View style={styles.inputContainer}>
        <Controller
          name={LoginKey.PASSWORD}
          control={control}
          render={({ field }) => (
            <TextInput
              style={{ flex: 1 }}
              onChangeText={field.onChange}
              value={field.value}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#000"
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <TouchableOpacity
          style={[styles.passwordToggle, { marginLeft: 10 }]} // Khoảng cách giữa TextInput và icon
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye-with-line" : "eye"}
            size={24}
            color="#EF506B"
            type={IconType.Entypo}
          />
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        NavigationService.push(SCREENS.REGISTER);
      }}  >
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>


    </View>
  );
};


export default LoginScreen;
