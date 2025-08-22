import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import config from '@/config/ui-config.json';

import {styles} from './styles';
import {PhotosScreen} from '@/screens/photo-screen/photos-screen';
import {LikedScreen} from '@/screens/liked-screen/liked-screen';

type Tab = 'photos' | 'liked';

export const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState<Tab>('photos');

  const renderContent = () => {
    switch (activeTab) {
      case 'photos':
        return <PhotosScreen />;
      case 'liked':
        return <LikedScreen />;
      default:
        return <PhotosScreen />;
    }
  };

  const renderTabButton = (tab: Tab, label: string) => {
    const isActive = activeTab === tab;
    
    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tabButton, isActive && styles.activeTabButton]}
        onPress={() => setActiveTab(tab)}>
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.tabBar}>
        {renderTabButton('photos', 'All Photos')}
        {config.likedScreen.enabled && renderTabButton('liked', config.likedScreen.title)}
      </View>
      
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};
