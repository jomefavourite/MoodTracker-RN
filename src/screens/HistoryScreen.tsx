import {View} from 'react-native';
import React from 'react';
import {useAppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRow';

const HistoryScreen = () => {
  const appContext = useAppContext();

  return (
    <View>
      {appContext.moodList.map((item, ind) => (
        <MoodItemRow item={item} key={ind} />
      ))}
    </View>
  );
};

export default HistoryScreen;
