import React, { useMemo, useState } from "react";
import { useTheme } from "@react-navigation/native";
import createStyles from "./RegisterScreen.style";
import { Alert, Text, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

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
import { useIsFocused } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "../../shared/constants";
import { useNavigation } from '@react-navigation/native';
import { useOwnerRegister } from "../../queries/auth/useOwnerRegister";
import { useVetRegister } from "../../queries/auth/useVetRegister";

const RegisterScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showPassword, setShowPassword] = useState(false);

  const { onRegisterVetUser } = useVetRegister({
    onSuccess: (data) => {
      Alert.alert("Registered Success", "Welcome to our pet world!", [
        {
          onPress: () => NavigationService.push(SCREENS.LOGIN),
        },
      ]);
    },
    onError: (error) => {
      console.error("Register failed:", error);
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
    onRegisterVetUser(data);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      <Text style={styles.subtitle}>FOR YOUR ACCOUNT</Text>

      <Controller
        name={LoginKey.USERNAME}
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="User Name"
            placeholderTextColor="#5EC088"
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
              onChangeText={field.onChange}
              value={field.value}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor="#5EC088"
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye-with-line" : "eye"}
            size={24}
            color="#5EC088"
            type={IconType.Entypo}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        NavigationService.push(SCREENS.LOGIN);
      }}  >
        <Text style={styles.signupText}>
          Already have an account? <Text style={styles.signupLink}>Login</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default RegisterScreen;
