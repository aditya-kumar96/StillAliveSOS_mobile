import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { apiFetch } from "../services/api";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdded: () => void;
};

export default function AddContactModal({
  visible,
  onClose,
  onAdded,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !phone) {
      Alert.alert("Error", "Name and phone are required");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/emergency-contacts", {
        method: "POST",
        body: JSON.stringify({ name, phone, relation }),
      });

      onAdded();
      onClose();
      setName("");
      setPhone("");
      setRelation("");
    } catch {
      Alert.alert("Error", "Failed to add contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Add Emergency Contact</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.input}
            placeholder="Relation (Optional)"
            value={relation}
            onChangeText={setRelation}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Saving..." : "Save Contact"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    sheet: {
      backgroundColor: "#FFFFFF",
      padding: 24,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 16,
      color: "#111827",
    },
    input: {
      backgroundColor: "#F8FAFC",
      padding: 14,
      borderRadius: 12,
      fontSize: 16,
      marginBottom: 12,
    },
    button: {
      backgroundColor: "#2563EB",
      padding: 16,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 8,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "500",
    },
    cancel: {
      textAlign: "center",
      marginTop: 12,
      color: "#6B7280",
    },
  });
  