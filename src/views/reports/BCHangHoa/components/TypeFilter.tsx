import React, {PureComponent} from 'react';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import {changeTypeBCHangHoa, IBCHangHoaState} from '../redux';
import {connect} from 'react-redux';
import {MyButton, MyText, MyIcon, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setRadius} from 'bases/styles/Core';
import {FilterBCHangHoaStyle} from '../styles/BCHangHoa.Styles';
import {TYPE_LOAI_HANG} from 'configs/FilterConfig';

interface IProps extends Partial<IBCHangHoaState> {
  changeTypeBCHangHoa: typeof changeTypeBCHangHoa;
}

class TypeFilter extends PureComponent<IProps> {
  render() {
    const {type} = this.props;
    let _viewContent = [];
    for (let index = 0; index < TYPE_LOAI_HANG.length; index++) {
      const element = TYPE_LOAI_HANG[index];
      let indexElement = -1;
      if (type && type.length > 0) {
        indexElement = type.findIndex((x: any) => x.name === element.name);
      }
      _viewContent.push(
        <MyButton
          key={index}
          onPress={() => {
            this.props.changeTypeBCHangHoa(element);
          }}
          style={FilterBCHangHoaStyle.viewIconCheck}
          transparent>
          <MyIcon
            iconFontType="MaterialCommunityIcons"
            name={indexElement > -1 ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={COLOR.TEXT.POSITIVE_BTN}
          />
          <MyText style={FilterBCHangHoaStyle.textContent}>{element.name}</MyText>
        </MyButton>
      );
    }
    return (
      <MyView
        style={{
          ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16)
        }}>
        {_viewContent}
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {type} = state.BCHangHoaReducer;
  return {type};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeTypeBCHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeFilter);
