import { RefObject, useEffect, useRef, useState, useCallback } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { toastService } from "@/services/toast.services";
import { Status } from "./useShowToast";
import { useFocusEffect } from "@react-navigation/native";

type UseSwiperProps<T> = {
  data?: T[];
  handleGetData?: () => Promise<T[]>;
  swiperRef: RefObject<FlatList<T>>;
  autoScrollInterval?: number;
};

export const useSwiper = <T,>({
  data,
  handleGetData,
  swiperRef,
  autoScrollInterval = 3000,
}: UseSwiperProps<T>) => {
  const [items, setItems] = useState<T[]>(data || []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(!data || false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // time
  const isUserInteracting = useRef<boolean>(false); // User scoll∂
  const scrollToIndex = (index: number) => {
    if (!swiperRef.current) {
      toastService.showToast(Status.error, "Do not have ref");
      return;
    }
    swiperRef.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  };

  const handleNext = () => {
    if (!items || items.length === 0) return;
    const nextIndex = (currentIndex + 1) % items.length;
    scrollToIndex(nextIndex);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    if (!items || items.length === 0) return;
    const prevIndex = (currentIndex + items.length) % items.length;//bỏ - 1 currInd vì khi set lại ở dưới đã -1 rồi 
    scrollToIndex(prevIndex);
    setCurrentIndex(prevIndex);
  };

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      handleNext();
    }, autoScrollInterval);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

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

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.floor(contentOffsetX / layoutWidth) - 1; // lỗi khi chi theo việc cuộn bị nhảy cách phần tử phải trừ 1 đặt index bắt đầu bằng -1
    setCurrentIndex(newIndex);
    isUserInteracting.current = false;
  };

  const handleScrollBeginDrag = () => {
    isUserInteracting.current = true;
    stopAutoScroll();
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
    };
  });

  return {
    loading,
    swiperRef,
    items,
    currentIndex,
    handleNext,
    handlePrev,
    handleMomentumScrollEnd,
    handleScrollBeginDrag,
    handleScrollEndDrag,
  };
};
