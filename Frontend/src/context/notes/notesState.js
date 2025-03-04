import React, { useState } from "react";
import noteContext from "./noteContext";

function NoteState(props) {
    const host = "http://localhost:5000";
    const n1 = [];
    const [notes, setNotes] = useState(n1);

    async function getAllNotes() {
        try {
            const authToken = localStorage.getItem('token');
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "content-type": "application/JSON",
                    "auth-token": authToken,
                },
            });
            const json = await response.json();
            if (Array.isArray(json)) {
                setNotes(json);
            } else {
                throw new Error("Data format error");
            }
        } catch (error) {
            console.error("Error fetching notes:", error);
            setNotes([]);
        }
    }

    async function addNote({ title, tag, description }) {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const newNote = await response.json();
        console.log(newNote);
        setNotes((prevNotes) => prevNotes.concat(newNote));
    }    

    async function deleteNote(id) {
        const authToken = localStorage.getItem('token');
        console.log(id);
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken,
            },
        });
        console.log(response)
    
        const json = await response.json();
        console.log("Delete response:", json);
    
        if (response.ok) {
            console.log("Notes before deletion:", notes);
            const newNotes = notes.filter((note) => note._id !== id);
            console.log("Notes after deletion:", newNotes);
            setNotes(newNotes);
        } else {
            console.error("Failed to delete note:", json);
        }
    }    

    async function editNote({_id, title, tag, description}) {
        const authToken = localStorage.getItem('token');
        const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/JSON",
                "auth-token": authToken,
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === _id) {
                newNotes[index].title = title;
                newNotes[index].tag = tag;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <noteContext.Provider
            value={{ notes, getAllNotes, addNote, deleteNote, editNote }}
        >
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;
