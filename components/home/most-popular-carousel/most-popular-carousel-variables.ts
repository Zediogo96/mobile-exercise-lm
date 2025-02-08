import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const SLIDER_WIDTH = screenWidth;
export const MOST_POPULAR_CAROUSEL_CARD_WIDTH = screenWidth * 0.45;
export const MOST_POPULAR_CAROUSEL_CARD_HEIGHT = screenHeight * 0.25;
