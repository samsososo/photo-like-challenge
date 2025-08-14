export const COMMON_URL = {
  GET_ALL_PHOTO: '/list?page={pageNumber}&limit={limit}',
};

export const AXIOS_TIME_OUT = 30000;

export enum APIStatus {
  NOT_STARTED = 'NOT_STARTED',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
