import React, {FunctionComponent, useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {togglePhotoLike} from '@/redux/actions/toggle-photo-like-action';
import {getPhotoLikeStatus} from '@/services/photo-cache-service';

import {styles} from './styles';
import {Photo} from '@/types';
import {PhotoInfo} from '@/components/photo-info/photo-info';

const {width: screenWidth} = Dimensions.get('window');
const cardWidth = screenWidth - 32;

type PhotoCardType = {
  photo: Photo;
};

export const PhotoCard: FunctionComponent<PhotoCardType> = ({photo}) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(photo.isLiked || false);
  const aspectRatio = photo.width / photo.height;
  const imageHeight = cardWidth / aspectRatio;

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const currentLikeStatus = await getPhotoLikeStatus(photo.id, photo.author);
        setIsLiked(currentLikeStatus);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
  }, [photo.id, photo.author]);

  const handleLikePress = async () => {
    try {
      setIsLiked(!isLiked);
      dispatch(togglePhotoLike(photo.id, photo.author));
    } catch (error) {
      console.error('Error toggling like:', error);
      setIsLiked(photo.isLiked || false);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{uri: photo.download_url}}
        style={[styles.image, {height: imageHeight}]}
        resizeMode="cover"
      />
      <PhotoInfo
        photo={photo}
        isLiked={isLiked}
        onLikePress={handleLikePress}
      />
    </View>
  );
};
