import React, {FunctionComponent, useEffect, useState, useRef} from 'react';
import {Dimensions, Image, View, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import {useDispatch} from 'react-redux';
import {togglePhotoLike} from '@/redux/actions/toggle-photo-like-action';
import {getPhotoLikeStatus} from '@/services/photo-cache-service';

import {styles} from './styles';
import {Photo} from '@/types';
import {PhotoInfo} from '@/components/photo-info/photo-info';
import {HeartIcon} from '@/components/icons/heart-icon';

const {width: screenWidth} = Dimensions.get('window');
const cardWidth = screenWidth - 32;

type PhotoCardType = {
  photo: Photo;
};

export const PhotoCard: FunctionComponent<PhotoCardType> = ({photo}) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(photo.isLiked || false);
  const [lastTap, setLastTap] = useState(0);
  const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
  const doubleTapHeartAnim = useRef(new Animated.Value(0)).current;
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

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
      handleLikeToggle();
      showDoubleTapHeartAnimation();
    }
    setLastTap(now);
  };

  const showDoubleTapHeartAnimation = () => {
    setShowDoubleTapHeart(true);
    Animated.sequence([
      Animated.timing(doubleTapHeartAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(doubleTapHeartAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowDoubleTapHeart(false);
    });
  };

  const handleLikeToggle = async () => {
    try {
      setIsLiked(!isLiked);
      dispatch(togglePhotoLike(photo.id, photo.author));
    } catch (error) {
      console.error('Error toggling like:', error);
      setIsLiked(photo.isLiked || false);
    }
  };

  const handleLikePress = async () => {
    handleLikeToggle();
  };

  return (
    <View style={styles.card}>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: photo.download_url}}
            style={[styles.image, {height: imageHeight}]}
            resizeMode="cover"
          />
          {showDoubleTapHeart && (
            <Animated.View
              style={[
                styles.doubleTapHeart,
                {
                  opacity: doubleTapHeartAnim,
                  transform: [
                    {
                      scale: doubleTapHeartAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1.2],
                      }),
                    },
                  ],
                },
              ]}>
              <HeartIcon size={80} filled={true} color="#dc2626" animated={false} />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <PhotoInfo
        photo={photo}
        isLiked={isLiked}
        onLikePress={handleLikePress}
      />
    </View>
  );
};
