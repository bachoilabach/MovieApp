import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { Movie } from "@/models/movie.model";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const { width } = Dimensions.get("window");

const MovieCard = (props: Movie) => {
  const { poster_path, original_title, release_date, vote_average } = props;
  const uri = `${IMAGE_BASE_URL}${poster_path}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} resizeMode="cover" style={styles.image} />
      <Text style={styles.title}>{original_title}</Text>
      <Text style={styles.meta}>Release date: {release_date}</Text>
      <Text style={styles.meta}>Vote: {vote_average}</Text>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: width - 40,  // đúng rồi, không sửa
    overflow: "hidden",
    paddingBottom: 20,
  },  
  image: {
    width: "100%",
    height: 320,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  meta: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 2,
  },
});
