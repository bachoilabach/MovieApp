import { StyleSheet, Text, TextInput } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardType } from "@/enums/KeyboardType";

interface CustomFormInputProps {
  title: string;
  control: any;
  name: string;
  requiredMessage?: string;
  regex?: RegExp;
  patternMessage?: string;
  errors: any;
  placeholder?: string;
  keyboardType?: KeyboardType;
  multiline?: boolean;
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
}

const CustomFormInput = (props: CustomFormInputProps) => {
  const {
    title,
    control,
    name,
    requiredMessage,
    regex,
    patternMessage,
    errors,
    placeholder,
    keyboardType,
    multiline = false,
    minValue,
    maxValue,
    maxLength,
  } = props;
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Controller
        control={control}
        name={name}
        rules={{
          ...(requiredMessage && { required: requiredMessage }),
          ...(regex &&
            patternMessage && {
              pattern: {
                value: regex,
                message: patternMessage,
              },
            }),
          ...(minValue && {
            min: {
              value: minValue,
              message: `${title} must be at least at ${minValue}`,
            },
          }),
          ...(maxValue && {
            max: {
              value: maxValue,
              message: `${title} must be at most at ${maxValue}`,
            },
          }),
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                errors[name] && { borderColor: "red" },
                multiline && { height: 100 },
              ]}
              placeholder={placeholder || `Enter your ${title.toLowerCase()}`}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
              multiline={multiline}
              maxLength={maxLength}
            />
            {errors[name] && (
              <Text style={{ color: "red" }}>{errors[name].message}</Text>
            )}
          </>
        )}
      />
    </>
  );
};

export default CustomFormInput;

const styles = StyleSheet.create({
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
    marginBottom: 4,
  },
});
