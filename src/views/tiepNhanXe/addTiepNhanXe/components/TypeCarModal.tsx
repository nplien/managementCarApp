import {ScrollView} from 'react-native';
import React from 'react';
import {MyView, MyButton, MyText} from 'bases/components';
import tw from 'utils/tailwind';
import {dataCarFake} from './DatabaseCarFake';
import MyNavigator from 'utils/MyNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {createAction} from 'views/app/redux/MyAction';
import {ICreatedBy} from 'models/ModelBase';
import {RootState} from 'views/app/redux';

export default function TypeCarModal() {
  const dispatch = useDispatch();
  const typecar = useSelector((state: RootState) => state.TiepNhanXeReducer.typeCar);
  const handleGoBack = () => {
    MyNavigator.goBack();
  };
  const onPressItem = (item: ICreatedBy) => {
    dispatch(createAction('SET/TNX/TYPE_CAR', {typeCar: item}));
    handleGoBack();
  };
  return (
    <MyView style={[tw.style('bg-plz_black_30  flex-1 justify-end')]}>
      <MyButton transparent onPress={handleGoBack} style={tw.style('h-full')} />
      <MyView
        style={tw.style(
          'min-h-5/6 max-h-5/6 flex-1 bg-white rounded-tl-16px rounded-tr-16px pt-16px'
        )}>
        <MyText
          style={tw.style('text-center text-[16px] font-bold border-b pb-16px border-b-gray ')}>
          Chọn Loại xe
        </MyText>
        <ScrollView contentContainerStyle={[tw.style('mt-12px flex-wrap flex-row pb-60px')]}>
          {dataCarFake?.map(item => (
            <MyButton
              key={item.id.toString()}
              onPress={() => onPressItem(item)}
              style={[tw.style('w-1/4 sm:w-1/6')]}>
              <MyView
                style={tw.style(
                  'm-4px items-center rounded-6px border border-stone-200 flex-1 py-8px bg-stone-100',
                  typecar?.id === item.id ? 'border-red-600' : 'border-stone-200'
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
