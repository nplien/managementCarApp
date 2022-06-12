import {MyTextPriceMask, MyView} from 'bases/components';
import React from 'react';

import {useSelector} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import Utilities from 'utils/Utilities';
import tw from 'utils/tailwind';
export default function GioHangPSC() {
  const arrPhuTung = useSelector((state: RootState) => state.CreatePSCReducer.arrProductPSC);

  let tongSo = 0;
  let tongGia = 0;

  if (arrPhuTung) {
    for (let index = 0; index < arrPhuTung.length; index++) {
      const item = arrPhuTung[index];
      tongSo = tongSo + item.totalQty;

      let price = item.phuTung?.price || 0;

      tongGia = tongGia + price * item.totalQty;
      console.log(item.phuTung?.price);
    }
  }
  console.log(1);
  return (
    <MyView
      transparent
      style={tw.style('flex-1 flex-row items-center py-14px pr-16px justify-end')}>
      <MyTextPriceMask
        hideCurrency
        text={Utilities.convertCount(tongSo)}
        numberOfLines={1}
        style={tw.style('rounded-4px border py-2px px-6px text-[12px] mr-12px')}
      />
      <MyTextPriceMask
        text={Utilities.convertCount(tongGia)}
        numberOfLines={1}
        myFontStyle="Regular"
        style={tw.style('text-green-500 text-[16px]')}
      />
    </MyView>
  );
}
