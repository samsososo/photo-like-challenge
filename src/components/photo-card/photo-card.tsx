import React, {FunctionComponent} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

import {styles} from './styles';
import {Photo} from '@/types';

const {width: screenWidth} = Dimensions.get('window');
const cardWidth = screenWidth - 32;

type PhotoCardType = {
  photo: Photo;
};

export const PhotoCard: FunctionComponent<PhotoCardType> = ({photo}) => {
  const aspectRatio = photo.width / photo.height;
  const imageHeight = cardWidth / aspectRatio;

  return (
    <View style={styles.card}>
      <Image
        source={{uri: photo.download_url}}
        style={[styles.image, {height: imageHeight}]}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.author}>{photo.author}</Text>
        <Text style={styles.dimensions}>
          {photo.width} × {photo.height}
        </Text>
        <Text style={styles.id}>ID: {photo.id}</Text>
      </View>
    </View>
  );
};
