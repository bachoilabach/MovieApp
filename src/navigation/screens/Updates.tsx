import MovieItem from '@/components/Movie/MovieItem';
import { useToastContext } from '@/context/ToastContext';
import { useMovieFakeApi } from '@/hooks/useMovieFakeApi';
import { Status, useShowToast } from '@/hooks/useShowToast';
import { Button, FlatList, StyleSheet, View } from 'react-native';

export function Updates() {
  const { movies, refresh, pullToRefresh } = useMovieFakeApi();
  // * Fix missing genre_ids
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem {...item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={refresh}
        onRefresh={pullToRefresh}
        onEndReachedThreshold={0.5}
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
