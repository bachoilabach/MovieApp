import MovieItem from '@/components/Movie/MovieItem';
import { useMovies } from '@/hooks/useMovies';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export function Home() {
  const { movies, isUpdating, pullToRefresh, loadMoreMovie } = useMovies();

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem {...item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={isUpdating.isRefresh}
        onRefresh={pullToRefresh}
        onEndReached={loadMoreMovie}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isUpdating.isLoadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
