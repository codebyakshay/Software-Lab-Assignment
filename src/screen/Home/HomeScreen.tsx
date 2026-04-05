import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/StoreProvider";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/navigation/types";
import { Storage, storageKeys } from "@/service/Storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { family } from "@/constant/Typography";

const HomeScreen = observer(() => {
  const { userStore } = useStore();
  const navigation = useNavigation<RootStackNavigationProp>();

  const handleLogout = () => {
    userStore.logout();
    Storage.remove(storageKeys.AUTH_TOKEN);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{userStore.user?.name || "User"}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userStore.user?.email || "N/A"}</Text>

          <View style={styles.divider} />

          <Text style={styles.infoLabel}>Auth Token</Text>
          <Text style={styles.infoValue} numberOfLines={2}>
            {userStore.user?.token || "None"}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontFamily: family.regular,
    color: "#666",
    fontSize: 16,
  },
  nameText: {
    fontFamily: family.semiBold,
    fontSize: 28,
    marginTop: 4,
    color: "#1A1A1A",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 40,
  },
  infoLabel: {
    fontFamily: family.bold,
    color: "#999",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: family.medium,
    fontSize: 16,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 16,
  },
  logoutButton: {
    backgroundColor: "#FFE5E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    fontFamily: family.semiBold,
    color: "#FF4D4D",
  },
});

export default HomeScreen;
