import {MyButton, MyIcon, MyText, MyView} from 'bases/components';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {ARR_TT_NHAN_HANG} from 'configs/FilterConfig';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ItemLineIndicator} from 'views/app/components/items';
import {RootState} from 'views/app/redux/App.Reducer';
import {setTTNhanHangExport, IExportOrderState} from '../../redux';

interface IProps extends Partial<IExportOrderState> {
  setTTNhanHangExport: typeof setTTNhanHangExport;
}

interface IState {}

class StatusChannels extends Component<IProps, IState> {
  onPressChannels = (item: any) => {
    this.props.setTTNhanHangExport(item);
  };

  render() {
    const {is_match} = this.props;
    return (
      <MyView>
        {/* Loai thu chi */}
        <MyText style={styles.titleContainer}>TT. Nhận hàng</MyText>
        {ARR_TT_NHAN_HANG.map((v: any, index: number) => {
          let isSelected = v.id === is_match?.id;
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
  let {is_match} = state.ExportOrderReducer;
  return {is_match};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setTTNhanHangExport
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(
  StatusChannels
);
