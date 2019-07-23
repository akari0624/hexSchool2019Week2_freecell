import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import reducers from './store/reducers'
import { StyledComponentGlobalStyle } from './themes/globalStyle'
import indexRouter from './pages/mainpage'
import logicRootSagaArray from './store/sagas'


const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)

let appStore: any

if (process.env.NODE_ENV === 'production') {
  appStore = createStoreWithMiddleware(reducers)
} else {
  appStore = createStoreWithMiddleware(
    reducers,
    /**  force cast~  https://github.com/zalmoxisus/redux-devtools-extension/issues/134#issuecomment-379861240 */
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
}

logicRootSagaArray.forEach(kindOfSomeFlowSaga =>
  sagaMiddleware.run(kindOfSomeFlowSaga)
)

ReactDOM.render(
  <>
    <StyledComponentGlobalStyle />
    <Provider store={appStore}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={indexRouter} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  </>,
  document.querySelector('.container')
)
