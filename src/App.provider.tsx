import React, {createContext, ReactElement} from 'react';
import {MoodOptionType, MoodOptionWithTimestamp} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

type Props = {
  children: ReactElement;
};
const storageKey = 'moodtracket_app';

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

export const AppProvider: React.FC<Props> = ({children}) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newMoodList = [...current, {mood, timestamp: Date.now()}];
      setAppData({moods: newMoodList});

      return newMoodList;
    });
  }, []);

  // React.useEffect(() => {
  //   const fetchAppData = async () => {
  //     const data = getAppData();
  //     if (data) {
  //       setMoodList(data?.moods);
  //     }
  //   };

  //   fetchAppData();
  // }, []);

  return (
    <AppContext.Provider value={{moodList, handleSelectMood}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
