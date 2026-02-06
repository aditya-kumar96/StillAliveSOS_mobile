import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { apiFetch } from "../services/api";
import { clearToken } from "../utils/secureStorage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function SettingsScreen() {
  const [interval, setInterval] = useState<number | null>(null);
  const [grace, setGrace] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const loadSafetySettings = async () => {
    try {
      const res = await apiFetch("/safety");
      setInterval(res.checkin_interval_hours);
      setGrace(res.grace_period_minutes);
    } catch {
      // keep silent for now
    }
  };

  const handleLogout = async () => {
    await clearToken();

    navigation.reset({
      index: 0,
      routes: [{ name: "Phone" }],
    });
  };

  useEffect(() => {
    loadSafetySettings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Settings</Text>

      {/* Safety Info Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Check-in Frequency</Text>
        <Text style={styles.value}>
          {interval ? `Every ${interval} hours` : "--"}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Grace Period</Text>
        <Text style={styles.value}>
          {grace ? `${grace} minutes` : "--"}
        </Text>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      padding: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: "#111827",
      marginBottom: 20,
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 16,
    },
    label: {
      fontSize: 14,
      color: "#6B7280",
    },
    value: {
      fontSize: 16,
      color: "#111827",
      fontWeight: "500",
      marginTop: 4,
    },
    divider: {
      height: 1,
      backgroundColor: "#E5E7EB",
      marginVertical: 16,
    },
    logoutButton: {
      marginTop: 40,
      padding: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#EF4444",
      alignItems: "center",
    },
    logoutText: {
      color: "#EF4444",
      fontSize: 16,
      fontWeight: "500",
    },
  });
  