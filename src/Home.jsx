import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewNote from "./Components/AddNewNote";
import Navbar from "./Components/Navbar";
import NoteCard from "./Components/NoteCard";
import { userDetails } from "./redux/actions";

const Home = () => {
  const [open, setOpen] = useState(false);
  const { notes } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUserTokenHandler = () => {
    dispatch(userDetails(localStorage.getItem("token")));
  };

  const fetchNotesFromServer = async () => {
    if (localStorage.getItem("token")) {
      try {
        const data = await fetch("http://localhost:5000/api/notes/fetchnotes", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        const jsonData = await data.json();
        if (data.status === 200) {
          dispatch({ user: localStorage.getItem("token"), notes: jsonData });
        } else {
          toast.error(jsonData.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      navigate("/register");
    }
  };
  useEffect(() => {
    fetchNotesFromServer();
    setUserTokenHandler();
  }, []);

  return (
    <>
      <Navbar />
      {!open && (
        <div className="flex gap-10 justify-center items-center my-6 flex-wrap">
          {notes &&
            notes.map((note) => {
              return (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  description={note.description}
                  tag={note.tag}
                  timestamp={note.timestamp}
                  id={note._id}
                />
              );
            })}
        </div>
      )}
      {open && <AddNewNote setOpen={setOpen} />}
      <button
        className="flex mx-auto mt-16 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-lg absolute bottom-10 right-10"
        onClick={() => setOpen(!open)}
      >
        {!open ? "Add Note" : "Close"}
      </button>
    </>
  );
};

export default Home;
