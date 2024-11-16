"use client";

import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const showSelectedContact = (nativeEvent) => {
    if (window.isInApp) {
      const selectedContact = JSON.parse(nativeEvent?.data);
      setData({
        name: selectedContact?.firstName,
        phoneNumber: selectedContact?.phoneNumbers?.[0]?.number,
      });
    }
  };

  // method to send msg to react native
  const sendMessage = () => {
    window?.ReactNativeWebView?.postMessage("getContacts");
  };

  // listener to receive msgs from react native
  useEffect(() => {
    const androidMessageListener = document.addEventListener("message", showSelectedContact);
    const iosMessageListener = window.addEventListener("message", showSelectedContact);
    return () => {
      document.removeEventListener("message", androidMessageListener);
      window.removeEventListener("message", iosMessageListener);
    };
  }, []);

  return (
    <div className={styles.container}>
      <main style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          <input type="text" placeholder="name" readOnly value={data?.name} name="name" onChange={handleChange} />
          <input type="tel" placeholder="phone number" readOnly value={data?.phoneNumber} onChange={handleChange} />
        </form>
        <button onClick={sendMessage}>Select contact</button>
      </main>
    </div>
  );
}
