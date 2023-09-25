import React, { useEffect, useState } from "react";
import HomeTabs from "./components/auth/HomeTabs";
import { ConfigProvider } from "antd";
import { auth } from "./firebase";
import { Spin } from "antd";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        // Fetch the displayName when the user is logged in
        const userDisplayName = user.displayName;
        if (userDisplayName) {
          setDisplayName(userDisplayName);
        }
      }

      // Simulate a loading delay (2 seconds in this example)
      setTimeout(() => {
        setLoading(false);

        // Set refreshing to false after the initial load
        setRefreshing(false);
      }, 2000);

      return unsubscribe; // Cleanup the subscription when the component unmounts
    });
  }, []);

  if (refreshing) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="Refreshing..." />
      </div>
    );
  }

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "'Fira Sans', sans-serif ",
          },
        }}
      >
        {user ? <Dashboard displayName={displayName} /> : <HomeTabs />}
      </ConfigProvider>
    </div>
  );
}

export default App;
