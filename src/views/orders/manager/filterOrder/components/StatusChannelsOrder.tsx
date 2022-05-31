import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {ARR_KENH_BAN} from 'configs/FilterConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {IOrderState, setChannelsOrder} from '../../redux';

interface IProps extends Partial<IOrderState> {
  setChannelsOrder: typeof setChannelsOrder;
}

interface IState {}

class StatusChannelsOrder extends Component<IProps, IState> {
  onPressChannels = (item: any) => {
    const {channels} = this.props;
    if (channels === item.id) {
      this.props.setChannelsOrder(null);
    } else {
      this.props.setChannelsOrder(item.id);
    }
  };

  render() {
    const {channels} = this.props;
    return (
      <MyView transparent>
        {/* Loai thu chi */}
        <MyText style={styles.titleContainer}>Kênh bán</MyText>
        {ARR_KENH_BAN.map((v: any, index: number) => {
          let isSelected = v.id === channels;
          return (
            <MyView key={index}>
              <MyButton style={styles.content} onPress={() => this.onPressChannels(v)}>
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
  let {channels} = state.OrderReducer;
  return {channels};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setChannelsOrder
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  StatusChannelsOrder
);
