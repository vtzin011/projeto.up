import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useCart } from '../../src/context/CartContext';

const PRODUTOS_CLOTHING = [
  { id: '1', name: 'Oversized Hoodie Black', price: 249.90 },
  { id: '2', name: 'Streetwear Cargo Pants', price: 189.00 },
  { id: '3', name: 'Sneakers Retro Neon', price: 450.00 },
];

export default function HomeDropStore() {
  const { signed, user, signOut } = useAuth();
  const { addToCart, cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!signed) {
      router.replace('/login');
    }
  }, [signed]);

  if (!signed) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back, <Text style={styles.userName}>{user}</Text> 👋</Text>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>New Drops</Text>

      <FlatList
        data={PRODUTOS_CLOTHING}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>Coppar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.cartInfo}>Carrinho: {cart.length} itens salvos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  welcome: { fontSize: 15, color: '#888' },
  userName: { color: '#00FFFF', fontWeight: 'bold' },
  logoutButton: { borderWidth: 1, borderColor: '#BA1A1A', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  logoutText: { color: '#BA1A1A', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', marginBottom: 20, letterSpacing: 1 },
  productCard: { backgroundColor: '#16161F', padding: 20, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: '#242433' },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  productPrice: { fontSize: 15, color: '#8A2BE2', marginTop: 4, fontWeight: 'bold' },
  addButton: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  addButtonText: { color: '#0B0B0F', fontWeight: 'bold', fontSize: 14 },
  footer: { marginTop: 20, padding: 18, backgroundColor: '#8A2BE2', borderRadius: 14, alignItems: 'center' },
  cartInfo: { color: '#FFF', fontWeight: 'bold', letterSpacing: 0.5 }
});
