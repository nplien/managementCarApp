import * as React from 'react';
import {connect} from 'react-redux';
import {MyView, MyButton, MyText, MyIcon} from 'bases/components';
import {RootState} from 'views/app/redux/App.Reducer';
import {bindActionCreators} from 'redux';
import ModalCreator from './ModalCreatorImport';
import {COLOR, MY_SIZE, setMargin, setPadding} from 'bases/styles/Core';
import {IImportOrderState, setCreatedByIP} from '../../redux';
import {StyleSheet} from 'react-native';
interface IProps extends IImportOrderState {
  setCreatedByIP: typeof setCreatedByIP;
}
class ViewCreator extends React.Component<IProps, any> {
  modalCreator: ModalCreator | any;
  render() {
    const {created_by} = this.props;
    return (
      <MyView>
        <MyButton
          style={[styles.myviewDM]}
          onPress={() => {
            this.modalCreator?.showModal();
          }}>
          <MyView style={styles.mycontentViewDM}>
            {created_by ? (
              <MyButton
                onPress={() => this.props.setCreatedByIP()}
                style={[styles.myButtonCreator, {backgroundColor: COLOR.TEXT.BLUE}]}>
                <MyText
                  myFontStyle="Regular"
                  style={[styles.myTextSize, {color: COLOR.TEXT.WHITE}]}>
                  {created_by?.name || ''}
                </MyText>
              </MyButton>
            ) : (
              <MyView style={styles.btnLH}>
                <MyText myFontStyle="Regular" style={styles.myTextSize}>
                  Tất cả
                </MyText>
              </MyView>
            )}
          </MyView>
          <MyIcon style={styles.myIconDM} iconFontType="AntDesign" name={'right'} size={22} />
        </MyButton>
        <ModalCreator
          ref={node => {
            this.modalCreator = node;
          }}
          checkCreator={created_by?.name}
          valueModal={text => {
            this.props.setCreatedByIP(text);
          }}
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  let {created_by} = state.ImportOrderReducer;
  return {created_by};
};
const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setCreatedByIP}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCreator);

const styles = StyleSheet.create({
  myTextSize: {
    fontSize: MY_SIZE.s_16
  },
  myIconDM: {
    ...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  mycontentViewDM: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_8)
  },
  myviewDM: {
    flexDirection: 'row'
  },
  btnLH: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6,
    backgroundColor: COLOR.TEXT.WHITE
  },
  myButtonCreator: {
    ...setPadding(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_10, MY_SIZE.s_10),
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0),
    borderColor: COLOR.BG.BLACK_10,
    borderWidth: 1,
    borderRadius: MY_SIZE.s_6
  }
});
