import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron
    .configure({
      name: 'ShoutPhotoLikeChallenge',
    })
    .useReactNative({
      asyncStorage: false,
      networking: {
        ignoreUrls: /symbolicate/,
      },
      editor: false,
      errors: { veto: () => false },
      overlay: false,
    })
    .connect();
}

export default Reactotron;
