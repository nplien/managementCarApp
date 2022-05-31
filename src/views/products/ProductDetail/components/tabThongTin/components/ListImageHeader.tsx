import React, {PureComponent} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {MyView, MyImage} from 'bases/components';

import Utilities from 'utils/Utilities';
import {IMAGE_SIZE} from 'common/Constants';
import {COLOR, MY_SIZE, setMargin, setPadding, setRadius} from 'bases/styles/Core';

interface IProps {
  images: string[];
}

export default class ListImageHeader extends PureComponent<IProps> {
  renderItem = ({item}: {item: string}) => {
    const source = Utilities.convertLinkImage(item, IMAGE_SIZE.MEDIUM);
    return (
      <MyImage
        source={source}
        width={styles.image.width}
        height={styles.image.height}
        style={styles.image}
      />
    );
  };

  keyExtractor = (_item: string, index: number) => {
    return index.toString();
  };

  renderItemSeparatorComponent = () => {
    return <MyView style={styles.itemSeparator} />;
  };

  renderListEmptyComponent = () => {
    return <MyView />;
  };

  render() {
    const {images} = this.props;

    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.contentList}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        data={images}
        extraData={images}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        ListEmptyComponent={this.renderListEmptyComponent}
      />
    );
  }
}
const styles = StyleSheet.create({
  list: {
    backgroundColor: COLOR.BG.SECONDARY,
    flex: 1
  },
  contentList: {
    ...setPadding(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_16, MY_SIZE.s_16)
  },
  itemSeparator: {
    width: MY_SIZE.s_16,
    backgroundColor: COLOR.BG.SECONDARY
  },
  image: {
    width: MY_SIZE.s_88,
    height: MY_SIZE.s_88,
    ...setRadius(MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0, MY_SIZE.s_0),
    ...setMargin(MY_SIZE.s_16, MY_SIZE.s_16, MY_SIZE.s_0, MY_SIZE.s_0)
  }
});
