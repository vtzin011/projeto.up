import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useCart } from '../../src/context/CartContext';

export default function TelaCarrinho() {
  const { cart, removeFromCart } = useCart();

  const valorTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio... 🧐</Text>
          <Text style={styles.emptySubtext}>Adicione produtos na aba Vitrine!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    Qtd: {item.quantity} × R$ {item.price.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.removeButton} 
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.summaryContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total do Drop:</Text>
              <Text style={styles.totalValue}>R$ {valorTotal.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton} 
              onPress={() => alert('Pedido finalizado com sucesso!')}
            >
              <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B0F', padding: 24, paddingTop: 50 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFF', marginBottom: 24, letterSpacing: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  emptySubtext: { color: '#666', fontSize: 14 },
  cartCard: { backgroundColor: '#16161F', padding: 16, borderRadius: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#242433' },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  itemMeta: { fontSize: 13, color: '#00FFFF', marginTop: 4 },
  removeButton: { backgroundColor: '#BA1A1A22', borderWidth: 1, borderColor: '#BA1A1A', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  removeButtonText: { color: '#FFB4AB', fontWeight: 'bold', fontSize: 12 },
  summaryContainer: { marginTop: 20, padding: 20, backgroundColor: '#16161F', borderRadius: 16, borderWidth: 1, borderColor: '#242433' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  totalLabel: { color: '#888', fontSize: 15, fontWeight: 'bold' },
  totalValue: { color: '#FFF', fontSize: 22, fontWeight: '900' },
  checkoutButton: { backgroundColor: '#8A2BE2', padding: 16, borderRadius: 12, alignItems: 'center' },
  checkoutButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 }
});
