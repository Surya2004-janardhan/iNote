import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const { note, openModal } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {note.tag}
                    </h6>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-between">
                        <i
                            className="fa-regular fa-trash-can"
                            onClick={() => {
                                console.log("delete item clicked");
                                deleteNote(note._id);
                                props.showAlert("Delted Successfully", "success")
                            }}
                        ></i>
                        <i
                            className="fa-regular fa-pen-to-square"
                            onClick={() => {
                                openModal(note);
                            }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
