import React, {FunctionComponent, useLayoutEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {PhotoCard} from '../../components/photo-card/photo-card';
import {styles} from './styles';
import {Photo} from '@/types';
import {getAllPhoto} from '@/redux/actions/get-all-photo-action';
import {useDispatch, useSelector} from 'react-redux';
import {CommonState} from '@/interface/common-state-interface';

export const PhotosScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {photos} = useSelector(
    (state: CommonState) => state.getAllPhotoReducers,
  );
  const renderItem = ({item}: {item: Photo}) => <PhotoCard photo={item} />;

  const keyExtractor = (item: Photo) => item.id;

  useLayoutEffect(() => {
    dispatch(getAllPhoto(1, 10));
  }, []);

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
      />
    </View>
  );
};
