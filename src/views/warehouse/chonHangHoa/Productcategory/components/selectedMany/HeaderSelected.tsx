import React, {PureComponent} from 'react';
import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import {BHSelected} from '../../styles/BanHang.style';
import {IHeaderSelectedState, setSelectedMany} from './redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

interface IProps extends IHeaderSelectedState {
  setSelectedMany: typeof setSelectedMany;
  huySelectedMany: () => void;
}

class HeaderSelected extends PureComponent<IProps> {
  checkChooseMany = () => {
    const {isSelectMany} = this.props;
    this.props.setSelectedMany(!isSelectMany);
    if (isSelectMany) {
      this.props.huySelectedMany();
    }
  };

  render() {
    const {isSelectMany} = this.props;

    return (
      <MyView style={BHSelected.container}>
        <MyButton style={BHSelected.btnSelected} transparent onPress={this.checkChooseMany}>
          <MyIcon
            name={isSelectMany ? 'checkbox-marked' : 'checkbox-blank-outline'}
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
  const {isSelectMany} = state.HeaderSelectedReducer;
  return {
    isSelectMany
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setSelectedMany}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSelected);
