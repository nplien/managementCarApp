import * as React from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {CustomerStyle} from '../style/Customer.Style';
import {LOCATION} from 'common/Constants';
import Utilities from 'utils/Utilities';

import {MyLocation} from 'views/app/components/customs';
import {IProvince} from 'models/ModelBase';

interface IProps {
  onChangeLocation: (location: IProvince, nameLocation: string) => void;
  currentCity?: any;
  currentdistrict?: any;
  currentWard?: any;
  cityCode?: string;
  districtCode?: string;
  wardCode?: string;
}

interface IAppState {
  city: IProvince;
  district: IProvince;
  ward: IProvince;
}

export default class ViewLocation extends React.Component<IProps, IAppState> {
  modalRef: any;
  constructor(props: IProps) {
    super(props);
    const {currentCity, currentdistrict, currentWard} = this.props;
    this.state = {
      city: {
        name: currentCity ? currentCity?.name : '',
        code: currentCity ? currentCity?.code : '',
        id: currentCity ? currentCity?.id : 0
      },
      district: {
        name: currentdistrict ? currentdistrict?.name : '',
        code: currentdistrict ? currentdistrict?.code : '',
        id: currentdistrict ? currentdistrict?.id : 0
      },
      ward: {
        name: currentWard ? currentWard?.name : '',
        code: currentCity ? currentWard?.code : '',
        id: currentWard ? currentWard?.id : 0
      }
    };
  }
  modalLocation = (location: IProvince, nameLocation: string) => {
    switch (nameLocation) {
      case LOCATION.CITY:
        this.props.onChangeLocation(location, LOCATION.CITY);
        this.setState({
          city: location,
          district: {name: '', code: '', id: 0},
          ward: {name: '', code: '', id: 0}
        });
        break;
      case LOCATION.DISTRICT:
        this.props.onChangeLocation(location, LOCATION.DISTRICT);
        this.setState({
          district: location,
          ward: {name: '', code: '', id: 0}
        });
        break;
      case LOCATION.WARD:
        this.props.onChangeLocation(location, LOCATION.WARD);
        this.setState({
          ward: location
        });
        break;
      default:
        break;
    }
  };
  render() {
    const {city, district, ward} = this.state;
    return (
      <MyView>
        <MyView style={CustomerStyle.containerChildADD}>
          <MyText style={CustomerStyle.textPhoneAdd}>Tỉnh thành:</MyText>
          <MyButton
            onPress={() => {
              this.modalRef?.showHideModal(LOCATION.CITY, [city.id]);
            }}
            style={[CustomerStyle.viewInput]}>
            <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
              {city.name}
            </MyText>
            <MyIcon
              style={CustomerStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={CustomerStyle.containerChildADD}>
          <MyText style={CustomerStyle.textPhoneAdd}>Quận huyện:</MyText>
          <MyButton
            onPress={() => {
              if (city.name && city.name.length > 0) {
                this.modalRef?.showHideModal(LOCATION.DISTRICT, [district.id], city.code);
              } else {
                Utilities.showToast('Bạn chưa nhập Thành phố', '', 'warning');
              }
            }}
            style={[CustomerStyle.viewInput]}>
            <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
              {district.name}
            </MyText>
            <MyIcon
              style={CustomerStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={CustomerStyle.containerChildADD}>
          <MyText style={CustomerStyle.textPhoneAdd}>Phường xã:</MyText>
          <MyButton
            onPress={() => {
              if (district.name && district.name.length > 0) {
                this.modalRef?.showHideModal(LOCATION.WARD, [ward.id], district.code);
              } else {
                Utilities.showToast('Bạn chưa nhập Quận/huyện', '', 'warning');
              }
            }}
            style={[CustomerStyle.viewInput]}>
            <MyText style={[CustomerStyle.contentBirthDay, CustomerStyle.textPhoneAdd]}>
              {ward.name}
            </MyText>
            <MyIcon
              style={CustomerStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyLocation
          ref={node => {
            this.modalRef = node;
          }}
          valueModal={this.modalLocation}
        />
      </MyView>
    );
  }
}
