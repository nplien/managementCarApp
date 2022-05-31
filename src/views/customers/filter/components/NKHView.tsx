import * as React from 'react';

import {connect} from 'react-redux';
import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import ModalNKH from './ModalNKH';
import {setGroups, IFilterCustomerState} from 'views/customers/manager/redux';
import MyNavigator from 'utils/MyNavigator';

interface IProps extends IFilterCustomerState {
  setGroups: typeof setGroups;
}

class NKHView extends React.Component<IProps, any> {
  modalNKH: ModalNKH | any;
  render() {
    const {groups} = this.props;
    return (
      <MyView style={FilterCustomerStyle.container}>
        <MyButton
          style={[
            FilterCustomerStyle.myviewDM,
            {
              backgroundColor: COLOR.BG.WHITE,
              ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
            }
          ]}
          onPress={() => {
            // this.modalNKH?.showModal();
            MyNavigator.pushModal('ModalNKH', {
              checkGroup: groups?.name,
              valueModal: (text: string, index: number) => {
                this.props.setGroups({id: index, name: text});
              },
              type: 'customer'
            });
          }}>
          <MyView style={FilterCustomerStyle.mycontentViewDM} transparent>
            {groups && groups?.name && groups?.name?.length > 0 ? (
              <MyButton
                onPress={() => this.props.setGroups(null)}
                style={[FilterCustomerStyle.myButtonCreator, {backgroundColor: COLOR.TEXT.BLUE}]}>
                <MyText
                  myFontStyle="Regular"
                  style={[FilterCustomerStyle.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                  {groups?.name}
                </MyText>
              </MyButton>
            ) : (
              <MyView style={FilterCustomerStyle.btnLH}>
                <MyText myFontStyle="Regular" style={FilterCustomerStyle.myTextSize}>
                  Tất cả
                </MyText>
              </MyView>
            )}
          </MyView>
          <MyIcon
            style={FilterCustomerStyle.myIconDM}
            iconFontType="AntDesign"
            name={'right'}
            size={22}
          />
        </MyButton>
        {/* <ModalNKH
          ref={node => {
            this.modalNKH = node;
          }}
          checkGroup={groups?.name}
          valueModal={(text, index) => {
            this.props.setGroups({id: index, name: text});
          }}
        /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {groups} = state.CustomerReducer;
  return {groups};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setGroups}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NKHView);
