import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { toastService } from "@/services/toast.services";
import { Status } from "./useShowToast";

type UseSwiperProps<T> = {
  data?: T[];
  handleGetData?: () => Promise<T[]>;
};

export const useSwiper = <T = any,>({
  data,
  handleGetData,
}: UseSwiperProps<T>) => {
  const [items, setItems] = useState<T[]>(data || []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const swiperRef = useRef<FlatList<T>>(null);
  const [loading, setLoading] = useState<boolean>(!data || false);

  const handleNext = () => {
    if (!items || items.length === 0) return;
    let newIndex = currentIndex;
    if (newIndex === items.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    swiperRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    if (!items || items.length === 0) return;
    let newIndex = currentIndex;
    if (newIndex === 0) {
      newIndex = items.length - 1;
    } else {
      newIndex = currentIndex - 1;
    }
    swiperRef.current?.scrollToIndex({ index: newIndex, animated: true });
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (items.length > 1) {
      interval = setInterval(handleNext, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex || handleGetData]);
  const fetchData = async () => {
    if (handleGetData) {
      try {
        setLoading(true);
        const res = await handleGetData();
        setItems(res);
      } catch (err) {
        toastService.showToast(Status.error, "Error fetching swiper data");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    swiperRef,
    items,
    currentIndex,
    handleNext,
    handlePrev,
  };
};
