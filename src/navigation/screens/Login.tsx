import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useLogin } from '@/hooks/useLogin';

const LoginScreen = () => {
  const { control, handleLogin, errors } = useLogin();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, zIndex: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20,
        }}
        keyboardShouldPersistTaps="handled">
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to TMDB</Text>
            <Text style={styles.sectionTitle}>User name</Text>
            <Controller
              control={control}
              rules={{
                required: 'User name is required',
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter user name"
                />
              )}
              name="username"
            />
            {errors.username && (
              <Text style={styles.errorText}>User name is required</Text>
            )}
            <Text style={styles.sectionTitle}>Password</Text>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter password"
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                {errors.password && (
                  <Text style={styles.errorText}>Password is required</Text>
                )}
              </View>
              <TouchableOpacity
                style={{ alignItems: 'flex-end', marginTop: 4 }}>
                <Text style={{ color: '#bbb' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  loginButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  loginText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
