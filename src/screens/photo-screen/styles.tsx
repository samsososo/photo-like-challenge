import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noMoreFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noMoreText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  offlineFooter: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  offlineText: {
    fontSize: 14,
    color: '#92400e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  cacheInfoText: {
    fontSize: 12,
    color: '#a16207',
    textAlign: 'center',
  },
  errorFooter: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  errorSubtext: {
    fontSize: 12,
    color: '#b91c1c',
    textAlign: 'center',
  },
});
