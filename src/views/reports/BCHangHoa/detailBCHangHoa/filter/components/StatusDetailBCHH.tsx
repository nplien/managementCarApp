import {MyView, MyText, MyButton, MyIcon} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {ARR_TON_KHO_BC, HIEN_THI} from 'configs/FilterConfig';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IDetailBCHHState, setStatusDetailBCHH, setStockDetailBCHH} from '../../redux';

interface IProps extends Partial<IDetailBCHHState> {
  setStatusDetailBCHH: typeof setStatusDetailBCHH;
  setStockDetailBCHH: typeof setStockDetailBCHH;
}

interface IState {}

class StatusDetailBCHH extends PureComponent<IProps, IState> {
  onPressStock = (item: any) => {
    const {stock} = this.props;
    if (stock === item.id) {
      this.props.setStockDetailBCHH(null);
    } else {
      this.props.setStockDetailBCHH(item.id);
    }
  };
  onPressStatus = (item: any) => {
    const {statuses} = this.props;
    if (statuses === item.value) {
      this.props.setStatusDetailBCHH(null);
    } else {
      this.props.setStatusDetailBCHH(item.value);
    }
  };

  render() {
    const {stock, statuses} = this.props;
    return (
      <MyView>
        {/* Loai thu chi */}
        <MyText style={styles.titleContainer}>Tồn kho</MyText>
        {ARR_TON_KHO_BC.map((v: any, index: number) => {
          let isSelected = v.id === stock;
          return (
            <MyView key={index}>
              <MyButton style={styles.content} onPress={() => this.onPressStock(v)}>
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
        {/* Loai thu chi */}
        <MyText style={styles.titleContainer}>Trạng thái</MyText>
        {HIEN_THI.map((v: any, index: number) => {
          let isSelected = v.value === statuses;
          return (
            <MyView key={index}>
              <MyButton style={styles.content} onPress={() => this.onPressStatus(v)}>
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
    ...setPadding(MY_SIZE.s_12, MY_SIZE.s_12, MY_SIZE.s_16, MY_SIZE.s_16)
  }
});

const mapStateToProps = (state: RootState) => {
  let {stock, statuses} = state.DetailBCHHReducer;
  return {stock, statuses};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setStatusDetailBCHH,
      setStockDetailBCHH
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusDetailBCHH);
