interface ILocalStorageProps<T> {
  key: string;
  value: T;
  timeInHours: number;
}

export const setWithExpiry = <T>({
  key,
  value,
  timeInHours
}: ILocalStorageProps<T>) => {
  const timenow = new Date();
  const items = {
    value: value,
    expiry: timenow.getTime() + timeInHours * 60 * 60 * 1000
  };
  localStorage.setItem(key, JSON.stringify(items));
};

export const getWithExpiry = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    const newItem = JSON.parse(item);
    const timeNow = new Date();

    if (timeNow.getTime() > newItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return newItem.value as T;
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }
};

// export const getWithExpiry = <T = unknown>(key: string): T | null => {
//   const item = localStorage.getItem(key);
//   if (!item) return null;

//   try {
//     const parsed = JSON.parse(item);
//     const timeNow = new Date();
//     if (timeNow.getTime() > parsed.expiry) {
//       localStorage.removeItem(key);
//       return null;
//     }
//     return parsed.value as T;
//   } catch (e) {
//     // Corrupted data or not in expected format
//     localStorage.removeItem(key);
//     return null;
//   }
// };
