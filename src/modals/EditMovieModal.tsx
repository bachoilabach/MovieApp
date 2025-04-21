import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Props } from '@/navigation/screens/MovieDetail';
import { useEditMovie } from '@/hooks/useEditMovie';
import { Controller, useForm } from 'react-hook-form';
const EditMovieModal = ({ route }: Props) => {
  const { id } = route.params;
  const { control, errors,handleSave } = useEditMovie(id);
  // const { movie, handleChangeInput, handleSave, errors} = useEditMovie(id);

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   <Text style={styles.label}>Title</Text>
    //   <TextInput
    //     style={styles.input}
    //     value={movie.title}
    //     onChangeText={(text) => handleChangeInput('title', text)}
    //   />
    //   {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

    //   <Text style={styles.label}>Tagline</Text>
    //   <TextInput
    //     style={styles.input}
    //     value={movie.tagline}
    //     onChangeText={(text) => handleChangeInput('tagline', text)}
    //   />
    //   {errors.tagline && <Text style={styles.errorText}>{errors.tagline}</Text>}

    //   <Text style={styles.label}>Original Language</Text>
    //   <TextInput
    //     style={styles.input}
    //     value={movie.original_language}
    //     onChangeText={(text) => handleChangeInput('original_language', text)}
    //   />
    //   {errors.original_language && (
    //     <Text style={styles.errorText}>{errors.original_language}</Text>
    //   )}

    //   <Text style={styles.label}>Overview</Text>
    //   <TextInput
    //     style={[styles.input, styles.textArea]}
    //     value={movie.overview}
    //     onChangeText={(text) => handleChangeInput('overview', text)}
    //     multiline
    //     numberOfLines={4}
    //   />
    //   {errors.overview && (
    //     <Text style={styles.errorText}>{errors.overview}</Text>
    //   )}

    //   <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
    //     <Text style={styles.saveText}>Save</Text>
    //   </TouchableOpacity>
    // </ScrollView>
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="title"
      />
      {errors.title && <Text style={styles.errorText}>This is required.</Text>}
      {/* Tagline */}
      <Text style={styles.label}>Tagline</Text>
      <Controller
        control={control}
        rules={{
          required: 'Tagline is required',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="tagline"
      />
      {errors.tagline && (
        <Text style={styles.errorText}>{errors.tagline.message}</Text>
      )}

      {/* Original Language */}
      <Text style={styles.label}>Original Language</Text>
      <Controller
        control={control}
        rules={{
          required: 'Original language is required',
          validate: (value) =>
            value.length === 2 || 'Original language must be a 2-letter code',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="original_language"
      />
      {errors.original_language && (
        <Text style={styles.errorText}>{errors.original_language.message}</Text>
      )}

      {/* Overview */}
      <Text style={styles.label}>Overview</Text>
      <Controller
        control={control}
        rules={{
          required: 'Overview is required',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
          />
        )}
        name="overview"
      />
      {errors.overview && (
        <Text style={styles.errorText}>{errors.overview.message}</Text>
      )}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}>
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
