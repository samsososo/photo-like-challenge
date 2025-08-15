import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const cardWidth = screenWidth - 32;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: cardWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  skeleton: {
    width: cardWidth,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  skeletonShimmer: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    opacity: 0.7,
  },
  errorContainer: {
    width: cardWidth,
    backgroundColor: '#fef2f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '600',
  },
  doubleTapHeart: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -40}, {translateY: -40}],
    zIndex: 10,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    letterSpacing: -0.3,
  },
  likeButton: {
    padding: 12,
    borderRadius: 24,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  likedButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    shadowColor: '#dc2626',
    shadowOpacity: 0.2,
  },
  likeText: {
    fontSize: 16,
  },
  likedText: {
    color: '#dc2626',
  },
  dimensions: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
  },
  id: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  debugInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 8,
  },
  debugText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
