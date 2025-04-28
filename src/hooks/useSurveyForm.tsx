import { toastService } from "@/services/toast.services";
import { useForm } from "react-hook-form";
import { Status } from "./useShowToast";
import { useNavigation } from "@react-navigation/native";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHERS = "others",
}

export enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export type SurveyFormProps = {
  fullName: string;
  email: string;
  age: number;
  gender: Gender;
  feedback: string;
  phoneNumber: string;
  dateOfBirth: Date;
  rating: number;
  newsletter: false;
  today: Date,
  color: string,
};
export function useSurveyForm() {
    const { control, handleSubmit, formState: { errors } } = useForm<SurveyFormProps>({
        defaultValues: {
          fullName: "",
          email: "",
          age: 10,
          gender: Gender.MALE,
          feedback: "",
          phoneNumber: "",
          dateOfBirth: new Date(),
          rating: 5,
          newsletter: false,
          today: new Date(),
          color: Color.RED
        },
      });
    const navigation = useNavigation()
    
    function convertToArray(object: object){
      const items = Object.entries(object).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1), 
        value,
      }));
      return items
    }
      const genderItems = convertToArray(Gender)
      const colorItems = convertToArray(Color)
    
      const onSubmit = (data: any) => {
        console.log(data);
        toastService.showToast(Status.success,'Submit Success')
        navigation.goBack()
      };
 return{
    control,
    errors,
    genderItems,
    colorItems,
    onSubmit: handleSubmit(onSubmit)
 }
}