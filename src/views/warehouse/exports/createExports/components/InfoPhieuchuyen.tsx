import * as React from 'react';

import {connect} from 'react-redux';
import {MyView, MyText, MyInput} from 'bases/components';
import {InfoPhieuChuyenStyle} from '../styles/createExport.styles';
import Utilities from 'utils/Utilities';
import {RootState} from 'views/app/redux/App.Reducer';
import {IPersonalState} from 'views/personals/redux';
import {bindActionCreators} from 'redux';
import {setNote, ICreateExportState} from '../redux';

interface IProps extends IPersonalState, ICreateExportState {
  setNote: typeof setNote;
}

class InfoPhieuChuyen extends React.Component<IProps, any> {
  textInputNote: any;
  render() {
    const date = Date.now();
    const {infoPersonal, notePhieuChuyen} = this.props;
    return (
      <MyView style={InfoPhieuChuyenStyle.container}>
        {/* <MyView style={InfoPhieuChuyenStyle.containerChildADD}>
          <MyText style={InfoPhieuChuyenStyle.textPhoneAdd}>Mã phiếu</MyText>
          <MyView style={[InfoPhieuChuyenStyle.viewInputPhoneAdd, InfoPhieuChuyenStyle.bottomView]}>
            <MyInput
              returnKeyType="next"
              onSubmitEditing={() => {
                this.textInputNote.focus();
              }}
              editable={false}
              placeholder={'Mã phiếu tự động'}
            />
          </MyView>
        </MyView> */}
        <MyView style={InfoPhieuChuyenStyle.containerChildADD}>
          <MyText style={InfoPhieuChuyenStyle.textPhoneAdd}>Người tạo</MyText>
          <MyView style={InfoPhieuChuyenStyle.viewInputPhoneAdd}>
            <MyText style={InfoPhieuChuyenStyle.myText}>{infoPersonal?.name}</MyText>
          </MyView>
        </MyView>
        <MyView style={InfoPhieuChuyenStyle.containerChildADD}>
          <MyText style={InfoPhieuChuyenStyle.textPhoneAdd}>Ngày chuyển</MyText>
          <MyView style={InfoPhieuChuyenStyle.viewInputPhoneAdd}>
            <MyText style={InfoPhieuChuyenStyle.myText}>
              {Utilities.convertTimeByFormat(date, 'MM/DD/YYYY - HH:mm')}
            </MyText>
          </MyView>
        </MyView>
        <MyInput
          inputRef={input => {
            this.textInputNote = input;
          }}
          onChangeText={v => {
            this.props.setNote(v);
          }}
          value={notePhieuChuyen}
          style={InfoPhieuChuyenStyle.inputNoteAdd}
          placeholder="Nhập ghi chú"
        />
      </MyView>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {infoPersonal} = state.PersonalReducer;
  const {notePhieuChuyen} = state.CreateExportReducer;
  return {infoPersonal, notePhieuChuyen};
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({setNote}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoPhieuChuyen);
