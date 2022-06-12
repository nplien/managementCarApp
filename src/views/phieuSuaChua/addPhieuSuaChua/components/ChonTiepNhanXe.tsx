import React from 'react';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
import {BHCustomerandPrice} from 'views/products/ProductHangHoa/styles/ProductHangHoa.Style';
import tw from 'utils/tailwind';
import {useSelector} from 'react-redux';
import {RootState} from 'views/app/redux';

export default function ChonTiepNhanXe() {
  const currenTiepNhanXe = useSelector(
    (state: RootState) => state.PhieuSuaChuaReducer.currenTiepNhanXe
  );
  return (
    <MyButton
      style={tw.style(
        'flex-row items-center py-12px px-16px rounded-tl-16px rounded-tr-16px mt-16px justify-between'
      )}
      onPress={() => MyNavigator.navigate('TiepNhanXe', {type: 'PHIEU_SUA_XE'})}>
      <MyView style={tw.style('flex-row items-center flex-1')}>
        <MyIcon name="person" iconFontType="MaterialIcons" size={20} color={COLOR.TEXT.GRAY} />
        <MyText style={BHCustomerandPrice.txtSearch} myFontStyle="Medium">
          {currenTiepNhanXe?.name}
        </MyText>
      </MyView>
      <MyText style={tw.style('uppercase font-bold')} myFontStyle={'Bold'}>
        {currenTiepNhanXe?.license_plates}
      </MyText>
    </MyButton>
  );
}
