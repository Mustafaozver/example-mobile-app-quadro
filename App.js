/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, Image, StatusBar, BackHandler, Platform} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
import {WebView} from 'react-native-webview';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import res from './ressource/index';
import NativePlatformConstantsAndroid from 'react-native/Libraries/Utilities/NativePlatformConstantsAndroid';

const INJECTEDJAVASCRIPT =
  "window.isNative=true; const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=0.99, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);";

const App = () => {
  const [, setWebView] = useState(true);
  const webview = useRef(null);

  const handleWebView = () => {
    setWebView(false);
    showNavigationBar();
    changeNavigationBarColor('#ffffff', true);
  };

  const changeColor = () => {
    try {
      changeNavigationBarColor('#730000', true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (Platform.OS === NativePlatformConstantsAndroid) {
      StatusBar.setBackgroundColor('#DE0000');
    }
    hideNavigationBar();
    changeColor();
  }, []);

  useEffect(() => {
    const backAction = () => {
      webview.current.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderImage = () => {
    return (
      <View
        style={{
          padding: '20%',
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            width: '100%',
            height: '100%',
          }}
          source={res.LOGO}
        />
      </View>
    );
  };

  const getUri = () => {
    return 'https://www.zeekeez.com';
  };

  const handleMessage = ({nativeEvent}) => {
    if (nativeEvent.data === 'facebookLoginClicked') {
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(() => {
          AccessToken.getCurrentAccessToken().then(data => {
            webview.current.postMessage(
              JSON.stringify({
                accessToken: data.accessToken.toString(),
                type: 'facebookLogin',
              }),
              '*',
            );
          });
        })
        .catch(console.error);
    }
  };

  const renderWebView = () => {
    return (
      <WebView
        originWhitelist={['*']}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        source={{uri: getUri()}}
        onLoadEnd={() => handleWebView()}
        startInLoadingState={true}
        onLoadStart={e => setWebView(true)}
        onMessage={handleMessage}
        ref={webview}
        style={{
          flex: 1,
          ...ifIphoneX(
            {
              marginTop: 50,
            },
            {
              marginTop: 0,
            },
          ),
        }}
        renderLoading={() => renderImage()}
      />
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      {renderWebView()}
    </View>
  );
};

export default App;
