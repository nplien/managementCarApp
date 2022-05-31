import * as React from 'react';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {addBranchStyles, locationStyle} from '../styles/addABranch.Style';
import {LOCATION} from 'common/Constants';
import Utilities from 'utils/Utilities';
import {MyLocation} from 'views/app/components/customs';
import {IProvince} from 'models/ModelBase';

interface IProps {
  onChangeLocation: (location: IProvince, nameLocation: string) => void;
  currentCity?: IProvince;
  currentdistrict?: IProvince;
  currentWard?: IProvince;
}

interface IAppState {
  city: IProvince;
  district: IProvince;
  ward: IProvince;
}

export default class ViewLocationBrands extends React.Component<IProps, IAppState> {
  modalRef: any;
  constructor(props: IProps) {
    super(props);
    const {currentCity, currentdistrict, currentWard} = this.props;
    this.state = {
      city: {
        name: currentCity?.name || '',
        code: currentCity?.code || '',
        id: currentCity?.id
      },
      district: {
        name: currentdistrict?.name || '',
        code: currentdistrict?.code || '',
        id: currentdistrict?.id
      },
      ward: {name: currentWard?.name || '', code: currentWard?.code || '', id: currentCity?.id}
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
        <MyView style={locationStyle.containerChildADD}>
          <MyText myFontStyle="Regular" style={locationStyle.textPhoneAdd}>
            Tỉnh, thành
          </MyText>
          <MyButton
            onPress={() => {
              // if (currentCity?.name && currentCity?.name?.length > 0) {
              //   this.modalRef?.showHideModal(LOCATION.CITY, currentCity?.id);
              // } else {
              // }
              this.modalRef?.showHideModal(LOCATION.CITY, [city.id]);
            }}
            style={[locationStyle.viewInputPhoneAdd, locationStyle.viewBirthdayAdd]}>
            <MyText
              myFontStyle="Regular"
              style={[locationStyle.contentBirthDay, locationStyle.textPhoneAdd]}>
              {city.name}
            </MyText>
            <MyIcon
              style={locationStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={addBranchStyles.line} />
        <MyView style={locationStyle.containerChildADD}>
          <MyText myFontStyle="Regular" style={locationStyle.textPhoneAdd}>
            Quận, huyện
          </MyText>
          <MyButton
            onPress={() => {
              // if (city?.name && city?.name.length > 0) {
              //   this.modalRef?.showHideModal(
              //     LOCATION.DISTRICT,
              //     currentdistrict.id,
              //     currentCity.code
              //   );
              // } else if (city.name && city.name.length > 0) {
              //   this.modalRef?.showHideModal(LOCATION.DISTRICT, district.id, city.code);
              // } else {
              //   Utilities.showToast('Bạn chưa nhập Thành phố', '', 'warning');
              // }
              if (city.name && city.name.length > 0) {
                this.modalRef?.showHideModal(LOCATION.DISTRICT, [district.id], city.code);
              } else {
                Utilities.showToast('Bạn chưa nhập Thành phố', '', 'warning');
              }
            }}
            style={[locationStyle.viewInputPhoneAdd, locationStyle.viewBirthdayAdd]}>
            <MyText
              myFontStyle="Regular"
              style={[locationStyle.contentBirthDay, locationStyle.textPhoneAdd]}>
              {district.name}
            </MyText>
            <MyIcon
              style={locationStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={addBranchStyles.line} />
        <MyView style={locationStyle.containerChildADD}>
          <MyText myFontStyle="Regular" style={locationStyle.textPhoneAdd}>
            Phường, xã
          </MyText>
          <MyButton
            onPress={() => {
              // if (ward?.name && ward?.name.length > 0) {
              //   this.modalRef?.showHideModal(LOCATION.WARD, currentWard.id, currentdistrict.code);
              // } else if (district.name && district.name.length > 0) {
              //   this.modalRef?.showHideModal(LOCATION.WARD, ward.id, district.code);
              // } else {
              //   Utilities.showToast('Bạn chưa nhập Quận/huyện', '', 'warning');
              // }
              if (district.name && district.name.length > 0) {
                this.modalRef?.showHideModal(LOCATION.WARD, [ward.id], district.code);
              } else {
                Utilities.showToast('Bạn chưa nhập Quận/huyện', '', 'warning');
              }
            }}
            style={[locationStyle.viewInputPhoneAdd, locationStyle.viewBirthdayAdd]}>
            <MyText
              myFontStyle="Regular"
              style={[locationStyle.contentBirthDay, locationStyle.textPhoneAdd]}>
              {ward.name}
            </MyText>
            <MyIcon
              style={locationStyle.contentBirthDay}
              iconFontType="MaterialIcons"
              name="keyboard-arrow-right"
              size={24}
            />
          </MyButton>
        </MyView>
        <MyView style={addBranchStyles.line} />
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
