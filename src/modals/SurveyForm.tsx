import React from "react";
import {
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Controller } from "react-hook-form";
import { useSurveyForm } from "@/hooks/useSurveyForm";
import DateInput, { Mode } from "../components/Input/DateInput";
import CustomFormInput, { keyboardType } from "../components/Input/CustomFormInput";
import SelectInput from "../components/Input/SelectInput";

const SurveyForm = () => {
  const { control, errors, genderItems, colorItems, onSubmit } =
    useSurveyForm();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Full Name */}
      <CustomFormInput
        title="Full Name"
        name="fullName"
        control={control}
        requiredMessage="Full Name is required"
        regex={
          /^[A-ZÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴa-záàảãạăắằẳẵặâấầẩẫậêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ ]{2,50}$/
        }
        patternMessage="Full name must contain only letters (including Vietnamese characters) and spaces."
        errors={errors}
        placeholder="Enter your full name"
      />

      {/* Email */}
      <CustomFormInput
        title="Email"
        name="email"
        control={control}
        requiredMessage="Email is required"
        regex={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
        patternMessage="Invalid email address"
        errors={errors}
        placeholder="Enter your email"
        keyboardType={keyboardType.EMAIL}
      />

      <SelectInput
        control={control}
        errors={errors}
        title={"Gender"}
        items={genderItems}
        placeholder="Select gender"
        name={"gender"}
      />

      {/* Age */}
      <CustomFormInput
        title="Age"
        name="age"
        control={control}
        requiredMessage="Age is required"
        minValue={10}
        maxValue={100}
        keyboardType={keyboardType.NUMERIC}
        errors={errors}
        placeholder="Enter your age"
      />

      {/* Date of Birth */}
      <DateInput
        title="Date of Birth"
        control={control}
        name="dateOfBirth"
        minimumDate={new Date()}
        maximumDate={new Date(1950, 0, 1)}
        mode={Mode.DATE}
      />

      {/* Gender */}
      <SelectInput
        title={"Color"}
        control={control}
        errors={errors}
        name="color"
        items={colorItems}
        placeholder="Select your favourite color"
      />

      {/* Feedback */}
      <CustomFormInput
        control={control}
        errors={errors}
        title="Feedback"
        name="feedback"
        placeholder="Your feedback"
        multiline={true}
      />

      {/* Phone number */}
      <CustomFormInput
        control={control}
        errors={errors}
        title="PhoneNumber"
        name="phoneNumber"
        requiredMessage="Phone Number is required"
        regex={/^(0|\+84)[3-9]\d{8}$/}
        patternMessage="Invalid Vietnamese phone number"
        keyboardType={keyboardType.PHONE}
        placeholder="Enter your phone number"
      />

      {/* Rating */}
      <CustomFormInput
        control={control}
        errors={errors}
        title="Rating"
        name="rating"
        requiredMessage="Rating is required"
        minValue={1}
        maxValue={10}
        keyboardType={keyboardType.NUMERIC}
        placeholder="Rate us (1-10)"
      />

      {/* Newsletter Subscription */}
      <Text style={styles.title}>Subscribe to Newsletter</Text>
      <Controller
        control={control}
        name="newsletter"
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
      />
      <DateInput
        title="Today"
        control={control}
        name="today"
        minimumDate={new Date()}
        maximumDate={new Date(1950, 0, 1)}
        mode={Mode.TIME}
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{ color: "#fff" }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SurveyForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
