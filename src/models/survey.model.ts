import { Gender } from "@/enums/Gender";

export interface SurveyResponse {
  id: number,
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