import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import Swiper from "@/components/Swiper/Swiper";
import SwiperItem from "../../components/Swiper/SwiperItem";
import { getImages, ImageResponse } from "@/services/image.services";
import movieData from "db.json";
import MovieCard from "@/components/Movie/MovieCard";
import { Movie } from "@/models/movie.model";

const SwiperScreen = () => {
  const swiperRefImage = useRef<FlatList<ImageResponse>>(null);
  const swiperRefMovie = useRef<FlatList<Movie>>(null);

  return (
    <ScrollView style={styles.container}>
      <Swiper
        swiperRef={swiperRefImage}
        handleGetData={getImages}
        Component={SwiperItem}
      />
      <Swiper
        swiperRef={swiperRefMovie}
        data={movieData.movies}
        Component={MovieCard}
      />
    </ScrollView>
  );
};

export default SwiperScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 8,
  },
});
