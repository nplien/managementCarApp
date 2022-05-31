import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IFilterDeliveryState,
  setIsChuyenDi,
  setIsNhapVe,
  setStoreChuyenDi,
  setStoreNhapVe
} from '../redux';
import ChiNhanhModal from './ChiNhanhModal';

interface IProps extends IFilterDeliveryState {
  setIsChuyenDi: typeof setIsChuyenDi;
  setIsNhapVe: typeof setIsNhapVe;
  setStoreChuyenDi: typeof setStoreChuyenDi;
  setStoreNhapVe: typeof setStoreNhapVe;
}

class ChiNhanh extends Component<IProps> {
  ChiNhanhModalRef: any = React.createRef();
  onChuyenDi = () => {
    this.props.setIsChuyenDi(!this.props.isChuyenDi);
  };

  onNhapVe = () => {
    this.props.setIsNhapVe(!this.props.isNhapVe);
  };

  render() {
    let {isNhapVe, isChuyenDi, arrStoreChuyenDi, arrStoreNhapVe} = this.props;
    let strChuyenDi = 'Tới chi nhánh';
    let strNhapVe = 'Từ chi nhánh';
    if (arrStoreChuyenDi) {
      strChuyenDi = arrStoreChuyenDi.map((v: any) => v.name).join(', ');
    }

    if (arrStoreNhapVe) {
      strNhapVe = arrStoreNhapVe.map((v: any) => v.name).join(', ');
    }

    return (
      <MyView>
        <MyView
          style={{
            flexDirection: 'row',
            ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
          }}>
          <MyButton
            onPress={() => this.onChuyenDi()}
            style={{flexDirection: 'row', flex: 4, alignItems: 'center'}}>
            <MyIcon
              name={isChuyenDi ? 'checkbox-marked' : 'checkbox-blank-outline'}
              iconFontType="MaterialCommunityIcons"
              size={24}
              color={isChuyenDi ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}
            />
            <MyText style={{...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)}}>
              {'Chuyển đi'}
            </MyText>
          </MyButton>

          <MyButton
            onPress={() => {
              this.ChiNhanhModalRef?.current?.onShow(true, false);
            }}
            style={{flexDirection: 'row', flex: 6, alignItems: 'center'}}>
            <MyText style={{flex: 1}} myFontStyle="Regular">
              {strChuyenDi}
            </MyText>
            <MyIcon
              name="keyboard-arrow-right"
              iconFontType="MaterialIcons"
              size={24}
              color={COLOR.TEXT.BLACK}
            />
          </MyButton>
        </MyView>
        <ItemLineIndicator />
        <MyView
          style={{
            flexDirection: 'row',
            ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16)
          }}>
          <MyButton
            onPress={() => this.onNhapVe()}
            style={{flexDirection: 'row', flex: 4, alignItems: 'center'}}>
            <MyIcon
              name={isNhapVe ? 'checkbox-marked' : 'checkbox-blank-outline'}
              iconFontType="MaterialCommunityIcons"
              size={24}
              color={isNhapVe ? COLOR.TEXT.GREEN : COLOR.TEXT.BLACK}
            />
            <MyText style={{...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8)}}>
              {'Nhập về'}
            </MyText>
          </MyButton>

          <MyButton
            onPress={() => {
              this.ChiNhanhModalRef?.current?.onShow(false, true);
            }}
            style={{flexDirection: 'row', flex: 6, alignItems: 'center'}}>
            <MyText style={{flex: 1}} myFontStyle="Regular">
              {strNhapVe}
            </MyText>

            <MyIcon
              name="keyboard-arrow-right"
              iconFontType="MaterialIcons"
              size={24}
              color={COLOR.TEXT.BLACK}
            />
          </MyButton>
        </MyView>
        <ChiNhanhModal ref={this.ChiNhanhModalRef} />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {isChuyenDi, isNhapVe, arrStoreChuyenDi, arrStoreNhapVe} = state.FilterDeliveryReducer;
  return {isChuyenDi, isNhapVe, arrStoreChuyenDi, arrStoreNhapVe};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {setIsChuyenDi, setIsNhapVe, setStoreChuyenDi, setStoreNhapVe},
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ChiNhanh);
