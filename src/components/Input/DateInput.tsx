import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useInput } from "@/hooks/useInput";
export enum Mode {
  DATE = "date",
  TIME = "time",
  DATET_TIME = "datetime",
}
interface DateInputProps {
  title: string;
  control: any;
  name: string;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: Mode;
}
const DateInput = ({
  title,
  control,
  name,
  minimumDate,
  maximumDate,
  mode = Mode.DATE,
}: DateInputProps) => {
  const { setDatePickerVisibility, isDatePickerVisible, formatDate } =
    useInput();

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text>{value ? formatDate(value, mode) : "Select date"}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode={mode}
              display="spinner"
              date={value || new Date()}
              maximumDate={minimumDate}
              minimumDate={maximumDate}
              onConfirm={(selectedDate) => {
                setDatePickerVisibility(false);
                onChange(selectedDate);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
          </>
        )}
      />
    </>
  );
};

export default DateInput;

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
  },
});
