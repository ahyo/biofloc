import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/custom.css";
import React,{useEffect} from "react";
import MemberLayout from "../components/MemberLayout";
import GuestLayout from "../components/GuestLayout";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer);
const persistor = persistStore(store);

const MyApp = ({ Component, pageProps }) => {
  const token = store.getState().auth.token;
  console.log('token:'+token);
  const Layout = token ? MemberLayout : GuestLayout;

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
