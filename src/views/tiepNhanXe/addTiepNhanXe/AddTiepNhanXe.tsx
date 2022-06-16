import {ScrollView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {MyButton, MyButtonText, MyIcon, MyInput, MyText, MyView} from 'bases/components';
import tw from 'utils/tailwind';
import Svg, {Path} from 'react-native-svg';
// import AddImages from './components/AddImages';
import MyNavigator from 'utils/MyNavigator';
import {batch, useDispatch, useSelector} from 'react-redux';
import {RootState} from 'views/app/redux';
import {createAction} from 'views/app/redux/MyAction';
import {ITiepNhanXeModel} from 'models/TiepNhanXe.Model';
import {IAppNavigateProps} from 'views/app';
import Utilities from 'utils/Utilities';
import {COLOR, MY_SIZE, setPadding} from 'bases/styles/Core';

type IProps = IAppNavigateProps<'AddTiepNhanXe'>;
export default function AddTiepNhanXe(props: IProps) {
  const dispatch = useDispatch();
  const {params} = props.route;
  const typecar = useSelector((state: RootState) => state.TiepNhanXeReducer.typeCar);
  const arrTiepNhanXe = useSelector((state: RootState) => state.TiepNhanXeReducer.arrTiepNhanXe);
  const currentKhachHang = useSelector(
    (state: RootState) => state.ProductBanHangReducer.currentKhachHang
  );
  const inputRef = useRef({
    name: params.itemTNX?.name || '',
    phone: params.itemTNX?.phone || '',
    license_plates: params.itemTNX?.license_plates || '',
    note: ''
  });
  const phoneRef: any = useRef(null);
  const nameRef: any = useRef(null);
  const license_platesRef: any = useRef(null);
  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(
          createAction('SET/TNX/TYPE_CAR', {
            typeCar: {id: '', name: ''}
          })
        );
        dispatch(
          createAction('CHOOSE/KHACH/BAN/HANG/SET', {
            currentKhachHang: undefined
          })
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNhapPhieu = () => {
    inputRef.current.name = currentKhachHang?.name || '';
    inputRef.current.phone = currentKhachHang?.phone || '';
    if (!inputRef.current.name) {
      Utilities.showToast('Vui lòng nhập đầy đủ thông tin', 'Bạn chưa nhập tên chủ xe', 'warning');
      nameRef?.current.focus();
    } else if (!inputRef.current.phone) {
      Utilities.showToast(
        'Vui lòng nhập đầy đủ thông tin',
        'Bạn chưa nhập số điện thoại chủ xe',
        'warning'
      );
      phoneRef?.current.focus();
    } else if (!inputRef.current.license_plates) {
      Utilities.showToast('Vui lòng nhập đầy đủ thông tin', 'Bạn chưa nhập biển số xe', 'warning');
      license_platesRef?.current.focus();
      // } else if (!typecar?.id) {
      //   Utilities.showToast('Vui lòng nhập đầy đủ thông tin', 'Bạn chưa nhập loại xe', 'warning');
    } else {
      let objItem: ITiepNhanXeModel = {
        id: params.type === 'nomal' ? arrTiepNhanXe.length + 1 : params.itemTNX?.id || 0,
        name: inputRef.current.name,
        phone: inputRef.current.phone,
        license_plates: inputRef.current.license_plates,
        note: inputRef.current.note,
        created_at: new Date(),
        typeCar: typecar?.name || ''
      };
      dispatch(
        createAction('SET/TNX/OBJECT_INFOR_XE', {
          inforXeTN: objItem
        })
      );
      Utilities.showToast('Thêm phiếu tiếp nhận thành công', '', 'success');
      MyNavigator.goBack();
    }
  };
  return (
    <ScrollView style={tw.style(' bg-white')}>
      <MyView style={tw.style('px-16px mt-16px')}>
        <MyView style={tw.style('flex-row justify-between')}>
          <MyText>Thông tin chủ xe</MyText>
          <MyButton
            onPress={() => MyNavigator.navigate('Customer', {type: 'CHON_KHACH_HANG'})}
            style={tw.style('flex-row justify-between items-center')}>
            <MyIcon name="person" iconFontType="MaterialIcons" size={20} color={COLOR.TEXT.GRAY} />
            <MyText style={tw.style('ml-6px')}>{currentKhachHang?.name || 'Khách lẻ'}</MyText>
          </MyButton>
        </MyView>
        <MyInput
          inputRef={nameRef}
          style={tw.style('mt-16px h-40px')}
          numberOfLines={1}
          placeholder="Tên chủ xe"
          onChangeText={text => {
            inputRef.current.name = text;
          }}
          defaultValue={params.itemTNX?.name || currentKhachHang?.name}
        />
        <MyInput
          inputRef={phoneRef}
          style={tw.style('mt-16px h-40px')}
          numberOfLines={1}
          placeholder="Số điện thoại"
          keyboardType="number-pad"
          onChangeText={text => {
            inputRef.current.phone = text;
          }}
          defaultValue={params.itemTNX?.phone || currentKhachHang?.phone}
        />
      </MyView>
      <MyView style={tw.style('px-16px mt-16px')}>
        <MyText>Thông tin xe</MyText>
        <MyInput
          inputRef={license_platesRef}
          style={tw.style('mt-16px h-40px')}
          numberOfLines={1}
          placeholder="Biển số xe"
          onChangeText={text => {
            inputRef.current.license_plates = text;
          }}
          defaultValue={params.itemTNX?.license_plates}
        />
        <MyButton
          onPress={() => {
            MyNavigator.pushModal('TypeCarModal');
          }}
          style={tw.style(
            'flex-row border border-gray rounded-6px p-8px justify-center items-center mt-16px'
          )}>
          <MyText style={tw.style('font-bold flex-1')}>
            {typecar?.name || params.itemTNX?.typeCar || 'Loại xe'}
          </MyText>
          <Svg width={24} height={24} fill="none">
            <Path
              d="M17 9.17a1 1 0 0 0-1.41 0L12 12.71 8.46 9.17a1 1 0 1 0-1.41 1.42l4.24 4.24a1.002 1.002 0 0 0 1.42 0L17 10.59a1.002 1.002 0 0 0 0-1.42Z"
              fill="#000"
            />
          </Svg>
        </MyButton>
      </MyView>
      <MyView style={tw.style('px-16px mt-16px')}>
        <MyText>Yêu cầu khách hàng</MyText>
        <MyInput
          textAlignVertical={'top'}
          numberOfLines={10}
          multiline
          defaultValue={params.itemTNX?.note}
          placeholder={'Nhập ghi chú'}
          placeholderTextColor={COLOR.TEXT.SECONDARY}
          style={{
            ...setPadding(MY_SIZE.s_10, MY_SIZE.s_10, MY_SIZE.s_16, MY_SIZE.s_16),
            height: MY_SIZE.s_255,
            fontSize: MY_SIZE.s_16,
            marginTop: MY_SIZE.s_16
          }}
          onChangeText={text => {
            inputRef.current.note = text;
          }}
        />
      </MyView>
      {/* <AddImages /> */}
      <MyButtonText
        title={params?.type === 'nomal' ? 'Nhập' : 'Cập nhật'}
        style={tw.style('mx-16px mt-64px bg-green-400')}
        onPress={handleNhapPhieu}
      />
    </ScrollView>
  );
}
