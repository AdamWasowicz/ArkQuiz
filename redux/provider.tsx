"use client"
import { store } from './store';
import { Provider } from 'react-redux';

const ReduxProvider: React.FC<{children: React.ReactNode}> = (props) => {

    return (
        <Provider store={store}>{props.children}</Provider>
    )
}

export default ReduxProvider;