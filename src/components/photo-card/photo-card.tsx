import React, {FunctionComponent, useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Text,
} from 'react-native';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const doubleTapHeartAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const likeButtonScale = useRef(new Animated.Value(1)).current;

  const aspectRatio = photo.width / photo.height;
  const imageHeight = cardWidth / aspectRatio;

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const currentLikeStatus = await getPhotoLikeStatus(
          photo.id,
          photo.author,
        );
        setIsLiked(currentLikeStatus);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();

    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start();

    // Fallback: if image doesn't load within 5 seconds, show it anyway
    const fallbackTimer = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        console.log('Fallback: showing image after timeout:', photo.id);
        setImageLoaded(true);
        setImageError(false);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [photo.id, photo.author, cardAnim, imageLoaded, imageError]);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
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
      Animated.sequence([
        Animated.timing(likeButtonScale, {
          toValue: 1.2,
          duration: 100,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(likeButtonScale, {
          toValue: 1,
          duration: 100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();

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

  const handleImageLoad = () => {
    console.log(
      'Image loaded successfully:',
      photo.id,
      'URL:',
      photo.download_url,
    );
    setImageLoaded(true);
    setImageError(false);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const handleImageError = () => {
    console.log('Image failed to load:', photo.id, 'URL:', photo.download_url);
    setImageError(true);
    setImageLoaded(false);
  };

  // Debug: log the image URL when component mounts
  useEffect(() => {
    console.log(
      'PhotoCard mounted for photo:',
      photo.id,
      'URL:',
      photo.download_url,
    );
  }, [photo.id, photo.download_url]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: cardAnim,
          transform: [
            {
              scale: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
            {
              translateY: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.imageContainer}>
          {/* Temporarily disabled skeleton loading for debugging */}
          {/* {!imageLoaded && !imageError && (
            <View style={[styles.skeleton, {height: imageHeight}]}>
              <View style={styles.skeletonShimmer} />
            </View>
          )} */}

          <Image
            source={{uri: photo.download_url}}
            style={[
              styles.image,
              {height: imageHeight},
              {
                opacity: imageLoaded ? 1 : 0.3,
              },
            ]}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Debug info - remove this later */}
          <View style={styles.debugInfo}>
            <Text style={styles.debugText}>
              ID: {photo.id} | Loaded: {imageLoaded ? 'Yes' : 'No'} | Error:{' '}
              {imageError ? 'Yes' : 'No'}
            </Text>
          </View>

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
              <HeartIcon
                size={80}
                filled={true}
                color="#dc2626"
                animated={false}
              />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <PhotoInfo
        photo={photo}
        isLiked={isLiked}
        onLikePress={handleLikePress}
        likeButtonScale={likeButtonScale}
      />
    </Animated.View>
  );
};
