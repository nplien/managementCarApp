/**
 * Color
 * @public
 */
const COLOR = {
  BG: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#F2F2F2',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    BLACK_10: 'rgba(0,0,0,0.1)',
    BLACK_30: 'rgba(0,0,0,0.3)',
    BLACK_TOOLBAR: '#262A2E',
    RED: '#FF4646',
    PINK: '#FFE2E2',
    GRAY: '#707070',
    LIGHT_GRAY: '#EEEEEE'
  },
  TEXT: {
    PRIMARY: '#000000',
    SECONDARY: '#B4B4B4',
    GRAY: '#707070',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    DA_CAM: '#FF8B36',
    VANG_CAM: '#F29423',
    RED: '#FF4646',
    BLUE: '#3383F0',
    GREEN: '#0ABC3A',
    POSITIVE_BTN: '#007ff9',
    NEGATIVE_BTN: '#ff3b30'
  },
  TAB: {
    RED: '#FF4646',
    INACTIVE: '#CFCFCF'
  },
  BUTTON: {
    RED: '#FF4646',
    WHITE: '#FFFFFF'
  },
  SWITCH: {
    PLACEHOLDER: '#CCCCCC',
    GREEN: '#0ABC3A',
    GREEN_LIGHT: '#aed581'
  }
};

export type TYPE_OF_FONT = 'Regular' | 'Medium' | 'Bold';

/**
 * Font family
 * @public
 */
const FONT_FAMILY = {
  Bold: 'Roboto-Bold',
  Medium: 'Roboto-Medium',
  Regular: 'Roboto-Regular'
};

/**
 * Font size, margin, padding, width, height, radius
 * @public
 */
const MY_SIZE = {
  s_0: 0,
  s_1: 1,
  s_2: 2,
  s_4: 4,
  s_5: 5,
  s_6: 6,
  s_8: 8,
  s_10: 10,
  s_12: 12,
  s_14: 14,
  s_15: 15,
  s_16: 16,
  s_18: 18,
  s_20: 20,
  s_22: 20,
  s_24: 24,
  s_26: 24,
  s_29: 29,
  s_30: 30,
  s_32: 32,
  s_34: 34,
  s_38: 38,
  s_40: 40,
  s_46: 46,
  s_48: 48,
  s_50: 50,
  s_52: 52,
  s_56: 56,
  s_60: 60,
  s_64: 64,
  s_70: 70,
  s_75: 75,
  s_88: 88,
  s_135: 135,
  s_140: 140,
  s_174: 174,
  s_213: 213,
  s_248: 248,
  s_250: 250,
  s_255: 255
};

export const setPosition = (top = 0, bottom = 0, left = 0, right = 0) => {
  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  };
};

export const setMargin = (top = 0, bottom = 0, left = 0, right = 0) => {
  return {
    marginTop: top,
    marginBottom: bottom,
    marginLeft: left,
    marginRight: right
  };
};

export const setPadding = (top = 0, bottom = 0, left = 0, right = 0) => {
  return {
    paddingTop: top,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingRight: right
  };
};

export const setRadius = (topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0) => {
  return {
    borderTopLeftRadius: topLeft,
    borderTopStartRadius: topLeft,

    borderTopRightRadius: topRight,
    borderTopEndRadius: topRight,

    borderBottomLeftRadius: bottomLeft,
    borderBottomStartRadius: bottomLeft,

    borderBottomRightRadius: bottomRight,
    borderBottomEndRadius: bottomRight
  };
};

export const ArrayColor = [
  '#1e90ff',
  '#9acd32',
  '#ffd700',
  '#dc143c',
  '#9932cc',
  '#008b8b',
  '#483d8b',
  '#ff8c00',
  '#ee82ee',
  '#a52a2a',
  '#deb887',
  '#6a5acd',
  '#5f9ea0',
  '#e9967a',
  '#6495ed',
  '#f0f8ff',
  '#0000ff',
  '#8a2be2',
  '#00ffff',
  '#00008b',
  '#00bfff',
  '#faebd7',
  '#00ffff',
  '#7fffd4',
  '#f0ffff',
  '#f5f5dc',
  '#ffe4c4',
  '#000000',
  '#ffebcd',
  '#b8860b',
  '#a9a9a9',
  '#006400',
  '#bdb76b',
  '#8b008b',
  '#8fbc8f',
  '#2f4f4f',
  '#00ced1',
  '#9400d3',
  '#ff1493',
  '#696969',
  '#b22222',
  '#fffaf0',
  '#228b22',
  '#ff00ff',
  '#dcdcdc',
  '#f8f8ff',
  '#daa520',
  '#808080',
  '#008000',
  '#adff2f',
  '#808080',
  '#f0fff0',
  '#ff69b4',
  '#cd5c5c',
  '#4b0082',
  '#fffff0',
  '#f0e68c',
  '#e6e6fa',
  '#7fff00',
  '#d2691e',
  '#ff7f50',
  '#556b2f',
  '#8b0000',
  '#fff0f5',
  '#7cfc00',
  '#fffacd',
  '#add8e6',
  '#f08080',
  '#e0ffff',
  '#fafad2',
  '#d3d3d3',
  '#90ee90',
  '#d3d3d3',
  '#ffb6c1',
  '#ffa07a',
  '#20b2aa',
  '#87cefa',
  '#778899',
  '#b0c4de',
  '#ffffe0',
  '#00ff00',
  '#32cd32',
  '#faf0e6',
  '#ff00ff',
  '#800000',
  '#66cdaa',
  '#0000cd',
  '#ba55d3',
  '#9370db',
  '#3cb371',
  '#7b68ee',
  '#00fa9a',
  '#48d1cc',
  '#c71585',
  '#191970',
  '#f5fffa',
  '#ffe4e1',
  '#ffe4b5',
  '#ffdead',
  '#000080',
  '#fdf5e6',
  '#808000',
  '#6b8e23',
  '#ffa500',
  '#ff4500',
  '#da70d6',
  '#eee8aa',
  '#98fb98',
  '#afeeee',
  '#db7093',
  '#ffefd5',
  '#ffdab9',
  '#cd853f',
  '#ffc0cb',
  '#dda0dd',
  '#b0e0e6',
  '#800080',
  '#663399',
  '#ff0000',
  '#bc8f8f',
  '#4169e1',
  '#8b4513',
  '#fa8072',
  '#f4a460',
  '#2e8b57',
  '#fff5ee',
  '#a0522d',
  '#c0c0c0',
  '#87ceeb',
  '#708090',
  '#fffafa',
  '#00ff7f',
  '#4682b4',
  '#d2b48c',
  '#008080',
  '#d8bfd8',
  '#ff6347',
  '#40e0d0',
  '#fff8dc',
  '#f5deb3',
  '#ffffff',
  '#f5f5f5',
  '#ffff00'
];

export {COLOR, FONT_FAMILY, MY_SIZE};
