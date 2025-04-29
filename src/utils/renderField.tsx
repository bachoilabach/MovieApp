import CustomFormInput from "@/components/Input/CustomFormInput";
import CustomeSwitch from "@/components/Input/CustomSwitch";
import DateInput from "@/components/Input/DateInput";
import SelectInput from "@/components/Input/SelectInput";

export const renderField = (field: any, control: any, errors: any) => {
  switch (field.type) {
    case "input":
      return (
        <CustomFormInput
          key={field.name}
          title={field.title}
          name={field.name}
          control={control}
          requiredMessage={field.requiredMessage}
          regex={field.regex}
          patternMessage={field.patternMessage}
          keyboardType={field.keyboardType}
          placeholder={field.placeholder}
          multiline={field.multiline}
          minValue={field.minValue}
          maxValue={field.maxValue}
          errors={errors}
        />
      );
    case "select":
      return (
        <SelectInput
          key={field.name}
          control={control}
          errors={errors}
          title={field.title}
          items={field.items}
          placeholder={field.placeholder}
          name={field.name}
        />
      );
    case "date":
      return (
        <DateInput
          key={field.name}
          title={field.title}
          control={control}
          name={field.name}
          minimumDate={field.minimumDate}
          maximumDate={field.maximumDate}
          mode={field.mode}
        />
      );
    case "switch":
      return (
        <CustomeSwitch
          title={field.title}
          name={field.name}
          control={control}
        />
      );
    default:
      return null;
  }
};
