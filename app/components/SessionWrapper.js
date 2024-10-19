// app/components/SessionWrapper.js
"use client"; // This component will be a Client Component

import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default SessionWrapper;
