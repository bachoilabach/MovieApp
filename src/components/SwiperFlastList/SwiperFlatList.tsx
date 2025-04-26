import { LeftArrowIcon, RightArrowIcon } from "@/assets/svgIcons";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSwiper } from "@/hooks/useSwiper";
import SwiperFlatListItem from "./SwiperFlatListItem";
import { getImages } from "@/services/image.services";
import MovieCard from "../Movie/MovieCard";
import { getAllMovie } from "@/services/movie.services";
import moviesData from 'db.json'
const SwiperFlatList = () => {
  const { swiperRef, items, handleNext, handlePrev, loading } = useSwiper({
    data: moviesData.movies,
    // handleGetData:() => getImages(),
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.left]}
        onPress={handlePrev}
      >
        <LeftArrowIcon />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={items}
          ref={swiperRef}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard {...item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          decelerationRate="fast"
        />
      )}
      <TouchableOpacity
        style={[styles.button, styles.next]}
        onPress={handleNext}
      >
        <RightArrowIcon />
      </TouchableOpacity>
    </View>
  );
};

export default SwiperFlatList;

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    paddingLeft: 10,
    paddingTop: 10,
    position: "relative",
    width: "100%",
  },
  button: {
    padding: 0,
    borderRadius: "100%",
    borderWidth: 1,
    position: "absolute",
    top: "50%",
    zIndex: 99,
    backgroundColor: "#fff",
  },
  next: {
    right: 8,
  },
  left: {
    left: 8,
  },
  loader: {
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginLeft: 10,
  },
});
