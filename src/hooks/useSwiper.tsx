import { RefObject, useEffect, useRef, useState, useCallback } from "react";
import { FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { toastService } from "@/services/toast.services";
import { Status } from "./useShowToast";
import { ImageResponse } from "@/services/image.services";
import { Movie } from "@/models/movie.model";

type UseSwiperProps<T> = {
  data?: T[];
  handleGetData?: () => Promise<T[]>;
  swiperRef: RefObject<FlatList<T>>;
  autoScrollInterval?: number;
};

export const useSwiper = <T = Movie>({
  data,
  handleGetData,
  swiperRef,
  autoScrollInterval = 3000,
}: UseSwiperProps<T>) => {
  const [items, setItems] = useState<T[]>(data || []);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(!data || false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteracting = useRef<boolean>(false);

  const scrollToIndex = (index: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5});
  };

  const handleNext = useCallback(() => {
    if (!items || items.length === 0) return;
    const nextIndex = (currentIndex + 1) % items.length;
    scrollToIndex(nextIndex);
    setCurrentIndex(nextIndex);
  }, [currentIndex, items]);

  const handlePrev = useCallback(() => {
    if (!items || items.length === 0) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    scrollToIndex(prevIndex);
    setCurrentIndex(prevIndex);
  }, [currentIndex, items]);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isUserInteracting.current) {
        handleNext();
      }
    }, autoScrollInterval);
  }, [handleNext, autoScrollInterval]);

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
        setItems([...res, ...res]);
      } catch (err) {
        toastService.showToast(Status.error, "Error fetching swiper data");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.round(contentOffsetX / layoutWidth);
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

  useEffect(() => {
    if (items.length > 1) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [items, startAutoScroll]);

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
