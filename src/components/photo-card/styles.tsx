import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const cardWidth = screenWidth - 32;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: cardWidth,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 20,
  },
  author: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  dimensions: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  id: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
