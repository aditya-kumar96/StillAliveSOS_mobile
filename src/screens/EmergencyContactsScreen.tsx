import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { apiFetch } from "../services/api";
import AddContactModal from "./AddContactModal";

type Contact = {
  id: string;
  name: string;
  phone: string;
  relation?: string;
};

export default function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);

  const loadContacts = async () => {
    try {
      const res = await apiFetch("/emergency-contacts");
      setContacts(res);
    } catch {
      setContacts([]);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      {item.relation ? (
        <Text style={styles.relation}>{item.relation}</Text>
      ) : null}
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Contacts</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Text style={styles.add}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* List / Empty State */}
      {contacts.length === 0 ? (
        <Text style={styles.empty}>
          Add at least one contact for SOS alerts.
        </Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      {/* Add Contact Modal */}
      <AddContactModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAdded={loadContacts}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8FAFC",
      padding: 24,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: "#111827",
    },
    add: {
      fontSize: 28,
      color: "#2563EB",
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: "#111827",
    },
    relation: {
      fontSize: 14,
      color: "#6B7280",
      marginTop: 4,
    },
    phone: {
      fontSize: 14,
      color: "#6B7280",
      marginTop: 2,
    },
    empty: {
      fontSize: 14,
      color: "#6B7280",
      textAlign: "center",
      marginTop: 60,
    },
  });
  