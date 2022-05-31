import {MyIcon, MyImage, MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {addValueUpdate, updateInfo, IPersonalState} from '../redux';
import {personStyles} from '../styles/Person.styles';
import RowView from './RowView';
import {IMAGE_SIZE, LIST_GENDER} from 'common/Constants';

interface IInfoPersonalProps extends IPersonalState {
  addValueUpdate: typeof addValueUpdate;
  updateInfo: typeof updateInfo;
}

class InfoPersonal extends PureComponent<IInfoPersonalProps> {
  render() {
    const {infoPersonal} = this.props;
    let dob = infoPersonal?.birthday ? infoPersonal?.birthday * 1000 : null;
    return (
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
              {infoPersonal?.name}
            </MyText>
            <MyView style={personStyles.MvInfo}>
              <MyIcon iconFontType="FontAwesome" name="user" size={16} />
              <MyText style={personStyles.secondTitle} numberOfLines={1}>
                {infoPersonal?.id}
              </MyText>
            </MyView>
            <MyView style={personStyles.MvInfo}>
              <MyIcon iconFontType="FontAwesome" name="phone" size={16} />
              <MyText style={personStyles.secondTitle} numberOfLines={1}>
                {infoPersonal?.phone}
              </MyText>
            </MyView>
          </MyView>
        </MyView>
        <RowView name={'Email:'} content={infoPersonal?.email} />
        <RowView
          name={'Giới tính:'}
          content={LIST_GENDER.find(x => x.code === infoPersonal?.gender)?.name || ''}
        />
        <RowView
          name={'Ngày sinh:'}
          content={Utilities.convertTimeByFormat(dob, 'DD/MM/YYYY') || ''}
        />
        <RowView name={'Dịa chỉ:'} content={infoPersonal?.address} />
        {/* <RowView name={'Tỉnh thành'} content={objCity.length > 0 ? objCity[0].name : ''} />
        <RowView name={'Quận huyện'} content={objDistrict.length > 0 ? objDistrict[0].name : ''} />
        <RowView name={'Phường xã'} content={objWard.length > 0 ? objWard[0].name : ''} /> */}
        <RowView name={'Ghi chú:'} content={infoPersonal?.note} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {infoPersonal} = state.PersonalReducer;
  const objRoot = {
    infoPersonal
  };
  return objRoot;
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      addValueUpdate,
      updateInfo
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoPersonal);
