import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  offlineBadge: {
    backgroundColor: '#fef3c7',
    borderColor: '#fde68a',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  offlineStatusText: {
    color: '#92400e',
  },
  headerInfo: {
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  storageStats: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  offlineInfo: {
    fontSize: 13,
    color: '#f59e0b',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  debugButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  debugButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  clearCacheButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 110,
    alignItems: 'center',
  },
  clearCacheButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  refreshButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  offlineRefreshButton: {
    backgroundColor: '#f59e0b',
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  offlineRefreshText: {
    color: '#ffffff',
  },
});
