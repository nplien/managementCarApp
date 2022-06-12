import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useDeviceContext} from 'twrnc';

import {ITimeGameModel} from '../../../models';
import {TicketApi} from '../../../services/apis';
import {MyButton, MyText, MyView} from '../../../shared/components';
import MyNavigator from '../../../utils/MyNavigator';
import tw from '../../../utils/tailwind';
import Utilities from '../../../utils/Utilities';
import {store} from '../../app';
// import {store} from '../../app';
import {createAction} from '../../app/redux/MyAction';

export default function PlayingTimeOnline() {
  useDeviceContext(tw);

  const currentGameDate = store.getState().TicketReducer.currentGameDateOnline;
  const gameItem = store.getState().TicketReducer.game;

  const [arrTimeGame, setArrTimeGame] = useState<ITimeGameModel[]>();

  const dispatch = useDispatch();
  function handleGetListTineGame() {
    const timeGameConvert: any = new Date(
      Utilities.convertTimeByFormat(currentGameDate || '', 'YYYY-MM-DD'),
    ).getTime();
    if (gameItem?.id && timeGameConvert) {
      Utilities.showRootLoading(true);
      TicketApi.getTimeGame({
        game_id: gameItem?.id,
        unix_time: timeGameConvert,
      })
        .then(res => {
          if (res) {
            if (res?.code) {
              Utilities.toast(res.message, 'warning');
            } else {
              setArrTimeGame(res?.data);
            }
          } else {
            Utilities.toast(
              'Mất kết nối tới hệ thống. Vui lòng thử lại',
              'danger',
            );
          }
        })
        .finally(() => {
          Utilities.showRootLoading(false);
        });
    }
  }

  useEffect(() => {
    handleGetListTineGame();
  }, []);

  const handleGoBack = () => {
    MyNavigator.goBack();
  };
  const onPressItem = (item: ITimeGameModel) => {
    dispatch(
      createAction('SET/TICKET/GAME_PLAYING_TIME', {
        currentPlayingTimeOnline: item,
      }),
    );
    handleGoBack();
  };
  return (
    <MyView style={[tw.style('bg-plz_black_30  flex-1 justify-end')]}>
      <MyButton transparent onPress={handleGoBack} style={tw.style('h-full')} />
      <MyView
        style={tw.style(
          'min-h-4/6 max-h-5/6 flex-1 bg-white rounded-tl-16px rounded-tr-16px pt-16px',
        )}>
        <MyText
          style={tw.style(
            'text-center text-[16px] font-bold border-b pb-16px border-b-gray ',
          )}>
          Chọn ngày
        </MyText>
        <ScrollView
          contentContainerStyle={[
            {flexWrap: 'wrap', flexDirection: 'row'},
            tw.style('mt-12px'),
          ]}>
          {arrTimeGame?.map(item => (
            <MyButton
              key={item.value.toString()}
              onPress={() => onPressItem(item)}
              style={[tw.style('w-1/4 sm:w-1/6 ')]}>
              <MyView
                style={tw.style(
                  'm-4px items-center rounded-6px border border-stone-200 flex-1 py-8px bg-stone-100',
                )}>
                <MyText style={tw.style('font-bold')}>{item.name}</MyText>
              </MyView>
            </MyButton>
          ))}
        </ScrollView>
      </MyView>
    </MyView>
  );
}
