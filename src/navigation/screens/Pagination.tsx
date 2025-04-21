import MovieItem from '@/components/Movie/MovieItem';
import { usePagination } from '@/hooks/usePagination';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export function Pagination() {
  const {
    movies,
    page,
    totalPages,
    isUpdating,
    goToPage,
    pullToRefresh,
    searchTerm,
    setSearchTerm,
  } = usePagination();
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>
      <TextInput
        style={styles.searchTerm}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {isUpdating.isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem {...item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshing={isUpdating.isRefresh}
            onRefresh={pullToRefresh}
          />
        )}
        <View style={styles.pagination}>
          <Button
            title="Prev"
            disabled={page === 1}
            onPress={() => goToPage(page - 1)}
          />
          <Text style={styles.pageText}>{`${page} / ${totalPages}`}</Text>
          <Button
            title="Next"
            disabled={page === totalPages}
            onPress={() => goToPage(page + 1)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchText: {
    fontSize: 16,
  },
  searchTerm: {
    borderWidth: 1,
    padding: 8,
    marginTop: 8,
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  pageText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
