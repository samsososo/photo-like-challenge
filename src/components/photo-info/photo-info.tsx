import React, { FunctionComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Photo } from '@/types';
import { HeartIcon } from '@/components/icons/heart-icon';

type PhotoInfoProps = {
  photo: Photo;
  isLiked: boolean;
  onLikePress: () => void;
};

export const PhotoInfo: FunctionComponent<PhotoInfoProps> = ({
  photo,
  isLiked,
  onLikePress,
}) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.authorContainer}>
        <Text style={styles.author}>{photo.author}</Text>
        <TouchableOpacity
          style={[styles.likeButton, isLiked && styles.likedButton]}
          onPress={onLikePress}
        >
          <HeartIcon size={20} filled={isLiked} />
        </TouchableOpacity>
      </View>
      <Text style={styles.dimensions}>
        {photo.width} × {photo.height}
      </Text>
      <Text style={styles.id}>ID: {photo.id}</Text>
    </View>
  );
};
