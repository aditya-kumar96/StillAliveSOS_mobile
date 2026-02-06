import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { apiFetch } from "../services/api";

export default function HomeScreen() {
  const [lastCheckin, setLastCheckin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadLastCheckin = async () => {
    try {
      const res = await apiFetch("/checkin/last");
      setLastCheckin(res.last_checkin);
    } catch {
      setLastCheckin(null);
    }
  };

  const handleCheckin = async () => {
    setLoading(true);
    try {
      await apiFetch("/checkin", { method: "POST" });
      Alert.alert("✅ Check-in successful", "You’re marked safe.");
      loadLastCheckin();
    } catch {
      Alert.alert("Error", "Unable to check in. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLastCheckin();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.appTitle}>StillAlive-SOS</Text>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>You’re safe</Text>
        <Text style={styles.subText}>
          {lastCheckin
            ? `Last check-in: ${new Date(lastCheckin).toLocaleString()}`
            : "No check-in yet"}
        </Text>
      </View>

      {/* Primary Action */}
      <TouchableOpacity
        style={styles.checkinButton}
        onPress={handleCheckin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <>
            <Text style={styles.checkinText}>✓ Check in now</Text>
            <Text style={styles.checkinSubText}>
              Tap to confirm you’re safe
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* Info */}
      <Text style={styles.infoText}>
        If you miss a check-in, we’ll notify your emergency contacts.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 60,
    alignItems: "center",
  },

  appTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2563EB",
    marginBottom: 32,
  },

  statusCard: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  statusText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#22C55E",
    marginBottom: 6,
  },

  subText: {
    fontSize: 14,
    color: "#6B7280",
  },

  checkinButton: {
    width: "80%",
    height: 72,
    borderRadius: 20,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  checkinText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  checkinSubText: {
    fontSize: 13,
    color: "#E5E7EB",
    marginTop: 4,
  },

  infoText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
