import { SurveyResponse } from "@/models/survey.model";
import { toastService } from "./toast.services";
import { Status } from "@/hooks/useShowToast";
import axios from "axios";

export const fetchSurvey = async (): Promise<SurveyResponse[]> => {
  try {
    const res = await axios.get<any, SurveyResponse[]>(
      "http://10.10.112.82:3001/surveys"
    );
    const { data } = res;
    return data;
  } catch (error: any) {
    toastService.showToast(Status.error, error.message);
  }
};

export const submitSurveys = async (
  survey: SurveyResponse
): Promise<SurveyResponse | undefined> => {
  try {
    const res = await axios.post<SurveyResponse>(
      "http://10.10.112.82:3001/surveys",
      survey
    );
    const { data } = res;
    return data;
  } catch (error: any) {
    toastService.showToast(Status.error, error.message);
  }
};
