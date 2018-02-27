import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootNavigation from './src/RootNavigator';
import store from './src/redux/store/store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        );
    }
}

export default App;