import { StyleSheet } from "react-native";

import { useRef } from "react";
import * as Contacts from "expo-contacts";
import WebView from "react-native-webview";

export default function HomeScreen() {
  const webViewRef = useRef<any>(null);

  const handleMessage = async (message: any) => {
    if (message.nativeEvent.data === "getContacts") {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const response = await Contacts.presentContactPickerAsync();
        sendMsgToPWA(response);
      }
    }
  };

  const sendMsgToPWA = (data: any) => {
    webViewRef?.current?.postMessage(JSON.stringify(data));
  };

  return (
    <WebView
      ref={webViewRef} // Assign webview ref to the `webViewRef` while initial rendering
      style={styles.container}
      onMessage={handleMessage}
      // source={{ uri: "10.0.2.2:3000" }} // Use this for Android Emulator
      source={{ uri: "http://localhost:3000" }} // Use this for iOS Simulator
      injectedJavaScript="window.isInApp=true"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
