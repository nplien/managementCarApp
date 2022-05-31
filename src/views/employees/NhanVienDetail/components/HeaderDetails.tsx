import * as React from 'react';
import {StyleSheet} from 'react-native';
import {MyView, MyText} from 'bases/components';
import {setMargin, COLOR, MY_SIZE} from 'bases/styles/Core';

interface IProps {
  name?: string;
  content?: string | any;
}

export default class HeaderDetails extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {name, content} = this.props;
    return (
      <MyView style={styles.myViewDad}>
        <MyView style={styles.myViewChild1}>
          <MyText style={styles.myText}>{name}</MyText>
        </MyView>
        <MyView style={styles.myViewChild2}>
          <MyText style={[styles.myText, styles.myTextow]}>{content}</MyText>
        </MyView>
      </MyView>
    );
  }
}
const styles = StyleSheet.create({
  myViewDad: {
    flexDirection: 'row',
    ...setMargin(MY_SIZE.s_8, MY_SIZE.s_8, MY_SIZE.s_16, MY_SIZE.s_8)
  },
  myViewChild2: {flex: 3},
  myViewChild1: {flex: 1.5},
  myText: {
    fontSize: MY_SIZE.s_16,
    color: COLOR.BG.BLACK
  },
  myTextow: {...setMargin(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_8, MY_SIZE.s_0)}
});
