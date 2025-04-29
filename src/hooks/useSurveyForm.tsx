import { toastService } from "@/services/toast.services";
import { useForm } from "react-hook-form";
import { Status } from "./useShowToast";
import { useNavigation } from "@react-navigation/native";
import {
  emailRegex,
  fullNameVietNamese,
  number,
  phoneNumberVietNam,
} from "@/constants/Regex";
import { Mode } from "@/components/Input/DateInput";
import { Gender } from "@/enums/Gender";
import { Color } from "@/enums/Color";
import { FieldType } from "@/enums/FieldType";
import { SurveyResponse } from "@/models/survey.model";
import { useEffect, useState } from "react";
import { fetchSurvey, submitSurveys } from "@/services/survey.services";
import { KeyboardType } from "@/enums/KeyboardType";
export function useSurveyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SurveyResponse>({
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
      agree: false,
    },
  });
  const navigation = useNavigation();
  const [surveys, setSurveys] = useState<SurveyResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefresh] = useState<boolean>(false);

  function convertToArray(object: object) {
    const items = Object.entries(object).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));
    return items;
  }

  const genderItems = convertToArray(Gender);
  const colorItems = convertToArray(Color);

  const onSubmit = async (data: any) => {
    try {
      const surveyWithId = {
        id: Date.now(),
        ...data,
      };
      await submitSurveys(surveyWithId);
      toastService.showToast(Status.success, "Submit Success");
      handelResetForm()
      navigation.goBack();
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    }
  };

  const handelResetForm = () => {
    reset({
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
      agree: false,
    });
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
      keyboardType: KeyboardType.EMAIL,
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
      regex: number,
      patternMessage: 'Age is not contain character',
      minValue: 10,
      maxValue: 100,
      keyboardType: KeyboardType.NUMPAD,
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
      keyboardType: KeyboardType.PHONE,
      placeholder: "Enter your phone number",
    },
    {
      type: FieldType.INPUT,
      title: "Rating",
      name: "rating",
      requiredMessage: "Rating is required",
      minValue: 1,
      maxValue: 10,
      keyboardType: KeyboardType.NUMERIC,
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
      title: "Agree",
      name: "agree",
    },
  ];

  const handleGetAllSurveys = async () => {
    try {
      setLoading(true);
      const res = await fetchSurvey();
      setSurveys(res);
    } catch (error: any) {
      toastService.showToast(Status.error, error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    return ()=> {
      handelResetForm()
    }
  },[])

  const pullToRefresh = async () => {
    setRefresh(true);
    await handleGetAllSurveys();
    setRefresh(false);
  };

  useEffect(() => {
    handleGetAllSurveys();
  }, []);

  return {
    control,
    errors,
    genderItems,
    colorItems,
    onSubmit: handleSubmit(onSubmit),
    surveyFormFields,
    loading,
    surveys,
    isRefreshing,
    pullToRefresh,
  };
}
