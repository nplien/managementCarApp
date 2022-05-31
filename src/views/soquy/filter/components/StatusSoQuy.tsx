import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';
import {ARR_CHUNG_TU, IChungTu} from 'configs/FilterConfig';
import {SO_QUY_LIST} from 'configs/StatusConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ManagerAPI} from 'services/Manager.Api';
import Utilities from 'utils/Utilities';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IFilterSoQuyState, setStatusSoQuy, setLoaiThuChiSQ, setLoaiChungTuSQ} from '../redux';

interface IProps extends Partial<IFilterSoQuyState> {
  setStatusSoQuy: typeof setStatusSoQuy;
  setLoaiThuChiSQ: typeof setLoaiThuChiSQ;
  setLoaiChungTuSQ: typeof setLoaiChungTuSQ;
}

interface IStates {
  arrLoaiThuChi: IChungTu[];
}

class StatusSoQuy extends Component<IProps, IStates> {
  state = {arrLoaiThuChi: []};

  getListLoaiThuChi = async () => {
    try {
      const response = await ManagerAPI.getListLoaiThuChi({
        skip: 0,
        limit: 100,
        attribute_code: 'payment_type'
      });
      if (response && !response?.code) {
        this.setState({
          arrLoaiThuChi: response.data ? response.data : []
        });
      } else {
        Utilities.showToast(response?.message);
      }
    } catch (error) {
      Utilities.showToast('Tải nội dung thất bại!', '', 'danger');
    }
  };

  componentDidMount() {
    this.getListLoaiThuChi();
  }

  onPressLoaiThuChi = (item: any) => {
    const {groups} = this.props;
    if (groups === item.id) {
      this.props.setLoaiThuChiSQ(undefined);
    } else {
      this.props.setLoaiThuChiSQ(item.id);
    }
  };

  onPress = (item: any) => {
    const {status} = this.props;
    if (status === item.id) {
      this.props.setStatusSoQuy(undefined);
    } else {
      this.props.setStatusSoQuy(item.id);
    }
  };
  onPressLoaiChungTu = (item: any) => {
    const {types} = this.props;
    if (types === item.id) {
      this.props.setLoaiChungTuSQ(undefined);
    } else {
      this.props.setLoaiChungTuSQ(item.id);
    }
  };

  render() {
    const {status, groups, types} = this.props;
    const {arrLoaiThuChi} = this.state;
    return (
      <MyView transparent>
        <MyText style={styles.titleContainer}>Loại Chứng từ</MyText>
        <MyView style={styles.container}>
          {ARR_CHUNG_TU.map((v: any, index: number) => {
            let isSelected = v.id === types;
            return (
              <MyView transparent key={index}>
                <MyButton
                  transparent
                  style={styles.content}
                  onPress={() => this.onPressLoaiChungTu(v)}>
                  <MyText
                    myFontStyle="Regular"
                    style={[
                      styles.text,
                      {
                        color: isSelected ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
                      }
                    ]}>
                    {v.name}
                  </MyText>
                  <MyIcon
                    name="check"
                    iconFontType="AntDesign"
                    size={22}
                    color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
                  />
                </MyButton>
                <ItemLineIndicator />
              </MyView>
            );
          })}
        </MyView>

        <MyText style={styles.titleContainer}>Trạng thái</MyText>
        <MyView style={styles.container}>
          {SO_QUY_LIST.map((v: any, index: number) => {
            let isSelected = v.id === status;
            return (
              <MyView transparent key={index}>
                <MyButton transparent style={styles.content} onPress={() => this.onPress(v)}>
                  <MyText
                    myFontStyle="Regular"
                    style={[
                      styles.text,
                      {
                        color: isSelected ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
                      }
                    ]}>
                    {v.name}
                  </MyText>
                  <MyIcon
                    name="check"
                    iconFontType="AntDesign"
                    size={22}
                    color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
                  />
                </MyButton>
                <ItemLineIndicator />
              </MyView>
            );
          })}
        </MyView>

        {/* Loai thu chi */}
        {arrLoaiThuChi.length > 0 ? (
          <MyText style={styles.titleContainer}>Loại thu chi</MyText>
        ) : null}
        {arrLoaiThuChi.length > 0 ? (
          <MyView style={styles.container}>
            {arrLoaiThuChi.map((v: any, index: number) => {
              let isSelected = v.id === groups;
              return (
                <MyView transparent key={index}>
                  <MyButton
                    transparent
                    style={styles.content}
                    onPress={() => this.onPressLoaiThuChi(v)}>
                    <MyText
                      myFontStyle="Regular"
                      style={[
                        styles.text,
                        {
                          color: isSelected ? COLOR.TEXT.BLACK : COLOR.TEXT.SECONDARY
                        }
                      ]}>
                      {v.name}
                    </MyText>
                    <MyIcon
                      name="check"
                      iconFontType="AntDesign"
                      size={22}
                      color={isSelected ? COLOR.TEXT.BLUE : COLOR.TEXT.WHITE}
                    />
                  </MyButton>
                  <ItemLineIndicator />
                </MyView>
              );
            })}
          </MyView>
        ) : null}
      </MyView>
    );
  }
}

const styles = StyleSheet.create({
  statusText: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderWidth: 1,
    borderColor: COLOR.BG.SECONDARY,
    borderRadius: MY_SIZE.s_6
  },
  viewStatus: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myText: {
    fontSize: MY_SIZE.s_16
  },
  text: {
    flex: 1,
    fontSize: MY_SIZE.s_16
  },
  content: {
    backgroundColor: COLOR.BG.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding(MY_SIZE.s_14, MY_SIZE.s_14, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  titleContainer: {
    backgroundColor: COLOR.BG.SECONDARY,
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_16),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0)
  },
  container: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setRadius(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_16),
    backgroundColor: COLOR.BG.WHITE
  }
});

const mapStateToProps = (state: RootState) => {
  let {status, groups, types} = state.FilterSoQuyReducer;
  return {status, groups, types};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setStatusSoQuy,
      setLoaiThuChiSQ,
      setLoaiChungTuSQ
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(StatusSoQuy);
