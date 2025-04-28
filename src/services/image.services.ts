import axios from "axios";
export type ImageResponse = {
  id: number;
  url: string;
};
export const getImages = async (): Promise<ImageResponse[]> => {
  const response = await axios.get<any, ImageResponse[]>(
    "https://api.ai-cats.net/v1/cat/similar/669de24a-1da1-4fcd-84b1-9e55a43a0e0e"
  );
  const { data } = response;
  return data;
};
