import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import './src/config/reactotron';

import {TabNavigation} from './src/components/tab-navigation/tab-navigation';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <TabNavigation />
    </Provider>
  );
}

export default App;
