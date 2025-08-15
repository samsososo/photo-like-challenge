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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: cardWidth,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  doubleTapHeart: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -40}, {translateY: -40}],
    zIndex: 10,
  },
  infoContainer: {
    padding: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  likeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  likedButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
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
