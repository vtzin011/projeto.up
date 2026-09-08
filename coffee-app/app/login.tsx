import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Aviso', 'Preencha todos os campos para entrar.');
      return;
    }
    await signIn(email.split('@')[0]); // Usa a primeira parte do e-mail como nome
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡</Text>
      <Text style={styles.title}>DROP STORE</Text>
      <Text style={styles.subtitle}>O melhor do Streetwear exclusivo</Text>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail ou Usuário" 
        placeholderTextColor="#666"
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput 
        style={styles.input} 
        placeholder="Sua senha secreta" 
        placeholderTextColor="#666"
        secureTextEntry
        value={password} 
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ACESSAR DROP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#0B0B0F' },
  logo: { fontSize: 44, textAlign: 'center', marginBottom: 5 },
  title: { fontSize: 32, fontWeight: '900', letterSpacing: 2, marginBottom: 5, textAlign: 'center', color: '#FFF' },
  subtitle: { fontSize: 13, color: '#888', marginBottom: 40, textAlign: 'center' },
  input: { backgroundColor: '#16161F', borderWidth: 1, borderColor: '#242433', padding: 16, borderRadius: 12, marginBottom: 16, color: '#FFF' },
  button: { backgroundColor: '#8A2BE2', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#8A2BE2', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, letterSpacing: 1 }
});

