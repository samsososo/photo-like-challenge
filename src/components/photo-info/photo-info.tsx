import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {styles} from './styles';
import {Photo} from '@/types';
import {HeartIcon} from '@/components/icons/heart-icon';

type PhotoInfoProps = {
  photo: Photo;
  isLiked: boolean;
  onLikePress: () => void;
  likeButtonScale?: Animated.Value;
};

export const PhotoInfo: FunctionComponent<PhotoInfoProps> = ({
  photo,
  isLiked,
  onLikePress,
  likeButtonScale,
}) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.authorContainer}>
        <Text style={styles.author}>{photo.author}</Text>
        <Animated.View
          style={[
            likeButtonScale && {
              transform: [{scale: likeButtonScale}],
            },
          ]}>
          <TouchableOpacity
            style={[styles.likeButton, isLiked && styles.likedButton]}
            onPress={onLikePress}>
            <HeartIcon size={20} filled={isLiked} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Text style={styles.dimensions}>
        {photo.width ?? '--'} × {photo.height ?? '--'}
      </Text>
      <Text style={styles.id}>ID: {photo.id ?? '--'}</Text>
    </View>
  );
};
