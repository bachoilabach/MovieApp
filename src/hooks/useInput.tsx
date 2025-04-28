import { Mode } from "@/components/Input/DateInput";
import { useState } from "react";

export function useInput() {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const formatDate = (date: Date, mode?: Mode) => {
    const options: Intl.DateTimeFormatOptions =
      mode === Mode.TIME
        ? { hour: "2-digit", minute: "2-digit" }
        : { day: "2-digit", month: "2-digit", year: "numeric" };

    const formatter = new Intl.DateTimeFormat("default", options);
    return formatter.format(date);
  };
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  return {
    isDatePickerVisible,
    setDatePickerVisibility,
    formatDate,
    openSelect,
    setOpenSelect
  }
}
