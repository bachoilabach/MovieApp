import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Movie } from "@/models/movie.model";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { HeartIcon } from "@/assets/svgIcons";
import { useMovies } from "@/hooks/useMovies";
import { useFavourite } from "@/hooks/useFavourite";

interface MovieItemProps extends Movie {}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieItem = (props: MovieItemProps) => {
  const navigation = useNavigation();
  const { id, title, poster_path, release_date, vote_average } = props;
  const {
    handleAddFavouriteMovie,
    isFavouriteMovie,
    handleDeleteFavouriteMovie,
  } = useFavourite();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MovieDetail", { id: id })}
          >
            <View style={styles.container}>
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${poster_path}` }}
                style={styles.poster}
                resizeMode="cover"
              />
              <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.meta}>Release: {release_date}</Text>
                <Text style={styles.meta}>Rating: {vote_average} ⭐</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  isFavouriteMovie(id)
                    ? handleDeleteFavouriteMovie(id)
                    : handleAddFavouriteMovie(id)
                }
              >
                <HeartIcon color={isFavouriteMovie(id) ? "#f40000" : "#ddd"} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  meta: {
    fontSize: 14,
    color: Colors.dark.meta,
  },
});
