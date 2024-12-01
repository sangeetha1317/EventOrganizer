import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/config";
import styles from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    let valid = true;
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email');
      valid = false;
    }

    if (!password) {
      setErrorMessage('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      valid = false;
    }

    if (!username) {
      setErrorMessage('Username is required');
      valid = false;
    }

    if (!valid) {
      Alert.alert('Error', errorMessage);
      setIsValid(false);
    }

    return valid;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      setEmail('');
      setPassword('');
      setUsername('');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
            <Ionicons name="calendar" size={100} color="#4a235a" />
            <Text style={styles.header}>Event Organizer</Text>
        </View>
        <Text style={styles.subHeader}>
        Join Us Today! Create your account to start organizing your events.
        </Text>  
      {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Please wait. Registering your account.....</Text>
                </View>
            )}
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { opacity: loading || !email || !password || !username ? 0.3 : 1 }]} onPress={handleSignup} disabled={loading || !email || !password || !username}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
