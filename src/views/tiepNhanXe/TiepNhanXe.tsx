import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyButton, MyButtonIcon, MyImage, MyLoading, MyText, MyView} from 'bases/components';
import {setPadding, MY_SIZE, COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';
import tw from 'utils/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'views/app/redux';
import {ITiepNhanXeModel} from 'models/TiepNhanXe.Model';
import Utilities from 'utils/Utilities';
import {createAction} from 'views/app/redux/MyAction';
import {ItemLineIndicatorCustom} from 'views/app/components/items';

type IProps = IAppNavigateProps<'TiepNhanXe'>;
export default function TiepNhanXe(props: IProps) {
  const {params} = props.route;
  const dispatch = useDispatch();
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const arrTiepNhanXe = useSelector((state: RootState) => state.TiepNhanXeReducer.arrTiepNhanXe);
  const currenTiepNhanXe = useSelector(
    (state: RootState) => state.PhieuSuaChuaReducer.currenTiepNhanXe
  );

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Tiếp nhận xe',
      headerRight: () => {
        return (
          <MyButtonIcon
            style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
            iconFontType="AntDesign"
            iconProps={{name: 'plus', size: 24, color: COLOR.TEXT.BLACK}}
            onPress={() => {
              MyNavigator.navigate('AddTiepNhanXe', {type: 'nomal'});
            }}
          />
        );
      }
    });
    const timer1 = setTimeout(() => {
      setIsFirstLoading(false);
    }, 500);
    return function cleanup() {
      clearTimeout(timer1);
    };
  });

  const keyExtractor = (item: any, index: number) => item.id?.toString() || index.toString();
  const renderItemSeparatorComponent = () => (
    <MyView style={tw.style('m-2px h-1px bg-stone-200')} />
  );
  const handleToDatail = (item: ITiepNhanXeModel) => {
    if (params?.type === 'PHIEU_SUA_XE') {
      dispatch(createAction('SET/PSC/CURRENT_TIEP_NHAN_XE', {currenTiepNhanXe: item}));
      MyNavigator.goBack();
    } else {
      MyNavigator.navigate('AddTiepNhanXe', {type: 'update', itemTNX: item});
    }
  };

  const renderItem = ({item}: {item: ITiepNhanXeModel}) => (
    <MyButton
      onPress={() => {
        handleToDatail(item);
      }}
      style={tw.style(
        'flex-row p-8px items-center',
        currenTiepNhanXe?.id === item.id ? 'bg-stone-100' : 'bg-white'
      )}>
      <MyImage
        style={tw.style('w-40px h-40px')}
        source={{uri: 'https://i.pinimg.com/564x/63/ac/46/63ac46afa2e532300dc186451c3c54c7.jpg'}}
      />
      <MyView transparent style={tw.style('flex-1 ml-10px')}>
        <MyView transparent style={tw.style('flex-row justify-between')}>
          <MyText style={tw.style('font-bold flex-1 ')} myFontStyle={'Bold'}>
            {item.name}
          </MyText>
          <MyText style={tw.style('text-red-500')} myFontStyle={'Bold'}>
            {item.license_plates}
          </MyText>
        </MyView>
        <MyView transparent style={tw.style('flex-row justify-between items-center mt-6px ')}>
          <MyText style={tw.style('text-green-500 underline flex-1')}>{item.phone}</MyText>
          <MyText style={tw.style('font-bold')} myFontStyle={'Bold'}>
            {Utilities.convertTimeByFormat(item.created_at, 'DD/MM/YYYY hh:mm')}
          </MyText>
        </MyView>
      </MyView>
    </MyButton>
  );
  const renderEmpty = () => {
    return (
      <MyView style={tw.style('justify-center items-center')}>
        <MyText style={tw.style('font-bold')}>Chưa có phiếu tiếp nhận nào</MyText>
      </MyView>
    );
  };
  if (isFirstLoading) {
    return (
      <MyView style={tw.style('flex-1')}>
        <MyLoading />
      </MyView>
    );
  }
  return (
    <MyView style={[{backgroundColor: COLOR.BG.SECONDARY}, tw.style('flex-1')]}>
      <MyView style={tw.style('rounded-tl-16px rounded-tr-16px mt-16px')}>
        <MyText
          myFontStyle={'Medium'}
          style={tw.style('justify-center py-8px pl-16px font-medium')}>
          {'Tổng số ' + Utilities.convertCount(arrTiepNhanXe.length) + ' phiếu tiếp nhận'}
        </MyText>
      </MyView>
      <ItemLineIndicatorCustom />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        extraData={arrTiepNhanXe}
        data={arrTiepNhanXe}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={tw.style(
          'px-8px pt-16px pb-60px mt-16px bg-white rounded-tl-16px rounded-tr-16px'
        )}
        style={tw.style(' pb-60px bg-white')}
      />
    </MyView>
  );
}
