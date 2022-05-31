import {MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';

import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {IProductHangHoaState} from '../redux';
import {CategoryStyle} from '../styles/ProductHangHoa.Style';
import Utilities from 'utils/Utilities';
import {COLOR} from 'bases/styles/Core';

interface IProps extends IProductHangHoaState {}

class CountHangHoa extends PureComponent<IProps> {
  render() {
    const {count, tong_ton_kho} = this.props;
    return (
      <MyView style={[CategoryStyle.myViewTop2, {flexDirection: 'row', alignItems: 'center'}]}>
        <MyText
          style={[
            CategoryStyle.textSum,
            {
              color: COLOR.TEXT.BLUE
            }
          ]}
          myFontStyle="700"
          numberOfLines={1}>
          {Utilities.convertCount(count)}
        </MyText>
        <MyText style={{}} myFontStyle="Medium" numberOfLines={1}>
          {' hàng hóa - '}
        </MyText>
        <MyText style={{}} myFontStyle="Medium" numberOfLines={1}>
          {'Tổng tồn '}
        </MyText>
        <MyText style={{color: COLOR.TEXT.BLUE}} myFontStyle="700" numberOfLines={1}>
          {Utilities.convertCount(tong_ton_kho)}
        </MyText>
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {count, tong_ton_kho} = state.ProductHangHoaReducer;
  return {count, tong_ton_kho};
};

export default connect(mapStateToProps, null)(CountHangHoa);
