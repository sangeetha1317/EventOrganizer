import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/config";
import styles from "./styles";

export default function Login ({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    let valid = true;
    setModalVisible(false);
    setMessage('');

    if (!email) {
        setMessage('Email is required');
        valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setMessage('Please enter a valid email');
        valid = false
    }

    if (!password) {
        setMessage('Password is required');
        valid = false
    } else if (password.length < 6) {
        setMessage('Password must be at least 6 characters');
        valid = false
    }

    if (!valid) {
        setIsValid(false);
        setModalVisible(true);
    }

    return valid;
};

  const handleLogin = async () => {
    if (!validateForm()) {
        console.log("not")
        return;
    }
    let valid = true;
    setModalVisible(false);
    setMessage('');

    setLoading(true);
    try {
        const user = await signInWithEmailAndPassword(auth,email, password);
        if (user !== null) {
        } else {
            setMessage('Failed to Log in');
            valid = false
        }
    } catch (error) {
        setMessage('Failed to Log in');
        valid = false
    } finally {
        setLoading(false);
        setEmail("");
        setPassword("");
    }
    if (!valid) {
        setIsValid(false);
        setModalVisible(true);
    }

  };

  return (
    <View style={styles.container}>
        {loading && (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#2856ad" />
                <Text style={styles.loadingText}>Loggin in.....</Text>
            </View>
        )}
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={[styles.button, { opacity: loading || !email || !password ? 0.3 : 1 }]}
      onPress={handleLogin}  disabled={loading || !email || !password}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
     <Modal
     animationType="fade"
     transparent={true}
     visible={modalVisible}
     onRequestClose={() => setModalVisible(false)}
 >
     <View style={styles.modalOverlay}>
         <View style={styles.modalContent}>
             <Text style={styles.modalTitle}>Error</Text>
             <Text style={styles.modalText}>{message}</Text>
             <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                 <Text style={styles.buttonText}>Ok</Text>
             </TouchableOpacity>
         </View>
     </View>
 </Modal>
 </View>

  );
};