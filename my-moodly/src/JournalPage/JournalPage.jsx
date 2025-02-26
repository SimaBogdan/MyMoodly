import { useState, useEffect, useContext } from "react";
import "./JournalPage.css";
import { UserContext } from '../SignUpPage/UserContext';
import { getAllJournals, addJournal, updateJournal, deleteJournal } from './ApiJournal';

function JournalPage() {
    const { users } = useContext(UserContext); // Access the users from context
    const [activeIndex, setActiveIndex] = useState(null);
    const [entries, setEntries] = useState([]);
    const [userId, setUserId] = useState(null); // State for storing user ID

    useEffect(() => {
        // Get the logged-in user from localStorage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setUserId(loggedInUser.id); // Set the userId to the logged-in user's ID
        }
    }, []);

    useEffect(() => {
        // Fetch journals of the logged-in user when userId is set
        if (userId) {
            const fetchJournals = async () => {
                try {
                    const response = await getAllJournals();
                    // Filter entries by userId
                    setEntries(response.data.filter(journal => journal.id_user === userId));
                } catch (error) {
                    console.error('Error fetching journals:', error);
                }
            };

            fetchJournals();
        }
    }, [userId]);

    const openModal = (index) => {
        setActiveIndex(index);
    };

    const closeModal = () => {
        setActiveIndex(null);
    };

    const handleContentChange = (index, newContent) => {
        const updatedEntries = entries.map((entry, i) =>
            i === index ? { ...entry, text: newContent } : entry
        );
        setEntries(updatedEntries);
    };

    const handleTitleChange = (index, newTitle) => {
        const updatedEntries = entries.map((entry, i) =>
            i === index ? { ...entry, title: newTitle } : entry
        );
        setEntries(updatedEntries);
    };

    const addNewEntry = async () => {
        if (!userId) return; // Ensure userId exists before adding
        const newEntry = { title: "New Journal Entry", text: "", id_user: userId, date: new Date().toISOString() };
        try {
            const response = await addJournal(newEntry);
            setEntries([response.data, ...entries]);
        } catch (error) {
            console.error("Error adding new journal entry:", error);
        }
    };

    const saveJournal = async () => {
        const updatedJournal = entries[activeIndex];
        
        console.log('Updating journal with data:', updatedJournal);  // Log the data
    
        try {
            await updateJournal(updatedJournal.id, updatedJournal);
            console.log("Journal updated successfully.");
        } catch (error) {
            console.error("Error updating journal:", error);
            if (error.response) {
                console.log("Server responded with:", error.response.data);  // Log the error response from the backend
            }
        }
    };
    

    const handleDeleteJournal = async () => {
        const journalId = entries[activeIndex].id;
        try {
            await deleteJournal(journalId);
            setEntries(entries.filter((entry, i) => i !== activeIndex));
            closeModal();
            console.log("Journal deleted successfully.");
        } catch (error) {
            console.error("Error deleting journal:", error);
        }
    };

    return (
        <div className="journal-background">
            <div className="journal-page">
                <button className="add-entry-button" onClick={addNewEntry}>
                    + New Entry
                </button>
                <div className="journal-list">
                    {entries.map((entry, index) => (
                        <div
                            key={index}
                            className="journal-entry"
                            onClick={() => openModal(index)}
                        >
                            <h3>{entry.title}</h3>
                            <p className="entry-preview">
                                {entry.text.slice(0, 50) || "Click to add content..."}
                            </p>
                        </div>
                    ))}
                </div>

                {activeIndex !== null && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-button"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                            <input
                                type="text"
                                className="title-input"
                                value={entries[activeIndex].title}
                                onChange={(e) =>
                                    handleTitleChange(activeIndex, e.target.value)
                                }
                                placeholder="Edit title..."
                            />
                            <textarea
                                placeholder="Write your journal entry here..."
                                className="journal-textarea"
                                value={entries[activeIndex].text}
                                onChange={(e) =>
                                    handleContentChange(activeIndex, e.target.value)
                                }
                            ></textarea>
                            <button onClick={saveJournal}>Save Changes</button>
                            <button onClick={handleDeleteJournal}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JournalPage;
