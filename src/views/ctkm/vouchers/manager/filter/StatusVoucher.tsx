import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {VOUCHER_LIST} from 'configs/StatusConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IVoucherState, setActive} from '../redux';

interface IProps extends Partial<IVoucherState> {
  setActive: typeof setActive;
}

interface IState {
  arrStatus?: any;
}

class StatusOrder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      arrStatus: VOUCHER_LIST
    };
  }

  onPress = (item: any) => {
    this.props.setActive(item.id);
  };

  render() {
    let {arrStatus} = this.state;
    const {status} = this.props;
    return (
      <MyView>
        {arrStatus.map((v: any, index: number) => {
          let isSelected = v.id === status;
          return (
            <MyView key={index}>
              <MyButton style={styles.content} onPress={() => this.onPress(v)}>
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
  }
});

const mapStateToProps = (state: RootState) => {
  let {status} = state.VoucherReducer;
  return {status};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setActive
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(StatusOrder);
