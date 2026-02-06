import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { getToken } from "../utils/secureStorage";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const bootstrap = async () => {
      const token = await getToken();

      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Phone" }],
        });
      }
    };

    bootstrap();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StillAlive-SOS</Text>
      <Text style={styles.subtitle}>Your safety, always.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: "#0F4C81",
    },
    subtitle: {
      fontSize: 14,
      marginTop: 8,
      color: "#6B7280",
    },
  });
  