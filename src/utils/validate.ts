
export const isEmpty = (value: any): boolean => {
  return value === null || value === undefined || value === '';
};


export const isInvalidNumber = (value: any): boolean => {
  if (typeof value !== 'number') return false; 
  return value < 0 || value > 30; 
};

export const isNumber = (value: string): boolean => {
    return /^\d+$/.test(value);
};