import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { api } from "../src/api";

export default function Offers() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [offers, setOffers] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  const load = () => api("/api/rides/" + id + "/offers").then(x => setOffers(x.offers ?? [])).catch(() => {});

  useEffect(() => {
    load();
    const i = setInterval(load, 3000);
    return () => clearInterval(i);
  }, [id]);

  const select = async (offerId: string) => {
    setBusy(true);
    try {
      await api("/api/rides/" + id + "/select", { method: "POST", body: JSON.stringify({ offerId }) });
      router.replace({ pathname: "/trip", params: { id } });
    } catch (e) {
      Alert.alert("Xatolik", e instanceof Error ? e.message : "Qayta urinib ko‘ring.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={s.root}>
      <Text style={s.h}>Haydovchilar takliflari</Text>
      {offers.length === 0 ? (
        <Text style={s.empty}>Hozircha taklif yo‘q. Kuting…</Text>
      ) : (
        <FlatList
          data={offers}
          keyExtractor={x => x.id}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.price}>{Number(item.price).toLocaleString()} so‘m</Text>
              <Text style={s.meta}>Haydovchi taklifi</Text>
              <Pressable style={s.button} disabled={busy} onPress={() => select(item.id)}>
                <Text style={s.bt}>Shu haydovchini tanlash</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 20, backgroundColor: "#fff" },
  h: { fontSize: 28, fontWeight: "900", marginBottom: 18 },
  empty: { color: "#666", marginTop: 20 },
  card: { borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 18, padding: 18, marginBottom: 12 },
  price: { fontSize: 24, fontWeight: "900" },
  meta: { color: "#666", marginVertical: 8 },
  button: { backgroundColor: "#111", padding: 15, borderRadius: 13 },
  bt: { color: "#fff", textAlign: "center", fontWeight: "800" }
});