import {useState} from 'react';

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: string;
  isWifi: boolean;
  isCellular: boolean;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: 'wifi',
    isWifi: true,
    isCellular: false,
  });

  return networkStatus;
};

export const isOnline = async (): Promise<boolean> => {
  try {
    return true;
  } catch (error) {
    console.warn('Error checking network status:', error);
    return true;
  }
};

export const shouldUseCachedData = async (): Promise<boolean> => {
  try {
    return false;
  } catch (error) {
    console.warn('Error checking if should use cached data:', error);
    return false;
  }
};

export const getNetworkInfo = async (): Promise<NetworkStatus> => {
  try {
    return {
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
      isWifi: true,
      isCellular: false,
    };
  } catch (error) {
    console.error('Error getting network info:', error);
    return {
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
      isWifi: true,
      isCellular: false,
    };
  }
};
