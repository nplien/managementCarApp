import * as React from 'react';
import {MyView, MyText, MyIcon, MyButton} from 'bases/components';
import {taoVoucherStyles} from '../styles/TaoVoucher.Styles';
import {COLOR} from 'bases/styles/Core';

interface IProps {
  onChangeSelect: (type: boolean) => void;
}

interface AppState {
  isSelectMany: boolean;
}

export default class OpenWeb extends React.Component<IProps, AppState> {
  state = {
    isSelectMany: false
  };
  public render() {
    const {isSelectMany} = this.state;
    return (
      <MyView style={taoVoucherStyles.containerChild}>
        <MyText style={taoVoucherStyles.textAdd}>Mở trên website</MyText>
        <MyButton
          onPress={() => {
            this.setState(
              {
                isSelectMany: !isSelectMany
              },
              () => {
                this.props.onChangeSelect(!isSelectMany);
              }
            );
          }}
          style={taoVoucherStyles.viewPromotional}>
          <MyIcon
            name={isSelectMany ? 'checkbox-marked' : 'checkbox-blank-outline'}
            color={COLOR.TEXT.GREEN}
            iconFontType="MaterialCommunityIcons"
            size={20}
          />
          <MyView style={{flex: 1}}>
            <MyText style={taoVoucherStyles.textOpenWeb}>
              Hiển thị cho người dùng thương mại điện tử
            </MyText>
          </MyView>
        </MyButton>
      </MyView>
    );
  }
}
