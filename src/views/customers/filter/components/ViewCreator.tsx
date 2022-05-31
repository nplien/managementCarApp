import * as React from 'react';
import {connect} from 'react-redux';
import {FilterCustomerStyle} from '../styles/FilterCustomer.style';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {setCreatedBy, IFilterCustomerState} from 'views/customers/manager/redux';
import ModalCreator from './ModalCreator';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import MyNavigator from 'utils/MyNavigator';
interface IProps extends IFilterCustomerState {
  setCreatedBy: typeof setCreatedBy;
}
class ViewCreator extends React.Component<IProps, any> {
  modalCreator: ModalCreator | any;
  render() {
    const {created_by} = this.props;
    return (
      <MyView>
        <MyButton
          style={[
            FilterCustomerStyle.myviewDM,
            {
              backgroundColor: COLOR.BG.WHITE,
              ...setRadius(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_12)
            }
          ]}
          onPress={() => {
            MyNavigator.pushModal('ModalCreator', {
              checkCreator: created_by && created_by.name ? created_by.name : '',
              valueModal: (text: any) => {
                this.props.setCreatedBy(text);
              }
            });
          }}>
          <MyView style={FilterCustomerStyle.mycontentViewDM} transparent>
            {created_by ? (
              <MyButton
                onPress={() => this.props.setCreatedBy(null)}
                style={[FilterCustomerStyle.myButtonCreator, {backgroundColor: COLOR.TEXT.BLUE}]}>
                <MyText
                  myFontStyle="Regular"
                  style={[FilterCustomerStyle.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                  {created_by?.name || ''}
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
        {/* <ModalCreator
          ref={node => {
            this.modalCreator = node;
          }}
          checkCreator={created_by}
          valueModal={text => {
            this.props.setCreatedBy(text);
          }}
        /> */}
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {created_by} = state.CustomerReducer;
  return {created_by};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCreatedBy}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCreator);
