import React, {FunctionComponent} from 'react';
import {View, FlatList, Text} from 'react-native';
import {PhotoCard} from '../../components/photo-card/photo-card';
import {styles} from './styles';
import {Photo} from '@/types';

// Mock data
const mockPhotos: Photo[] = [
  {
    id: '0',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    download_url: 'https://picsum.photos/id/0/5000/3333',
  },
  {
    id: '1',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/LNRyGwIJr5c',
    download_url: 'https://picsum.photos/id/1/5000/3333',
  },
  {
    id: '2',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/N7XodRrbzS0',
    download_url: 'https://picsum.photos/id/2/5000/3333',
  },
  {
    id: '3',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/Dl6jeyfihLk',
    download_url: 'https://picsum.photos/id/3/5000/3333',
  },
  {
    id: '4',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/y83Je1OC6Wc',
    download_url: 'https://picsum.photos/id/4/5000/3333',
  },
  {
    id: '5',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3334,
    url: 'https://unsplash.com/photos/LF8gK8-HGSg',
    download_url: 'https://picsum.photos/id/5/5000/3334',
  },
  {
    id: '6',
    author: 'Alejandro Escamilla',
    width: 5000,
    height: 3333,
    url: 'https://unsplash.com/photos/tAKXap853rY',
    download_url: 'https://picsum.photos/id/6/5000/3333',
  },
];

export const PhotosScreen: FunctionComponent = () => {
  const renderItem = ({item}: {item: Photo}) => <PhotoCard photo={item} />;

  const keyExtractor = (item: Photo) => item.id;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photos</Text>
        <Text style={styles.subtitle}>Total: {mockPhotos.length} photos</Text>
      </View>
      <FlatList
        data={mockPhotos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
