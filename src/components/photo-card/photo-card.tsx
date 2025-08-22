import React, {FunctionComponent, useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  View,
  TouchableWithoutFeedback,
  Animated,
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
  const [showHeart, setShowHeart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const heartAnim = useRef(new Animated.Value(0)).current;
  const likeAnim = useRef(new Animated.Value(1)).current;
  const hintAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const aspectRatio = photo.width / photo.height;
  const imageHeight = cardWidth / aspectRatio;

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const currentLikeStatus = await getPhotoLikeStatus(
          photo.id,
          photo.author,
          photo.url,
          photo.width,
          photo.height,
        );
        setIsLiked(currentLikeStatus);
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };

    checkLikeStatus();
    
    // Show hint for 3 seconds, then fade out
    const hintTimer = setTimeout(() => {
      Animated.timing(hintAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowHint(false);
      });
    }, 3000);

    return () => clearTimeout(hintTimer);
  }, [photo.id, photo.author]);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      handleLikeToggle();
      showHeartAnimation();
    }
    setLastTap(now);
  };

  const showHeartAnimation = () => {
    setShowHeart(true);
    Animated.timing(heartAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(heartAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowHeart(false);
      });
    });
  };

  const handleLikeToggle = async () => {
    try {
      Animated.timing(likeAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(likeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      });

      setIsLiked(!isLiked);
      dispatch(togglePhotoLike(photo.id, photo.author, photo));
      triggerShakeAnimation();
    } catch (error) {
      console.error('Error toggling like:', error);
      setIsLiked(photo.isLiked || false);
    }
  };

  const triggerShakeAnimation = () => {
    const shakeSequence = Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]);
    
    shakeSequence.start();
  };

  const handleLikePress = async () => {
    handleLikeToggle();
  };

  return (
    <Animated.View 
      style={[
        styles.card,
        {
          transform: [
            {
              translateX: shakeAnim.interpolate({
                inputRange: [-10, 10],
                outputRange: [-10, 10],
              }),
            },
          ],
        },
      ]}>
      <TouchableWithoutFeedback 
        onPress={handleDoubleTap}
        onLongPress={() => {
          setShowDetails(!showDetails);
          setShowHint(false);
        }}>
        <View style={styles.imageContainer}>
          {!imageLoaded && (
            <View style={[styles.imagePlaceholder, {height: imageHeight}]}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
          <Image
            source={{uri: photo.download_url}}
            style={[styles.image, {height: imageHeight}]}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />

          {showHeart && (
            <Animated.View
              style={[
                styles.doubleTapHeart,
                {
                  opacity: heartAnim,
                  transform: [
                    {
                      scale: heartAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1.2],
                      }),
                    },
                  ],
                },
              ]}>
              <HeartIcon size={80} filled={true} color="#dc2626" />
            </Animated.View>
          )}
          
          {showDetails && (
            <View style={styles.detailsOverlay}>
              <Text style={styles.detailsText}>{photo.width} × {photo.height}</Text>
              <Text style={styles.detailsText}>ID: {photo.id}</Text>
              <Text style={styles.detailsText}>{photo.author}</Text>
              <Text style={styles.detailsHint}>Long Press to close</Text>
            </View>
          )}
          
          {showHint && (
            <Animated.View style={[styles.hintOverlay, { opacity: hintAnim }]}>
              <Text style={styles.hintText}>Long press for details</Text>
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <PhotoInfo
        photo={photo}
        isLiked={isLiked}
        onLikePress={handleLikePress}
        likeButtonScale={likeAnim}
      />
    </Animated.View>
  );
};
