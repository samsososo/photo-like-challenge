import React, {FunctionComponent, useLayoutEffect, useCallback} from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import {PhotoCard} from '../../components/photo-card/photo-card';
import {styles} from './styles';
import {Photo} from '@/types';
import {getAllPhoto} from '@/redux/actions/get-all-photo-action';
import {useDispatch, useSelector} from 'react-redux';
import {CommonState} from '@/interface/common-state-interface';

export const PhotosScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {photos, currentPage, hasMore, isLoading} = useSelector(
    (state: CommonState) => state.getAllPhotoReducers,
  );

  const renderItem = ({item}: {item: Photo}) => <PhotoCard photo={item} />;

  const keyExtractor = (item: Photo) => item.id;

  const loadMorePhotos = useCallback(() => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      dispatch(getAllPhoto(nextPage, 8));
    }
  }, [hasMore, isLoading, currentPage, dispatch]);

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator size="small" color="#0066cc" />
          <Text style={styles.loadingText}>Loading more photos...</Text>
        </View>
      );
    }

    if (!hasMore && photos.length > 0) {
      return (
        <View style={styles.noMoreFooter}>
          <Text style={styles.noMoreText}>No More Photos</Text>
        </View>
      );
    }

    return null;
  };

  useLayoutEffect(() => {
    dispatch(getAllPhoto(1, 8));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photos</Text>
        <Text style={styles.subtitle}>Total: {photos.length} photos</Text>
      </View>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMorePhotos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};
