import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyButton, MyButtonIcon, MyLoading, MyText, MyTextPriceMask, MyView} from 'bases/components';
import {setPadding, MY_SIZE, COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';
import tw from 'utils/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'views/app/redux';
import Utilities from 'utils/Utilities';
import {IProductPCS} from 'models/PhieuSuaChua.Model';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {createAction} from 'views/app/redux/MyAction';
import {dataPhuTungFake} from './addPhieuSuaChua/components/DataPhuTungFake';
// import {createAction} from 'views/app/redux/MyAction';

type IProps = IAppNavigateProps<'PhieuSuaChua'>;
export default function PhieuSuaChua(props: IProps) {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const arrPhieuSuaChua = useSelector(
    (state: RootState) => state.PhieuSuaChuaReducer.arrPhieuSuaChua
  );
  const arrPhuTungTmp = useSelector((state: RootState) => state.PhieuSuaChuaReducer.arrPhuTungTmp);

  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Phiếu sửa chữa',
      headerRight: () => {
        return (
          <MyButtonIcon
            style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
            iconFontType="AntDesign"
            iconProps={{name: 'plus', size: 24, color: COLOR.TEXT.BLACK}}
            onPress={() => {
              // dispatch(createAction('CREATE/PSC/RESET_ARR_PSC'));
              MyNavigator.navigate('AddPhieuSuaChua');
            }}
          />
        );
      }
    });
    if (arrPhuTungTmp?.length < 1) {
      dispatch(createAction('SET/PSC/ARR_PHU_TUNG', {arrPhuTungTmp: dataPhuTungFake}));
    }
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
  const handleToDatail = (item: IProductPCS) => {
    // if (params?.type === 'PHIEU_SUA_XE') {
    //   dispatch(createAction('SET/PSC/CURRENT_TIEP_NHAN_XE', {currenTiepNhanXe: item}));
    //   MyNavigator.goBack();
    // } else {
    //   MyNavigator.navigate('AddTiepNhanXe', {type: 'update', itemTNX: item});
    // }
    MyNavigator.navigate('DetailPSC', {detailPSC: item});
  };

  const renderItem = ({item}: {item: IProductPCS}) => (
    <MyButton onPress={() => handleToDatail(item)} style={tw.style('py-8px px-16px bg-white')}>
      <MyView style={tw.style('flex-row justify-between')}>
        <MyText
          numberOfLines={1}
          myFontStyle="Medium"
          style={[tw.style('flex-1 text-left'), {fontSize: MY_SIZE.s_16}]}>
          {item.code}
        </MyText>
        <MyTextPriceMask
          myFontStyle="Medium"
          text={item.total_price || 0}
          numberOfLines={1}
          style={[tw.style('flex-1 text-right text-blue-500'), {fontSize: MY_SIZE.s_16}]}
        />
      </MyView>

      <MyView style={[tw.style('flex-row justify-between my-4px')]}>
        <MyText numberOfLines={1} myFontStyle="Regular" style={tw.style('flex-2 text-left')}>
          {item.customer?.name || '-'}
        </MyText>
      </MyView>

      <MyText
        numberOfLines={1}
        myFontStyle="Regular"
        style={tw.style('text-left text-[12px] text-black')}>
        {Utilities.convertUnixTimeByFormat(item.created_at, 'DD/MM/YYYY - HH:mm')}
      </MyText>
    </MyButton>
  );
  const renderEmpty = () => {
    return (
      <MyView style={tw.style('justify-center items-center')}>
        <MyText style={tw.style('font-bold')}>Chưa có phiếu sửa chữa nào</MyText>
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
  Utilities.log(arrPhieuSuaChua);
  return (
    <MyView style={[{backgroundColor: COLOR.BG.SECONDARY}, tw.style('flex-1')]}>
      <MyView style={tw.style('rounded-tl-16px rounded-tr-16px mt-16px')}>
        <MyText
          myFontStyle={'Medium'}
          style={tw.style('justify-center py-8px pl-16px font-medium')}>
          {'Tổng số ' + Utilities.convertCount(arrPhieuSuaChua.length) + ' phiếu sửa chữa'}
        </MyText>
      </MyView>
      <ItemLineIndicatorCustom />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        extraData={arrPhieuSuaChua}
        data={arrPhieuSuaChua}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={renderItemSeparatorComponent}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={tw.style('pb-60px bg-white rounded-tl-16px rounded-tr-16px')}
        style={tw.style(' pb-60px bg-white')}
      />
    </MyView>
  );
}
