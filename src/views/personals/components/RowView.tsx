import {MyText, MyView} from 'bases/components';
import React, {PureComponent} from 'react';
import {personStyles} from '../styles/Person.styles';

interface IRowViewProps {
  name?: string;
  content?: string | any;
}

export default class RowView extends PureComponent<IRowViewProps> {
  render() {
    const {name, content} = this.props;
    return (
      <MyView style={personStyles.myViewDad}>
        <MyView style={personStyles.myViewChild1}>
          <MyText style={personStyles.myTextHeader}>{name}</MyText>
        </MyView>
        <MyView style={personStyles.myViewChild2}>
          <MyText style={[personStyles.myTextHeader, personStyles.myTextow]}>{content}</MyText>
        </MyView>
      </MyView>
    );
  }
}
