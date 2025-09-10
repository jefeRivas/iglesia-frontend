import React from "react";
import { MembersProvider } from "./context/MembersContext";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <MembersProvider>
      <Navigation />
    </MembersProvider>
  );
}
