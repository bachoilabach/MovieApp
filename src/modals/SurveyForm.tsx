import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import { renderField } from "@/utils/renderField";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SurveyForm = () => {
  const { control, errors, onSubmit, surveyFormFields } = useSurveyForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {surveyFormFields.map((field) => renderField(field, control, errors))}
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SurveyForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
