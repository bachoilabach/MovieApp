import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

type SwiperItemProps = {
  id: number;
  url: string;
};

const { width } = Dimensions.get("window");

const SwiperItem = ({ id, url }: SwiperItemProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <Image
        source={{ uri: url }}
        style={[styles.image]}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 300,
    paddingHorizontal: 16,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  loader: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    left: 10,
    borderRadius: 8,
  },
});

export default SwiperItem;
