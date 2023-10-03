import React, { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { selectUser } from "@/Redux/Reducers/Index.js";
import { editProfil } from "@/_Services/Api.js";



const Editform = () => {

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [editName, setEditName] = useState(false);

    const store = useStore();

    const user = useSelector(selectUser);

    async function editNameSubmit(e) {
        e.preventDefault();
        const token = user.token;
        editProfil(store, newFirstName, newLastName, token);
        setEditName(false);
    }

    return editName ? (
        <div className="header editName-header">
            <h1>Welcome back</h1>
            <form onSubmit={(e) => editNameSubmit(e)} className="editName-form">
                <div className="editName-input-container">
                    <div className="editName-wrapper">
                        <label htmlFor="newFirstName" className="editName-label">
                            New firstname:{" "}
                        </label>
                        <input
                            type="text"
                            id="newFirstName"
                            className="editName-input"
                            placeholder={user.data.firstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                    </div>

                    <div className="editName-wrapper">
                        <label htmlFor="newLastName" className="editName-label">
                            New lastname:{" "}
                        </label>
                        <input
                            type="text"
                            id="newLastName"
                            className="editName-input"
                            placeholder={user.data.lastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="editName-buttons-container">
                    <button type="submit" className="editName-button">
                        Save
                    </button>
                    <button type="button" className="editName-button" onClick={() => setEditName(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <div className="header">
            <h1>
                Welcome back
                <br />
                {`${user.data.firstName} ${user.data.lastName}`}!
            </h1>
            <button className="edit-button" onClick={() => setEditName(!editName)}>
                Edit Name
            </button>
        </div>)
};

export default Editform;