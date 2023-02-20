import React from "react";
import AddNote from "./Components/AddNote";
import Navbar from "./Components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <AddNote />
      </div>
    </>
  );
};

export default Home;
