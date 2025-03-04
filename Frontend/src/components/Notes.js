import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        } else {
            navigate('/login')
        }       
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({
        _id: "",
        title: "",
        tag: "",
        description: "",
    });

    function handleClick(e) {
        editNote(note);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success")
        setNote({
            _id: "",
            title: "",
            tag: "",
            description: "",
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    function openModal(currentNote) {
        ref.current.click();
        setNote({
            _id: currentNote._id || "",
            title: currentNote.title || "",
            description: currentNote.description || "",
            tag: currentNote.tag || "",
        });
    }

    return (
        <div>
            <AddNote showAlert = {props.showAlert} />
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={ref}
            >
                Launch demo modal
            </button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="title"
                                        className="col-form-label"
                                    >
                                        Title:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="Title"
                                        onChange={handleChange}
                                        value={note.title}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="tag"
                                        className="col-form-label"
                                    >
                                        Tag:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tag"
                                        name="tag"
                                        placeholder="default"
                                        onChange={handleChange}
                                        value={note.tag}
                                    />
                                    <label
                                        htmlFor="description"
                                        className="col-form-label"
                                    >
                                        Description:
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        placeholder="Description..."
                                        onChange={handleChange}
                                        value={note.description}
                                        minLength={5}
                                        required
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                disabled={
                                    note.title.length < 1 ||
                                    note.description.length < 5
                                }
                                className="btn btn-primary"
                                onClick={handleClick}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.length !== 0 ? (
                    notes.map((note) => {
                        return (
                            <NoteItem
                                note={note}
                                openModal={openModal}
                                key={note._id}
                                showAlert = {props.showAlert}
                            />
                        );
                    })
                ) : (
                    <div className="contaienr mx-1 my-3">
                        Section Looks Empty try adding some notes
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;
