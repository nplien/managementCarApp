import React, {PureComponent} from 'react';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ICreatePSCState, setIsManySelectedPSC} from 'views/createPSC/redux';
import {BHSelected} from 'views/banhang/ProductBanHang/styles/ProductHangHoa.Style';

interface IProps extends ICreatePSCState {
  setIsManySelectedPSC: typeof setIsManySelectedPSC;
  huySelectedMany: () => void;
}

class HeaderSelectedPhuTung extends PureComponent<IProps> {
  checkChooseMany = () => {
    const {isSelectedManyPSC} = this.props;
    this.props.setIsManySelectedPSC(!isSelectedManyPSC);
    if (isSelectedManyPSC) {
      this.props.huySelectedMany();
    }
  };

  render() {
    const {isSelectedManyPSC} = this.props;

    return (
      <MyView style={BHSelected.container}>
        <MyButton style={BHSelected.btnSelected} transparent onPress={this.checkChooseMany}>
          <MyIcon
            name={isSelectedManyPSC ? 'checkbox-marked' : 'checkbox-blank-outline'}
            color={COLOR.TEXT.GREEN}
            iconFontType="MaterialCommunityIcons"
            size={20}
          />
          <MyText style={BHSelected.txtSearch} myFontStyle="Regular">
            Chọn nhiều
          </MyText>
        </MyButton>
      </MyView>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSelectedPhuTung);
