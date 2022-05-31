import {MyText, MyView, MyInput} from 'bases/components';
import React from 'react';
import {taoVoucherStyles} from './styles/TaoVoucher.Styles';
import {ScrollView} from 'react-native';
import DateStartVoucher from './components/DateStartVoucher';
import DateEndVoucher from './components/DateEndVoucher';
import PromotionalValue from './components/PromotionalValue';
import {IRequestPostVoucher, VoucherAPI} from 'services/Voucher.Api';
import ButtonToolbarRouter from 'bases/components/button/ButtonToolbarRouter';
import {COLOR} from 'bases/styles/Core';
import Utilities from 'utils/Utilities';
import MyNavigator from 'utils/MyNavigator';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getListVoucher} from '../vouchers/manager/redux';
import OpenWeb from './components/OpenWeb';
import IsSelectMany from './components/IsSelectMany';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'TaoVoucher'> & {
  getListVoucher: typeof getListVoucher;
};
interface IAppState {}
class TaoVoucher extends React.Component<IProps, IAppState> {
  refInputMCT: any = React.createRef();
  dateRef: any = React.createRef();
  mapTaoVoucher: IRequestPostVoucher;

  constructor(props: any) {
    super(props);
    this.mapTaoVoucher = {};
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <ButtonToolbarRouter
          isShowBtnLeft={false}
          isShowBtnRight
          iconRightFontType="MaterialCommunityIcons"
          iconRightProps={{name: 'content-save', size: 24, color: COLOR.TEXT.BLACK}}
          onPressRight={() => {
            this.FnAddVoucher();
          }}
        />
      )
    });
  }
  onChangeValue = (key: keyof IRequestPostVoucher, value: any) => {
    this.mapTaoVoucher[key] = value;
  };
  FnAddVoucher = async () => {
    try {
      Utilities.showHideRootLoading(true, '');
      const response = await VoucherAPI.postVouchers(this.mapTaoVoucher);
      if (response && !response?.code) {
        Utilities.showHideRootLoading(false, '');
        Utilities.showToast(response?.message, '', 'success');
        this.props.getListVoucher();
        MyNavigator.goBack();
      } else {
        Utilities.showToast(response?.message, '', 'danger');
        Utilities.showHideRootLoading(false, '');
      }
    } catch (error) {
      Utilities.showHideRootLoading(false, '');
      Utilities.showToast('Tải lên nội dung thất bại!', '', 'danger');
      Utilities.logException('TaoVoucher', error);
    }
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={taoVoucherStyles.container}>
        <MyView style={taoVoucherStyles.containerChild}>
          <MyText style={taoVoucherStyles.textAdd}>Mã chương trình</MyText>
          <MyView style={taoVoucherStyles.viewInputAdd}>
            <MyInput
              inputRef={this.refInputMCT}
              placeholder={'Mã chương trình'}
              onChangeText={v => {
                this.onChangeValue('id', v);
              }}
              returnKeyType="done"
            />
          </MyView>
        </MyView>
        <MyView style={taoVoucherStyles.containerChild}>
          <MyText style={taoVoucherStyles.textAdd}>Tên chương trình</MyText>
          <MyView style={taoVoucherStyles.viewInputAdd}>
            <MyInput
              inputRef={this.refInputMCT}
              placeholder={'Tên chương trình'}
              onChangeText={v => {
                this.onChangeValue('name', v);
              }}
              returnKeyType="done"
            />
          </MyView>
        </MyView>
        <MyView style={taoVoucherStyles.containerChild}>
          <MyText style={taoVoucherStyles.textAdd}>Ghi chú</MyText>
          <MyView style={taoVoucherStyles.viewInputAdd}>
            <MyInput
              inputRef={this.refInputMCT}
              onChangeText={v => {
                this.onChangeValue('description', v);
              }}
              placeholder={'Ghi chú'}
              returnKeyType="done"
            />
          </MyView>
        </MyView>
        <DateStartVoucher
          changeDate={v => {
            this.onChangeValue('apply_started_at', v);
          }}
        />
        <DateEndVoucher
          changeDate={v => {
            this.onChangeValue('apply_expired_at', v);
          }}
        />
        <PromotionalValue
          onChangeType={type => {
            this.onChangeValue('discount_type', type);
          }}
          onChangeValue={v => {
            this.onChangeValue('discount_value', v);
          }}
        />
        <OpenWeb
          onChangeSelect={v => {
            this.onChangeValue('is_public', v);
          }}
        />
        <IsSelectMany
          onChangeSelect={v => {
            this.onChangeValue('is_multiple', v);
          }}
        />
      </ScrollView>
    );
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getListVoucher
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(TaoVoucher);
