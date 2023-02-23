import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editDataHandler, removeNote } from "../redux/actions";

const NoteCard = (props) => {
  const dispatch = useDispatch();
  const deleteNoteHandler = async (id) => {
    try {
      const data = await fetch(
        `http://localhost:5000/api/notes/deletenote/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const jsonData = await data.json();
      if (data.status === 200) {
        dispatch(removeNote(id));
        toast.dismiss();
        toast.success("Note Deleted Successfully");
      } else {
        toast.dismiss();
        toast.error(jsonData.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  };
  let date = new Date(props.timestamp);

  const EditNotehandler = () => {
    dispatch(
      editDataHandler({
        edit: true,
        id: props.id,
        title: props.title,
        tag: props.tag,
        description: props.description,
      })
    );
    props.setOpen(true);
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg min-w-[350px]">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">{props.description}</p>
      </div>
      <span className="inline-block py-1 text-sm text-gray-500 px-6">
        {date.toUTCString().replace("GMT", "")}
      </span>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {props.tag}
        </span>
        <div className="flex justify-between items-center">
          <span
            className="inline-block rounded-full px-3 py-1 text-xl text-gray-700 mb-2 cursor-pointer hover:text-red-500"
            onClick={() => deleteNoteHandler(props.id)}
          >
            <MdDeleteOutline />
          </span>
          <span
            className="inline-block rounded-full py-1 text-2xl text-gray-700 mb-2 cursor-pointer hover:text-gray-500"
            onClick={EditNotehandler}
          >
            <MdEditNote />
          </span>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default NoteCard;
