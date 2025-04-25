import MovieItem from "@/components/Movie/MovieItem";
import { useLogin } from "@/hooks/useLogin";
import { useMovies } from "@/hooks/useMovies";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export function Settings() {
  const { handleLogout } = useLogin();
  const user = useSelector((state: any) => state.auth.user);
    const sessionId = useSelector((state: any) => state.auth.sessionId);
  const navigation = useNavigation();
  const { favourMovies, isUpdating, pullToRefresh } = useMovies();

  if (!sessionId || !user) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textLogout}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favourMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem {...item} />}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>User Info</Text>
            <View style={styles.row}>
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
                }}
                style={styles.image}
              />
              <View>
                <Text style={styles.information}>ID: {user.id}</Text>
                <Text style={styles.information}>
                  Username: {user.username}
                </Text>
                <Text style={styles.information}>
                  Name: {user.name || "No name"}
                </Text>
              </View>
            </View>
            <Text style={styles.subTitle}>Favourite Movies</Text>
            {favourMovies?.length === 0 && (
              <Text style={{ fontStyle: "italic", color: "#777" }}>
                No favourite movies yet.
              </Text>
            )}
          </>
        }
        ListFooterComponent={
          isUpdating.isLoadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 140 }}
        refreshing={isUpdating.isRefresh}
        onRefresh={pullToRefresh}
        onEndReachedThreshold={0.5}
      />

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.textLogout}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  information: {
    fontSize: 16,
  },
  textLogout: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  logoutBtn: {
    paddingVertical: 16,
    backgroundColor: "#FF3030",
    borderRadius: 12,
    marginBottom: 10,
  },
  logoutContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  loginBtn: {
    paddingVertical: 20,
    backgroundColor: "#00F5FF",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    width: '100%',
    marginTop: 20,
    marginLeft: 16
  },
});
