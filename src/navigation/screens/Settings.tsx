import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Settings() {
  const { sessionId, user, logout } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {sessionId && user ? (
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.title}>User Info</Text>
            <View style={styles.row}>
              <Image
                source={{
                  uri: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
                }}
                style={styles.image}
              />
              <View>
                <Text style={styles.information}>ID: {user.id}</Text>
                <Text style={styles.information}>
                  Username: {user.username}
                </Text>
                <Text style={styles.information}>
                  Name: {user.name || 'No name'}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.textLogout}>Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.loginBtn} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.textLogout}>Go to Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  logoutBtn: {
    paddingVertical: 20,
    backgroundColor: '#FF3030',
    borderRadius: 10,
  },
  textLogout: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  loginBtn: {
    paddingVertical: 20,
    backgroundColor: '#00F5FF',
    borderRadius: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  information: {
    fontSize: 16,
  },
});
