import { Mode } from "@/components/Input/DateInput";
import { useState } from "react";
import { Platform } from "react-native";

export function useInput() {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const formatDate = (date: Date, mode?: Mode) => {
    let options: Intl.DateTimeFormatOptions;

    if (mode === Mode.TIME) {
      options = { hour: "2-digit", minute: "2-digit" };
    } else {
      options =
        Platform.OS === "ios"
          ? { day: "2-digit", month: "2-digit", year: "numeric" }
          : { month: "2-digit", day: "2-digit", year: "numeric" };
    }

    const result = new Intl.DateTimeFormat("default", options).format(date)
    return result;
  };

  const [openSelect, setOpenSelect] = useState<boolean>(false);
  return {
    isDatePickerVisible,
    setDatePickerVisibility,
    formatDate,
    openSelect,
    setOpenSelect,
  };
}
