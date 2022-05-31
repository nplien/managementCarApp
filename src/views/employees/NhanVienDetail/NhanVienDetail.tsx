import * as React from 'react';
import {MyView, MyText, MyLoading, MyIcon, MyImage, MyButtonText} from 'bases/components';
import {NhanvienDetailStyle} from './styles/NhanVienDetail.Style';
import {IStaffModel} from 'models/Staff.Model';

import HeaderDetails from './components/HeaderDetails';

import {LIST_GENDER} from 'common/Constants';
import {IAppNavigateProps} from 'views/app';
import {ScrollView} from 'react-native';
import tw from 'utils/tailwind';

type IProps = IAppNavigateProps<'NhanvienDetail'>;
interface IAppState {
  objDetail: IStaffModel;
  isLoadHoder: boolean;
  isError: boolean;
}

export default class NhanvienDetail extends React.Component<IProps, IAppState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      objDetail: props.route.params.itemDetail || {},
      isLoadHoder: true,
      isError: false
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoadHoder: false
      });
    }, 300);
  }
  render() {
    const {isLoadHoder, isError} = this.state;
    const {id, name, phone, note, email, avatar, address, gender, province, district, ward} =
      this.state.objDetail;
    if (isLoadHoder) {
      return (
        <MyView style={NhanvienDetailStyle.myLoading} transparent>
          <MyLoading />
        </MyView>
      );
    }
    if (isError) {
      return (
        <MyView style={NhanvienDetailStyle.emptyCustomer} transparent>
          <MyText>Không có dữ liệu</MyText>
          <MyButtonText
            onPress={() => this.componentDidMount()}
            title="Tải lại"
            style={NhanvienDetailStyle.BtnEmpty}
          />
        </MyView>
      );
    }
    return (
      <ScrollView style={NhanvienDetailStyle.DadContainer}>
        <MyView style={NhanvienDetailStyle.content1}>
          <MyView style={NhanvienDetailStyle.MvAvatar}>
            <MyImage style={tw.style('w-84px h-84px rounded-84px')} source={{uri: avatar}} />
          </MyView>
          <MyView style={NhanvienDetailStyle.MvInfoCustomers}>
            <MyText style={NhanvienDetailStyle.title} myFontStyle="Bold" numberOfLines={2}>
              {name || '-'}
            </MyText>
            <MyView style={NhanvienDetailStyle.MvInfo}>
              <MyIcon iconFontType="MaterialIcons" name="phone" size={20} />
              <MyText style={NhanvienDetailStyle.secondTitle} numberOfLines={1}>
                {phone || '-'}
              </MyText>
            </MyView>
            <MyView style={NhanvienDetailStyle.MvInfo}>
              <MyIcon iconFontType="MaterialCommunityIcons" name="email" size={20} />
              <MyText style={NhanvienDetailStyle.secondTitle} numberOfLines={1}>
                {email || '-'}
              </MyText>
            </MyView>
          </MyView>
        </MyView>
        <MyView style={NhanvienDetailStyle.line} />
        <HeaderDetails name={'Mã NV:'} content={id || '-'} />
        <HeaderDetails
          name={'Giới tính:'}
          content={LIST_GENDER.find(x => x.code === gender)?.name || '-'}
        />
        <HeaderDetails name={'Địa chỉ:'} content={address || '-'} />
        <HeaderDetails name={'Tỉnh, thành:'} content={province?.name || '-'} />
        <HeaderDetails name={'Quận, huyện:'} content={district?.name || '-'} />
        <HeaderDetails name={'Phường, xã:'} content={ward?.name || '-'} />
        <HeaderDetails name={'Ghi chú:'} content={note || '-'} />
      </ScrollView>
    );
  }
}
