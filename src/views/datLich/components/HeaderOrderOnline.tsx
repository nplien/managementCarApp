import {MyView, MyText, MyButton, MyInput} from 'bases/components';
import React, {useImperativeHandle, useState} from 'react';
import Svg, {Path} from 'react-native-svg';
import MyNavigator from 'utils/MyNavigator';
import tw from 'utils/tailwind';
import Utilities from 'utils/Utilities';

interface IProps {}

export type IHeaderOrderOnlRef = {
  setItemHeader: () => void;
};
const HeaderOrderOnline = React.forwardRef<IHeaderOrderOnlRef, IProps>((props: IProps, ref) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  useImperativeHandle(ref, () => ({
    setItemHeader() {
      return {
        numberOfPlayers
      };
    }
  }));

  const convertStartDate: string = Utilities.convertTimeByFormat('', 'DD/MM/YYYY');

  function onPressStationDate() {
    MyNavigator.pushModal('CalendarSelect', {
      modePress: 'single'
    });
  }
  function onPressPlayingTime() {
    MyNavigator.pushModal('PlayingTimeOnline');
  }

  function onPressGame() {}

  return (
    <MyView style={tw.style('px-16px mt-16px')}>
      {/* Ngày chơi */}
      <MyText>Ngày chơi:</MyText>
      <MyButton
        onPress={() => onPressStationDate()}
        style={tw.style(
          'flex-row border border-gray rounded-6px p-8px justify-center items-center mt-8px mb-16px flex-1'
        )}>
        <MyText style={tw.style('font-bold flex-1')}>{convertStartDate || 'Chọn ngày chơi'}</MyText>
        <Svg width={24} height={24} fill="none">
          <Path
            d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z"
            fill="#000"
          />
        </Svg>
      </MyButton>

      {/* Game */}
      <MyText>Game:</MyText>
      <MyButton
        onPress={() => onPressGame()}
        style={tw.style(
          'flex-row border border-gray rounded-6px p-8px justify-center items-center mt-8px mb-16px flex-1 '
        )}>
        <MyText numberOfLines={1} style={tw.style('font-bold flex-1')}>
          {'Chọn game'}
        </MyText>
        <Svg width={24} height={24} fill="none">
          <Path
            d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z"
            fill="#000"
          />
        </Svg>
      </MyButton>

      {/* Khung giờ */}
      <MyText>Khung giờ chơi:</MyText>
      <MyButton
        onPress={() => onPressPlayingTime()}
        style={tw.style(
          'flex-row border border-gray rounded-6px p-8px justify-center items-center mt-8px mb-16px flex-1'
        )}>
        <MyText style={tw.style('font-bold flex-1')}>{'Chọn giờ chơi'}</MyText>
        <Svg width={24} height={24} fill="none">
          <Path
            d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z"
            fill="#000"
          />
        </Svg>
      </MyButton>

      {/* Số lượng người chơi */}
      <MyText>Số lượng người chơi:</MyText>
      <MyInput
        style={tw.style('mt-8px mb-16px h-40px')}
        numberOfLines={1}
        placeholder="nhập số người chơi"
        keyboardType="number-pad"
        maxLength={2}
        value={`${numberOfPlayers}`}
        defaultValue={`${numberOfPlayers}`}
        onChangeText={(text: string) => {
          setNumberOfPlayers(text);
        }}
      />
    </MyView>
  );
});

export default HeaderOrderOnline;
