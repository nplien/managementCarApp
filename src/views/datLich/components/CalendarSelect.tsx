import {MyButtonText, MyView, MyLoading, MyButton, MyText} from 'bases/components';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useDeviceContext} from 'twrnc';
import MyNavigator from 'utils/MyNavigator';
import tw from 'utils/tailwind';
import store, {IAppNavigateProps} from 'views/app';
import {RootState} from 'views/app/redux/App.Reducer';

type IPropsStation = IAppNavigateProps<'CalendarSelect'>;
export default function CalendarSelect(props: IPropsStation) {
  useDeviceContext(tw);
  const {params} = props.route;

  const currentDateTicket = store.getState().TicketReducer.currentGameDateOnline;
  const gameItem = useSelector((state: RootState) => state.TicketReducer.game);
  // const currentDateTicket = useSelector(
  //   (state: RootState) => state.TicketReducer.currentGameDateOnline,
  // );

  const dispatch = useDispatch();

  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [startDateNew, setStartDateNew] = useState<Date | undefined>(currentDateTicket);
  const [endDateNew, setEndDateNew] = useState<Date | undefined>();

  useEffect(() => {
    const timer1 = setTimeout(() => setIsFirstLoading(false), 100);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const handleGoBack = () => {
    MyNavigator.goBack();
  };

  let renderButtom = null;
  if (params.modePress === 'single' && startDateNew) {
    renderButtom = (
      <SafeAreaView edges={['bottom']} style={tw.style('bg-white')}>
        <MyButtonText
          style={tw.style('mx-16px my-16px bg-plz_blue')}
          onPress={() => {
            dispatch(
              createAction('SET/TICKET/GAME_DATE_ONLINE', {
                currentGameDateOnline: startDateNew
              })
            );
            if (gameItem?.id) {
              dispatch(dispatch(createAction('GET/LIST_SERVICE_TICKET')));
            }
            dispatch(
              createAction('SET/TICKET/GAME_DATE_ONLINE', {
                currentGameDateOnline: startDateNew
              })
            );

            handleGoBack();
          }}
          title="Chọn ngày"
        />
      </SafeAreaView>
    );
  } else if (params.modePress === 'multiple' && startDateNew && endDateNew) {
    renderButtom = (
      <SafeAreaView edges={['top']}>
        <MyButtonText
          title="Chọn ngày"
          onPress={() => {
            // dispatch(
            //   createAction('SET/TIM_CHUYEN/CURRENT_DATE', {
            //     currentDateSigleTicket: startDateNew,
            //     currentDateReturnTicket: endDateNew,
            //   }),
            // );
            handleGoBack();
          }}
        />
      </SafeAreaView>
    );
  }
  if (isFirstLoading) {
    return (
      <MyView style={tw.style('bg-plz_black_30 flex-1 justify-end')}>
        <MyLoading style={tw.style('h-5/6 rounded-tl-16px rounded-tr-16px bg-white pt-16px')} />
      </MyView>
    );
  }
  return (
    <MyView style={[tw.style('bg-plz_black_30 flex-1 justify-end'), {flex: 1}]}>
      <MyButton transparent onPress={handleGoBack} style={tw.style('h-full')} />
      <MyView style={tw.style('max-h-5/6 rounded-tl-16px rounded-tr-16px bg-white pt-16px')}>
        <MyText style={tw.style('text-center text-[16px] mb-8px font-bold')}>Chọn ngày</MyText>
        <CalendarList
          modePress={params.modePress}
          maxMonths={12}
          startDate={startDateNew}
          endDate={endDateNew}
          onSelectionDate={(start: Date | undefined, end: Date | undefined) => {
            setEndDateNew(end);
            setStartDateNew(start);
          }}
        />
        {renderButtom}
      </MyView>
    </MyView>
  );
}
