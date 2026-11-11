import React from 'react';
import { ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import useFinance from './src/hooks/useFinance';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BudgetScreen from './src/screens/BudgetScreen';
import AddScreen from './src/screens/AddScreen';
import { COLORS } from './src/constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Menampilkan pesan error di layar (bukan layar putih) agar mudah diperiksa
class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#FEF2F2' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#991B1B' }}>Terjadi error</Text>
          <Text style={{ marginTop: 10, color: '#7F1D1D' }}>{String(this.state.error && (this.state.error.stack || this.state.error.message || this.state.error))}</Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

const ICONS = { Beranda: 'home', Riwayat: 'list', Anggaran: 'wallet' };

function Main() {
  // State utama aplikasi berada di sini, lalu dikirim ke setiap layar lewat props
  const { transactions, budget, loaded, addTransaction, deleteTransaction, updateBudget } = useFinance();

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: COLORS.primary,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Beranda" options={{ title: 'KosKu 💸' }}>
        {(props) => <HomeScreen {...props} transactions={transactions} budget={budget} />}
      </Tab.Screen>
      <Tab.Screen name="Riwayat">
        {(props) => <HistoryScreen {...props} transactions={transactions} onDelete={deleteTransaction} />}
      </Tab.Screen>
      <Tab.Screen name="Anggaran">
        {(props) => <BudgetScreen {...props} transactions={transactions} budget={budget} onSave={updateBudget} />}
      </Tab.Screen>
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen name="Utama" options={{ headerShown: false }}>
          {renderTabs}
        </Stack.Screen>
        <Stack.Screen
          name="Tambah"
          options={{
            title: 'Catat Transaksi',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
          }}
        >
          {(props) => <AddScreen {...props} onAdd={addTransaction} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}