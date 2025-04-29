import { LeftArrowIcon, RightArrowIcon } from "@/assets/svgIcons";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSwiper } from "@/hooks/useSwiper";
import { RefObject } from "react";
import { defaultSwiperOptions } from "@/constants/swiperConfig";
const { width } = Dimensions.get("window");
type SwiperProps<T> = {
  Component: React.ComponentType<T>;
  handleGetData?: () => Promise<T[]>;
  data?: T[];
  swiperRef: RefObject<FlatList<T>>;
};
const Swiper = <T,>({
  Component,
  handleGetData,
  data,
  swiperRef,
}: SwiperProps<T>) => {
  const {
    items,
    handleNext,
    handlePrev,
    loading,
    handleMomentumScrollEnd,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  } = useSwiper({
    data: data,
    handleGetData: handleGetData,
    swiperRef: swiperRef,
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
          renderItem={({ item }) => (
            <View style={{ width, alignItems: "center" }}>
              <Component {...item} />
            </View>
          )}
          {...defaultSwiperOptions}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          snapToInterval={width}
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

export default Swiper;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 10,
    position: "relative",
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
