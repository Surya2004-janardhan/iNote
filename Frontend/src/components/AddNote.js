import React, { useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = React.useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({
        title: "",
        tag: "",
        description: ""
    });
    function handleClick(e) {
        e.preventDefault();
        addNote(note);
        props.showAlert("Added Successfully", "success")
        setNote({
            title: "",
            tag: "",
            description: ""
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
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
                <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        placeholder="default"
                        onChange={handleChange}
                        value={note.tag}
                    />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
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
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                    disabled= {note.title.length < 1 || note.description.length < 5}
                >
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
