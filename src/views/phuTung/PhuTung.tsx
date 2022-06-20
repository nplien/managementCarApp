import {
  MyButtonIcon,
  MyView,
  MyButton,
  MyImage,
  MyText,
  MyLoading,
  MyTextPriceMask
} from 'bases/components';
import {setPadding, MY_SIZE, COLOR} from 'bases/styles/Core';
import {IPhuTungModel} from 'models/PhuTung.Model';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import MyNavigator from 'utils/MyNavigator';
import tw from 'utils/tailwind';
import Utilities from 'utils/Utilities';
import {IAppNavigateProps} from 'views/app';
import {ItemLineIndicatorCustom} from 'views/app/components/items';
import {RootState} from 'views/app/redux';
type IProps = IAppNavigateProps<'PhuTung'>;
export default function PhuTung(props: IProps) {
  const arrPhuTungTmp = useSelector((state: RootState) => state.PhieuSuaChuaReducer.arrPhuTungTmp);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Phụ Tùng',
      headerRight: () => {
        return (
          <MyButtonIcon
            style={{...setPadding(MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)}}
            iconFontType="AntDesign"
            iconProps={{name: 'plus', size: 24, color: COLOR.TEXT.BLACK}}
            onPress={() => {
              MyNavigator.navigate('AddPhuTung', {type: 'nomal'});
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
  //   const handleToDatail = (item: IPhuTungModel) => {
  //     console.log(item);
  //     // if (params?.type === 'PHIEU_SUA_XE') {
  //     //   dispatch(createAction('SET/PSC/CURRENT_TIEP_NHAN_XE', {currenTiepNhanXe: item}));
  //     //   MyNavigator.goBack();
  //     // } else {
  //     //   MyNavigator.navigate('AddTiepNhanXe', {type: 'update', itemTNX: item});
  //     // }
  //   };

  const renderItem = ({item}: {item: IPhuTungModel}) => (
    <MyButton style={tw.style('flex-row p-8px items-center', 'bg-white')}>
      <MyImage style={tw.style('w-40px h-40px')} source={{uri: item.thumbnail_url}} />
      <MyView transparent style={tw.style('flex-1 ml-10px')}>
        <MyView transparent style={tw.style('flex-row justify-between')}>
          <MyText style={tw.style('font-bold flex-1 ')} myFontStyle={'Bold'}>
            {item.name}
          </MyText>
          <MyTextPriceMask
            text={item.price || 0}
            numberOfLines={1}
            myFontStyle="Regular"
            style={tw.style('')}
          />
        </MyView>
        <MyView transparent style={tw.style('flex-row justify-between items-center mt-6px ')}>
          <MyText style={tw.style('text-green-500 underline flex-1')}>{item.sku}</MyText>
          <MyText style={tw.style('font-bold text-green-500')} myFontStyle={'Bold'}>
            {item.total_quantity}
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
          {'Tổng số ' + Utilities.convertCount(arrPhuTungTmp?.length) + ' phiếu tiếp nhận'}
        </MyText>
      </MyView>
      <ItemLineIndicatorCustom />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        extraData={arrPhuTungTmp}
        data={arrPhuTungTmp}
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
