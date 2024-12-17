import React from "react";
import { Alert, View, Text, TextInput, Button, StyleSheet } from "react-native";
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

const LoginScreen = () => {
  const { setUser, setToken } = useAuthStore();
  const { data: userinfo, onGetUserInfo } = useGetUserInfo();

  const { onLogin } = useLogin({
    onSuccess: (data) => {
      const { token } = data.result;
      console.log("token: " + token);
      Alert.alert("Login Success", "You have successfully logged in", [
        {
          onPress: () => console.log("OK Pressed"),
        },
      ]);
      AsyncStorage.setItem("token", token).catch((error) => {
        console.error("Failed to save access token:", error);
      });
      setToken(token);

      if (token) {
        onGetUserInfo().catch((error) => {
          console.error("Failed to get user info:", error);
        });
        console.log("🚀 ~ LoginScreen ~ userinfo:", userinfo);
      }
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
      <Text style={styles.title}>Login</Text>

      <Controller
        name={LoginKey.USERNAME}
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Email"
          />
        )}
      />
      {errors.userName && <Text style={styles.error}>{errors.userName.message}</Text>}

      <Controller
        name={LoginKey.PASSWORD}
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            onChangeText={field.onChange}
            value={field.value}
            placeholder="Password"
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default LoginScreen;
