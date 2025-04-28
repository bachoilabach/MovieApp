export enum SnapAlignments {
    START = "start",
    CENTER = "center",
    END = "end",
  }
  
  export enum DecelerationRates {
    FAST = "fast",
    NORMAL = "normal",
  }
  
  export const defaultSwiperOptions = {
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    pagingEnabled: true,
    snapToAlignment: SnapAlignments.CENTER,
    decelerationRate: DecelerationRates.FAST,
  };
  