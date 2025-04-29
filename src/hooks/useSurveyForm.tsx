import { toastService } from "@/services/toast.services";
import { useForm } from "react-hook-form";
import { Status } from "./useShowToast";
import { useNavigation } from "@react-navigation/native";
import { emailRegex, fullNameVietNamese, phoneNumberVietNam } from "@/constants/Regex";
import { keyboardType } from "@/components/Input/CustomFormInput";
import { Mode } from "@/components/Input/DateInput";
import { Gender } from "@/enums/Gender";
import { Color } from "@/enums/Color";
import { FieldType } from "@/enums/FieldType";

export type SurveyFormProps = {
  fullName: string;
  email: string;
  age: number;
  gender: Gender;
  feedback: string;
  phoneNumber: string;
  dateOfBirth: Date;
  rating: number;
  today: Date;
  color: string;
  agree: boolean
};
export function useSurveyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SurveyFormProps>({
    defaultValues: {
      fullName: "",
      email: "",
      age: 10,
      gender: Gender.MALE,
      feedback: "",
      phoneNumber: "",
      dateOfBirth: new Date(),
      rating: 5,
      today: new Date(),
      color: Color.RED,
      agree: false
    },
  });
  const navigation = useNavigation();

  function convertToArray(object: object) {
    const items = Object.entries(object).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));
    return items;
  }
  const genderItems = convertToArray(Gender);
  const colorItems = convertToArray(Color);

  const onSubmit = (data: any) => {
    console.log(data);
    toastService.showToast(Status.success, "Submit Success");
    navigation.goBack();
  };

  const surveyFormFields = [
    {
      type: FieldType.INPUT,
      title: "Full Name",
      name: "fullName",
      requiredMessage: "Full Name is required",
      regex: fullNameVietNamese,
      patternMessage:
        "Full name must contain only letters (including Vietnamese characters) and spaces.",
      placeholder: "Enter your full name",
    },
    {
      type: FieldType.INPUT,
      title: "Email",
      name: "email",
      requiredMessage: "Email is required",
      regex: emailRegex,
      patternMessage: "Invalid email address",
      placeholder: "Enter your email",
      keyboardType: keyboardType.EMAIL,
    },
    {
      type: FieldType.SELECT,
      title: "Gender",
      name: "gender",
      placeholder: "Select gender",
      items: genderItems,
    },
    {
      type: FieldType.INPUT,
      title: "Age",
      name: "age",
      requiredMessage: "Age is required",
      minValue: 10,
      maxValue: 100,
      keyboardType: keyboardType.NUMERIC,
      placeholder: "Enter your age",
    },
    {
      type: FieldType.DATE,
      title: "Date of Birth",
      name: "dateOfBirth",
      minimumDate: new Date(1950, 0, 1),
      maximumDate: new Date(),
      mode: Mode.DATE,
    },
    {
      type: FieldType.SELECT,
      title: "Color",
      name: "color",
      placeholder: "Select your favourite color",
      items: colorItems,
    },
    {
      type: FieldType.INPUT,
      title: "Feedback",
      name: "feedback",
      placeholder: "Your feedback",
      multiline: true,
    },
    {
      type: FieldType.INPUT,
      title: "Phone Number",
      name: "phoneNumber",
      requiredMessage: "Phone Number is required",
      regex: phoneNumberVietNam,
      patternMessage: "Invalid Vietnamese phone number",
      keyboardType: keyboardType.PHONE,
      placeholder: "Enter your phone number",
    },
    {
      type: FieldType.INPUT,
      title: "Rating",
      name: "rating",
      requiredMessage: "Rating is required",
      minValue: 1,
      maxValue: 10,
      keyboardType: keyboardType.NUMERIC,
      placeholder: "Rate us (1-10)",
    },
    {
      type: FieldType.DATE,
      title: "Today",
      name: "today",
      mode: Mode.TIME,
    },
    {
      type: FieldType.SWITCH,
      title: 'Agree',
      name: 'agree',
    }
  ];
  
  return {
    control,
    errors,
    genderItems,
    colorItems,
    onSubmit: handleSubmit(onSubmit),
    surveyFormFields
  };
}
