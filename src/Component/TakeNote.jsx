import React, { useState, useEffect } from 'react';
import './TakeNote.css';

const TakeNote = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  // hide popup message after 4 seconds
  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  // Fetch notes from backend when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8080/allNotes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Function to delete note
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:8080/deleteNotes/${id}`, { method: 'DELETE' });
      setNotes(notes.filter(note => note.notesId !== id));
      setPopupMessage('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      setPopupMessage('Error deleting note');
    }
  };

  // Function to add note
  const addNote = async () => {
    try {
      // Check if newNoteText is empty
      if (!newNoteText.trim()) {
        setPopupMessage('Please enter a note');
        return;
      }

      const response = await fetch('http://localhost:8080/addNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: newNoteText })
      });
      const data = await response.json();
      setNotes([...notes, data]);
      setNewNoteText('');
      setPopupMessage('Note added successfully');
    } catch (error) {
      console.error('Error adding note:', error);
      setPopupMessage('Error adding note');
    }
  };

  return (
    <div className='notes-body'>
      <div className='notes-main'>
        <input 
          type="text" 
          value={newNoteText} 
          onChange={(e) => setNewNoteText(e.target.value)} 
          placeholder="Take a note...."
          required  
        />
        <button onClick={addNote}>Add Note</button>
        <div className="notes-grid">
          {notes.map(note => (
            <div key={note.notesId} className="note-box">
              {note.notes}
              <button className="delete-button" onClick={() => deleteNote(note.notesId)}><i class="fa-solid fa-trash"></i></button>
            </div>
          ))}
        </div>
        {popupMessage && (
          <div className="popup">
            {popupMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeNote;
