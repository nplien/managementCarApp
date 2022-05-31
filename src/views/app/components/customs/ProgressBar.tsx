import {MyView} from 'bases/components';
import {COLOR} from 'bases/styles/Core';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Utilities from 'utils/Utilities';

interface IProps {}
interface IState {
  progress: number;
}
export default class ProgressBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      progress: 0
    };
  }
  setProgress = (progress: number) => {
    this.setState({progress: this.state.progress >= 1 ? 2 : progress});
  };
  render() {
    const isShow = Utilities.isAndroid() ? this.state.progress <= 1 : this.state.progress < 1;
    return (
      isShow && (
        <MyView style={styles.viewLoading}>
          <MyView
            style={{
              ...styles.viewLoading,
              width: `${this.state.progress * 100}%`,
              backgroundColor: 'blue'
            }}
          />
        </MyView>
      )
    );
  }
}
const styles = StyleSheet.create({
  viewLoading: {
    height: 3,
    backgroundColor: COLOR.BG.WHITE
  }
});
