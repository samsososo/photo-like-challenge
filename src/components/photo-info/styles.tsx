import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  infoContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
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
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
