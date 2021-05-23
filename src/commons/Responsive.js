import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

//Base design width and height.
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 592;

// sizeScale based on actual design size
export const sizeScale = (size) => Math.round((width / guidelineBaseWidth) * size);
// sizeHeight calc height scale by base height
export const sizeHeight = (size) => Math.round((height / guidelineBaseHeight) * size);

// sizeWidth calc width scale by base width and percentage of factor, default is 0.5
export const sizeWidth = (size, factor = 0.5) =>
  Math.round(size + (sizeScale(size) - size) * factor);
export const sizeFont = (size) => size * PixelRatio.getFontScale();
