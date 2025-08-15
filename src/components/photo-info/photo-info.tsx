import React, {FunctionComponent, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Photo} from '@/types';
import {HeartIcon} from '@/components/icons/heart-icon';

type PhotoInfoProps = {
  photo: Photo;
  isLiked: boolean;
  onLikePress: () => void;
};

export const PhotoInfo: FunctionComponent<PhotoInfoProps> = React.memo(
  ({photo, isLiked, onLikePress}) => {
    const dimensionsText = useMemo(
      () => `${photo.width} × ${photo.height}`,
      [photo.width, photo.height],
    );

    const idText = useMemo(() => `ID: ${photo.id}`, [photo.id]);

    const buttonStyle = useMemo(
      () => [styles.likeButton, isLiked && styles.likedButton],
      [isLiked],
    );

    return (
      <View style={styles.infoContainer}>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{photo.author}</Text>
          <TouchableOpacity
            style={buttonStyle}
            onPress={onLikePress}
            activeOpacity={0.7}>
            <HeartIcon size={20} filled={isLiked} />
          </TouchableOpacity>
        </View>
        <Text style={styles.dimensions}>{dimensionsText}</Text>
        <Text style={styles.id}>{idText}</Text>
      </View>
    );
  },
);
