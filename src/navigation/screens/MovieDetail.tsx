import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { StaticScreenProps } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { useMovieDetail } from '../../hooks/useMovieDetail';
import ToastMessage from '@/components/ToastMessage/ToastMessage';
import { useShowToast } from '@/hooks/useShowToast';

export type Props = StaticScreenProps<{
  id: number;
}>;

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = ({ route }: Props) => {
  const { id } = route.params;
  const { movie, trailerKey, loading, navigation } = useMovieDetail(id);
  const toast = useShowToast()
  if (loading || !movie)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <ScrollView style={styles.container}>
      <ToastMessage {...toast}/>
      <Image
        source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => navigation.navigate('EditMovieModal',{id})}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tagline}>{movie.tagline}</Text>
        <Text style={styles.date}>Release Date: {movie.release_date}</Text>
        <Text style={styles.vote}>
          ⭐ {movie.vote_average} ({movie.vote_count} votes)
        </Text>
        <Text style={styles.sectionTitle}>Genres:</Text>
        <Text style={styles.genreList}>
          {movie.genres.map((g) => g.name).join(', ')}
        </Text>

        <Text style={styles.sectionTitle}>
          Runtime: <Text style={styles.info}>{movie.runtime} minutes</Text>
        </Text>
        <Text style={styles.sectionTitle}>
          Status: <Text style={styles.info}>{movie.status}</Text>
        </Text>
        <Text style={styles.sectionTitle}>
          Original Language:{' '}
          <Text style={styles.info}>
            {movie.original_language.toUpperCase()}
          </Text>
        </Text>

        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.sectionTitle}>Trailer:</Text>
        {trailerKey ? (
          <View style={styles.video}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${trailerKey}`,
              }}
              style={{ borderRadius: 12 }}
            />
          </View>
        ) : (
          <Text>None</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  vote: {
    fontSize: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  video: {
    height: 200,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  genreList: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  info: {
    fontWeight: 'normal',
    color: '#555',
  },
  buttonEdit: {
    backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  editText: {
    fontWeight: 600,
  },
});
