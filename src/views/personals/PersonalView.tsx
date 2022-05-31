import React, {PureComponent} from 'react';
import {personStyles} from './styles/Person.styles';
import {ScrollView} from 'react-native';
import {IPersonalState} from './redux';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {MyView, MyImage, MyText, MyIcon, MyLoading} from 'bases/components';
import Utilities from 'utils/Utilities';
import RowView from './components/RowView';
import {LocationApi} from 'services/LocationApi';
import {IMAGE_SIZE, LIST_GENDER} from 'common/Constants';

interface IPersonalViewProps extends IPersonalState {}

interface IAppSate {
  isLoadHoder: boolean;
  isError: boolean;
  city: string;
  district: string;
  ward: string;
}
class PersonalView extends PureComponent<IPersonalViewProps, IAppSate> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoadHoder: true,
      isError: false,
      city: '',
      district: '',
      ward: ''
    };
  }
  componentDidMount() {
    const {infoPersonal} = this.props;
    if (infoPersonal) {
      let arrRq = [];
      if (infoPersonal?.province_code) {
        let resCity = LocationApi.getDetail(infoPersonal?.province_code);
        arrRq.push(resCity);
      }
      if (infoPersonal?.district_code) {
        let resDistrict = LocationApi.getDetail(infoPersonal?.district_code);
        arrRq.push(resDistrict);
      }
      if (infoPersonal?.ward_code) {
        let resWard = LocationApi.getDetail(infoPersonal?.ward_code);
        arrRq.push(resWard);
      }
      Promise.all(arrRq)
        .then(res => {
          this.setState({
            isLoadHoder: false,
            city: res[0]?.data?.name || '',
            district: res[1]?.data?.name || '',
            ward: res[2]?.data?.name || ''
          });
        })
        .catch(() => {
          this.setState({
            isLoadHoder: false,
            isError: true
          });
        });
    }
  }

  render() {
    const {infoPersonal} = this.props;
    const {city, district, ward, isLoadHoder} = this.state;

    let dob = infoPersonal?.birthday ? infoPersonal?.birthday * 1000 : null;
    if (!infoPersonal || isLoadHoder) {
      return (
        <MyView style={personStyles.emptyCustomer} transparent>
          <MyLoading />
        </MyView>
      );
    }
    return (
      <ScrollView style={personStyles.container}>
        <MyView style={personStyles.container}>
          <MyView style={personStyles.content1}>
            <MyView style={personStyles.MvAvatar}>
              <MyImage
                style={personStyles.MvAvatarChild}
                height={84}
                width={84}
                source={Utilities.convertLinkImage(infoPersonal?.avatar, IMAGE_SIZE.EPIC)}
              />
            </MyView>
            <MyView style={personStyles.MvInfoCustomers}>
              <MyText style={personStyles.title} myFontStyle="Bold" numberOfLines={2}>
                {infoPersonal?.name || '-'}
              </MyText>
              <MyView style={personStyles.MvInfo}>
                <MyIcon iconFontType="FontAwesome" name="user" size={16} />
                <MyText style={personStyles.secondTitle} numberOfLines={1}>
                  {infoPersonal?.id || '-'}
                </MyText>
              </MyView>
              <MyView style={personStyles.MvInfo}>
                <MyIcon iconFontType="FontAwesome" name="phone" size={16} />
                <MyText style={personStyles.secondTitle} numberOfLines={1}>
                  {infoPersonal?.phone || '-'}
                </MyText>
              </MyView>
            </MyView>
          </MyView>
          <MyView style={personStyles.viewLine} />
          <RowView name={'Email:'} content={infoPersonal?.email || '-'} />
          <RowView
            name={'Giới tính:'}
            content={LIST_GENDER.find(x => x.code === infoPersonal.gender)?.name || '-'}
          />
          <RowView
            name={'Ngày sinh:'}
            content={Utilities.convertTimeByFormat(dob, 'DD/MM/YYYY') || '-'}
          />
          <RowView name={'Địa chỉ:'} content={infoPersonal?.address || '-'} />
          <RowView name={'Tỉnh, thành:'} content={city || '-'} />
          <RowView name={'Quận, huyện:'} content={district || '-'} />
          <RowView name={'Phường, xã:'} content={ward || '-'} />
          <RowView name={'Ghi chú:'} content={infoPersonal?.note || '-'} />
        </MyView>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {isPersonLoading, infoPersonal} = state.PersonalReducer;
  const objRoot = {
    isPersonLoading,
    infoPersonal
  };
  return objRoot;
};

export default connect(mapStateToProps, null)(PersonalView);
