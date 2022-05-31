import {MyButton, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {BottomViewStyle} from 'views/banhang/createSale/styles/CreateSale.styles';
import {bindActionCreators} from 'redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IProductBanHangState, setSelectedMany} from '../redux';

interface IProps extends IProductBanHangState {
  pressHuyChonNhieu: () => void;
  pressXongChonNhieu: () => void;
  setSelectedMany: typeof setSelectedMany;
}

class BottomManyChoose extends PureComponent<IProps> {
  huyChon = () => {
    this.props.setSelectedMany(false);
    this.props.pressHuyChonNhieu();
  };

  xongChon = () => {
    this.props.pressXongChonNhieu();
  };

  render() {
    const {isSelectMany} = this.props;

    if (isSelectMany) {
      return (
        <MyView>
          <MyView style={BottomViewStyle.viewBtnBottom}>
            <MyButton
              style={[
                BottomViewStyle.btnBottomView,
                {backgroundColor: COLOR.BG.GRAY, borderTopLeftRadius: MY_SIZE.s_16}
              ]}
              onPress={this.huyChon}>
              <MyText myFontStyle="Medium" style={{color: COLOR.TEXT.WHITE}}>
                Huỷ
              </MyText>
            </MyButton>
            <MyButton
              style={[
                BottomViewStyle.btnBottomView,
                {backgroundColor: COLOR.TEXT.GREEN, borderTopRightRadius: MY_SIZE.s_16}
              ]}
              onPress={this.xongChon}>
              <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.WHITE}}>
                Xong
              </MyText>
            </MyButton>
          </MyView>
          <SafeAreaView
            edges={['left', 'bottom', 'right']}
            style={{backgroundColor: COLOR.BG.WHITE}}
          />
        </MyView>
      );
    } else {
      return <MyView />;
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const {isSelectMany} = state.ProductBanHangReducer;
  return {
    isSelectMany
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setSelectedMany}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomManyChoose);
