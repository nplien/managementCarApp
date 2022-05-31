import React, {Component} from 'react';
import {MyText, MyView, MyIcon, MyButton} from 'bases/components';
import {COLOR, setMargin} from 'bases/styles/Core';
import {FilterBCHangHoaStyle} from '../styles/BCHangHoa.Styles';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from 'views/app/redux/App.Reducer';
import {
  IBCHangHoaState,
  changeGroupCategory,
  changeCategoryBCHangHoa,
  cleanCategoryBCHangHoa,
  getListBCHangHoa
} from '../redux';
import InputFilter from './InputFilter';
import TypeFilter from './TypeFilter';
import MyNavigator from 'utils/MyNavigator';
import {IAppNavigateProps} from 'views/app';

type IProps = IAppNavigateProps<'FilterBCHangHoa'> &
  IBCHangHoaState & {
    changeGroupCategory: typeof changeGroupCategory;
    changeCategoryBCHangHoa: typeof changeCategoryBCHangHoa;
    cleanCategoryBCHangHoa: typeof cleanCategoryBCHangHoa;
    getListBCHangHoa: typeof getListBCHangHoa;
    navigation?: any;
  };
class FilterBCHangHoa extends Component<IProps> {
  componentDidMount() {
    try {
      this.props.navigation.setOptions({
        headerRight: () => (
          <MyButton
            onPress={() => {
              MyNavigator.goBack();
              this.props.getListBCHangHoa();
            }}
            style={{...setMargin(0, 0, 0, 16)}}>
            <MyText myFontStyle="Bold" style={{color: COLOR.TEXT.BLUE}}>
              Áp dụng
            </MyText>
          </MyButton>
        )
      });
    } catch (error) {}
  }
  render() {
    const {groupCategory, category} = this.props;
    return (
      <MyView style={{flex: 1, backgroundColor: COLOR.BG.SECONDARY}}>
        <MyText style={[FilterBCHangHoaStyle.setMarginText]}>Kiểu hiển thị</MyText>
        <MyView style={FilterBCHangHoaStyle.viewIconCheckOne}>
          <MyIcon
            iconFontType="FontAwesome"
            name="dot-circle-o"
            size={24}
            color={COLOR.TEXT.POSITIVE_BTN}
          />
          <MyText style={FilterBCHangHoaStyle.textContent}>Báo cáo</MyText>
        </MyView>
        <MyButton
          style={FilterBCHangHoaStyle.viewIconCheck}
          onPress={() => {
            this.props.changeGroupCategory();
          }}>
          <MyIcon
            iconFontType="MaterialCommunityIcons"
            name={groupCategory ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={COLOR.TEXT.POSITIVE_BTN}
          />
          <MyText style={FilterBCHangHoaStyle.textContent}>Gộp theo nhóm hàng</MyText>
        </MyButton>
        <MyText style={FilterBCHangHoaStyle.setMarginText}>Hàng hóa</MyText>
        <InputFilter />
        <MyText style={FilterBCHangHoaStyle.setMarginText}>Loại hàng</MyText>
        <TypeFilter />
        <MyText style={FilterBCHangHoaStyle.setMarginText}>Nhóm hàng</MyText>
        <MyButton
          style={FilterBCHangHoaStyle.myViewDM}
          onPress={() => {
            MyNavigator.pushModal('ModalNhomHang', {
              idCheckNhomHang: category?.id || 0,
              onChooseItem: (name: string, id: string) => {
                this.props.changeCategoryBCHangHoa(name, id);
              }
            });
          }}>
          <MyView style={FilterBCHangHoaStyle.myContentViewDM} transparent>
            {category ? (
              <MyButton
                onPress={() => this.props.cleanCategoryBCHangHoa()}
                style={[FilterBCHangHoaStyle.myButtonCreator, {backgroundColor: COLOR.TEXT.BLUE}]}>
                <MyText
                  myFontStyle="Regular"
                  style={[FilterBCHangHoaStyle.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                  {category?.name || ''}
                </MyText>
              </MyButton>
            ) : (
              <MyView
                style={[FilterBCHangHoaStyle.myButtonCreator, {backgroundColor: COLOR.TEXT.WHITE}]}>
                <MyText myFontStyle="Regular" style={FilterBCHangHoaStyle.myTextSize}>
                  Nhóm hàng
                </MyText>
              </MyView>
            )}
          </MyView>
          <MyIcon
            style={FilterBCHangHoaStyle.myIconDM}
            iconFontType="AntDesign"
            name={'right'}
            size={24}
          />
        </MyButton>
      </MyView>
    );
  }
}
const mapStateToProps = (state: RootState) => {
  const {groupCategory, category} = state.BCHangHoaReducer;
  return {groupCategory, category};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      changeGroupCategory,
      changeCategoryBCHangHoa,
      cleanCategoryBCHangHoa,
      getListBCHangHoa
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBCHangHoa);
