import axios from 'axios';
import {AXIOS_TIME_OUT, COMMON_URL} from '../constants/constants';
import {assignInterceptor} from './network-interceptor';

let instance = axios.create({
  baseURL: 'https://picsum.photos/v2',
  timeout: AXIOS_TIME_OUT,
});

instance = assignInterceptor(instance);

export const getAllPhotoService = async (page: number, limit: number) => {
  try {
    const result = await instance.get(
      COMMON_URL.GET_ALL_PHOTO.replace('{pageNumber}', page.toString()).replace(
        '{limit}',
        limit.toString(),
      ),
    );

    if (result) {
      return {success: true, payload: result.data};
    }
  } catch (e: any) {
    return {success: false, error: e.response?.data || e.message};
  }
};
