import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SosStatusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Triggered</Text>

      <Text style={styles.message}>
        We were unable to receive your check-in.
      </Text>

      <Text style={styles.message}>
        Your emergency contacts have been notified with your last known location.
      </Text>

      <Text style={styles.footer}>
        Help may already be on the way.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#EF4444",
      marginBottom: 16,
    },
    message: {
      fontSize: 16,
      color: "#374151",
      textAlign: "center",
      marginBottom: 12,
    },
    footer: {
      fontSize: 14,
      color: "#6B7280",
      marginTop: 24,
    },
  });
  