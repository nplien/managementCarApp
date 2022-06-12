import {MyButton, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE} from 'bases/styles/Core';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {BottomViewStyle} from 'views/banhang/createSale/styles/CreateSale.styles';
import {bindActionCreators} from 'redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ICreatePSCState, setIsManySelectedPSC} from 'views/createPSC/redux';

interface IProps extends ICreatePSCState {
  pressHuyChonNhieu: () => void;
  pressXongChonNhieu: () => void;
  setIsManySelectedPSC: typeof setIsManySelectedPSC;
}

class BottomChoosePhuTung extends PureComponent<IProps> {
  huyChon = () => {
    this.props.setIsManySelectedPSC(false);
    this.props.pressHuyChonNhieu();
  };

  xongChon = () => {
    this.props.pressXongChonNhieu();
  };

  render() {
    const {isSelectedManyPSC} = this.props;

    if (isSelectedManyPSC) {
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
  const {isSelectedManyPSC} = state.CreatePSCReducer;
  return {
    isSelectedManyPSC
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setIsManySelectedPSC}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomChoosePhuTung);
