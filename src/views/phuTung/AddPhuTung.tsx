import {ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {MyView, MyText, MyInput, MyButtonText, MyInputPriceMask} from 'bases/components';
import tw from 'utils/tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {IAppNavigateProps} from 'views/app';
import Utilities from 'utils/Utilities';
import {IPhuTungModel} from 'models/PhuTung.Model';
import MyNavigator from 'utils/MyNavigator';
import {RootState} from 'views/app/redux';
import {createAction} from 'views/app/redux/MyAction';
type IProps = IAppNavigateProps<'AddPhuTung'>;
export default function AddPhuTung(props: IProps) {
  const dispatch = useDispatch();
  const arrPhuTungTmp = useSelector((state: RootState) => state.PhieuSuaChuaReducer.arrPhuTungTmp);
  const {params} = props.route;
  const inputRef = useRef({
    name: params.itemPhuTung?.name || '',
    sku: params.itemPhuTung?.sku || '',
    price: params.itemPhuTung?.price || 0,
    total_quantity: params.itemPhuTung?.total_quantity || 0,
    thumbnail_url: params.itemPhuTung?.thumbnail_url || ''
  });
  const nameRef: any = useRef(null);
  const skuRef: any = useRef(null);
  const priceRef: any = useRef(null);
  const total_quantityRef: any = useRef(null);
  const thumbnail_urlRef: any = useRef(null);
  const handlePhuTung = () => {
    if (!inputRef.current.name) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ thông tin',
        'Bạn chưa nhập tên phụ tùng',
        'warning'
      );
      nameRef?.current.focus();
    } else if (!inputRef.current.sku) {
      Utilities.showToast('Vui lòng nhập đầy đủ thông tin', 'Bạn chưa nhập mã phụ tùng', 'warning');
      skuRef?.current.focus();
    } else if (!inputRef.current.price) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ thông tin',
        'Bạn chưa nhập giá Phụ tùng',
        'warning'
      );
      priceRef?.current.focus();
    } else if (!inputRef.current.total_quantity) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ thông tin',
        'Bạn chưa nhập số lượng phụ tùng',
        'warning'
      );
    } else {
      let objItem: IPhuTungModel = {
        id:
          params.type === 'nomal' ? (arrPhuTungTmp?.length || 0) + 1 : params.itemPhuTung?.id || 0,
        name: inputRef.current.name,
        sku: inputRef.current.sku,
        price: inputRef.current.price,
        total_quantity: inputRef.current.total_quantity,
        thumbnail_url:
          inputRef.current.thumbnail_url ||
          'https://i.pinimg.com/564x/32/92/4d/32924d631bc0de8be673fbbc9d0be2cf.jpg'
      };
      dispatch(
        createAction('SET/PSC/OBJ_PHU_TUNG', {
          objPhuTungTmp: objItem
        })
      );
      Utilities.log(objItem);
      Utilities.showToast('Thêm phiếu Phụ Tùng thành công', '', 'success');
      MyNavigator.goBack();
    }
  };

  return (
    <ScrollView style={tw.style(' bg-white')}>
      <MyView style={tw.style('px-16px mt-16px')}>
        <MyView style={tw.style('flex-row justify-between')}>
          <MyText>Thông tin Phụ Tùng</MyText>
        </MyView>
        <MyInput
          inputRef={nameRef}
          style={tw.style('mt-16px h-40px')}
          numberOfLines={1}
          placeholder="Tên phụ tùng"
          onChangeText={text => {
            inputRef.current.name = text;
          }}
          defaultValue={params.itemPhuTung?.name}
        />
        <MyInput
          inputRef={skuRef}
          style={tw.style('mt-16px h-40px')}
          numberOfLines={1}
          placeholder="Mã phụ tùng"
          keyboardType="number-pad"
          onChangeText={text => {
            inputRef.current.sku = text;
          }}
          defaultValue={params.itemPhuTung?.sku}
        />
      </MyView>
      <MyView style={tw.style('px-16px mt-16px')}>
        <MyText>Thông tin giá</MyText>
        <MyInputPriceMask
          ref={total_quantityRef}
          numberOfLines={1}
          containerStyle={tw.style('border mt-16px border-stone-300 rounded-6px')}
          style={tw.style('h-40px')}
          placeholder={'Số lượng'}
          keyboardType={'number-pad'}
          defaultValue={Utilities.convertCount(params.itemPhuTung?.total_quantity).toString()}
          onTextCallback={text => {
            inputRef.current.total_quantity = Number(text);
          }}
        />
        <MyInputPriceMask
          ref={priceRef}
          numberOfLines={1}
          containerStyle={tw.style('border mt-16px border-stone-300 rounded-6px')}
          style={tw.style('h-40px')}
          placeholder={'VNĐ'}
          keyboardType={'number-pad'}
          defaultValue={Utilities.convertCount(params.itemPhuTung?.price).toString()}
          onTextCallback={text => {
            inputRef.current.price = Number(text);
          }}
        />
      </MyView>
      <MyInput
        inputRef={thumbnail_urlRef}
        style={tw.style('mt-16px h-40px mx-16px')}
        numberOfLines={1}
        placeholder="Link ảnh"
        onChangeText={text => {
          inputRef.current.thumbnail_url = text;
        }}
        defaultValue={params.itemPhuTung?.sku}
      />
      {/* <AddImages /> */}
      <MyButtonText
        title={params?.type === 'nomal' ? 'Nhập' : 'Cập nhật'}
        style={tw.style('mx-16px mt-64px bg-green-400')}
        onPress={handlePhuTung}
      />
    </ScrollView>
  );
}
