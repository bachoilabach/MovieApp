import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Props } from '@/navigation/screens/MovieDetail';
import { useEditMovie } from '@/hooks/useEditMovie';

const EditMovieModal = ({ route }: Props) => {
  const { id } = route.params;
  const { movie, handleChangeInput, handleSave, errors } = useEditMovie(id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={movie?.title}
        onChangeText={(text) => handleChangeInput('title', text)}
      />
      {errors?.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <Text style={styles.label}>Tagline</Text>
      <TextInput
        style={styles.input}
        value={movie?.tagline}
        onChangeText={(text) => handleChangeInput('tagline', text)}
      />
      {errors?.tagline && (
        <Text style={styles.errorText}>{errors.tagline}</Text>
      )}

      <Text style={styles.label}>Original Language</Text>
      <TextInput
        style={styles.input}
        value={movie?.original_language}
        onChangeText={(text) => handleChangeInput('original_language', text)}
      />
      {errors?.original_language && (
        <Text style={styles.errorText}>{errors.original_language}</Text>
      )}

      <Text style={styles.label}>Overview</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={movie?.overview}
        onChangeText={(text) => handleChangeInput('overview', text)}
        multiline
        numberOfLines={4}
      />
      {errors?.overview && (
        <Text style={styles.errorText}>{errors.overview}</Text>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditMovieModal;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
});
