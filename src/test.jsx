import React, { useState } from "react";

function EditableHeading() {
  // State to manage the text and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Click to edit me!");

  const handleTextChange = (event) => {
    setText(event.target.value); // Update the text as the user types
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle between editing and viewing modes
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {isEditing ? (
        // Input field for editing text
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={toggleEditing} // Save and switch back to display mode when focus is lost
          autoFocus
          style={{
            fontSize: "24px",
            textAlign: "center",
            width: "60%",
            transition: "opacity 0.3s ease", // Smooth fade-in/fade-out effect
            opacity: isEditing ? 1 : 0,
          }}
        />
      ) : (
        // Display the text in an <h2> and make it clickable
        <h2
          onClick={toggleEditing}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            transition: "opacity 0.3s ease", // Smooth fade-in/fade-out effect
            opacity: isEditing ? 0 : 1,
          }}
        >
          {text}
        </h2>
      )}
    </div>
  );
}

export default EditableHeading;