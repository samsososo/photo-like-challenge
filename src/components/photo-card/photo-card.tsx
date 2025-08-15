import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  Dimensions,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
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

const ImagePlaceholder: React.FC<{height: number}> = ({height}) => (
  <View style={[styles.placeholderContainer, {height}]}>
    <View style={styles.placeholderIcon}>
      <Text style={styles.placeholderIconText}>📷</Text>
    </View>
    <Text style={styles.placeholderText}>Image Unavailable</Text>
  </View>
);

export const PhotoCard: FunctionComponent<PhotoCardType> = React.memo(
  ({photo}) => {
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(photo.isLiked || false);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const likeStatusChecked = useRef(false);

    const aspectRatio = useMemo(
      () => photo.width / photo.height,
      [photo.width, photo.height],
    );
    const imageHeight = useMemo(() => cardWidth / aspectRatio, [aspectRatio]);

    const checkLikeStatus = useCallback(async () => {
      if (likeStatusChecked.current) return;

      try {
        const currentLikeStatus = await getPhotoLikeStatus(
          photo.id,
          photo.author,
        );
        setIsLiked(currentLikeStatus);
        likeStatusChecked.current = true;
      } catch (error) {
        console.error('Error checking like status:', error);
        likeStatusChecked.current = true;
      }
    }, [photo.id, photo.author]);

    const handleLikePress = useCallback(async () => {
      try {
        setIsLiked(!isLiked);
        dispatch(togglePhotoLike(photo.id, photo.author));
      } catch (error) {
        console.error('Error toggling like:', error);
        setIsLiked(photo.isLiked || false);
      }
    }, [isLiked, photo.id, photo.author, photo.isLiked, dispatch]);

    const handleImageLoad = useCallback(() => {
      setImageLoading(false);
      setImageError(false);
      setRetryCount(0);
    }, []);

    const handleImageError = useCallback(() => {
      setImageLoading(false);
      setImageError(true);
      console.warn(
        `Failed to load image for photo ${photo.id}: ${photo.download_url}`,
      );
    }, [photo.id, photo.download_url]);

    const handleRetry = useCallback(() => {
      if (retryCount < 3) {
        setImageLoading(true);
        setImageError(false);
        setRetryCount(prev => prev + 1);
      } else {
        setImageError(true);
        setImageLoading(false);
      }
    }, [retryCount]);

    const imageSource = useMemo(
      () => ({uri: photo.download_url}),
      [photo.download_url],
    );

    const shouldShowError = imageError && (retryCount >= 3 || !imageLoading);

    const handleLayout = useCallback(() => {
      checkLikeStatus();
    }, [checkLikeStatus]);

    return (
      <View style={styles.card} onLayout={handleLayout}>
        <View style={[styles.imageContainer, {height: imageHeight}]}>
          {imageLoading && (
            <View style={styles.imageLoadingContainer}>
              <ActivityIndicator size="small" color="#0066cc" />
              {retryCount > 0 && (
                <Text style={styles.retryCountText}>Retry {retryCount}/3</Text>
              )}
            </View>
          )}

          {shouldShowError && (
            <View style={styles.imageErrorContainer}>
              <ImagePlaceholder height={imageHeight} />
              <View style={styles.errorOverlay}>
                <Text style={styles.errorText}>
                  {retryCount >= 3
                    ? 'Failed to load image'
                    : 'Image loading failed'}
                </Text>
                {retryCount < 3 && (
                  <TouchableOpacity
                    style={styles.retryButton}
                    onPress={handleRetry}>
                    <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
                )}
                {retryCount >= 3 && (
                  <Text style={styles.maxRetriesText}>Max retries reached</Text>
                )}
              </View>
            </View>
          )}

          <Image
            source={imageSource}
            style={[styles.image, {height: imageHeight}]}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            fadeDuration={0}
            progressiveRenderingEnabled={true}
          />
        </View>
        <PhotoInfo
          photo={photo}
          isLiked={isLiked}
          onLikePress={handleLikePress}
        />
      </View>
    );
  },
);
