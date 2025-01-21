import styles from "./Card.module.css"
import React, { useState, useRef } from "react";
import pic from "../assets/adolf.png"
import html2canvas from "html2canvas";


function Card() {

        // State to hold the current image URL
        const [imageUrl, setImageUrl] = useState(pic);
  
        // Function to handle image upload
        const handleImageUpload = (event) => {
          const file = event.target.files[0]; // Get the selected file
          if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onload = () => {
              setImageUrl(reader.result); // Update the image URL with the file's data
            };
            reader.readAsDataURL(file); // Read the file as a data URL
          }
        }



  // card name editing JS      
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Card name");

  const handleTextChange = (event) => {
    setText(event.target.value); // Update the text as the user types
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle between editing and viewing modes
  };



   // Description editing js  
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("Some text");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update the description text as the user types
  };

  const toggleEditingDescription = () => {
    setIsEditingDescription(!isEditingDescription); // Toggle between editing and viewing modes for description
  };


  // color setter JS
  const [color, setColor] = useState("#ffffff");

    function ColorHange(event){
        setColor(event.target.value);
    }


// card screnshot JS    
const cardRef = useRef(null);

const captureScreenshot = () => {
  if (cardRef.current) {
      html2canvas(cardRef.current, {
          backgroundColor: null, // Keeps transparent areas intact
          useCORS: true, // Ensures correct handling of external images
      }).then((canvas) => {
          const link = document.createElement("a");
          link.download = "card-screenshot.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
      });
  }
};



const startResizing = (event) => {
  event.preventDefault();
  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResizing);
};

const resize = (event) => {
  const cont = cardRef.current;
  if (cont) {
    const rect = cont.getBoundingClientRect();

    // Calculate the new dimensions
    const newWidth = event.clientX - rect.left;
    const newHeight = event.clientY - rect.top;

    // Set minimum and maximum dimensions
    const minWidth = 150; // Minimum width
    const minHeight = 150; // Minimum height
    const maxWidth = window.innerWidth - rect.left; // Prevent going off the right edge
    const maxHeight = window.innerHeight - rect.top; // Prevent going off the bottom edge

    // Apply the constraints
    cont.style.width = `${Math.max(minWidth, Math.min(newWidth, maxWidth))}px`;
    cont.style.height = `${Math.max(minHeight, Math.min(newHeight, maxHeight))}px`;
  }
};

const stopResizing = () => {
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResizing);
};



    return(
        <>

            <div ref={cardRef} style={{backgroundColor: color, color: "inherit", overflow: "hidden", }} className={styles.cont}>

            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <img src={imageUrl}/>
            </label>   

        <input
        id="fileInput"
        type="file"
        accept="image/*" // Allow only image files
        style={{ display: "none" }} // Hide the file input
        onChange={handleImageUpload} // Trigger the upload handler on file selection
        />



{isEditing ? (
        // Input field for editing text
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={toggleEditing} // Save and switch back to display mode when focus is lost
          autoFocus
          style={{ fontSize: "3.5vh", textAlign: "center", width: "60%", fontFamily: "monospace", fontWeight: "bold" }}
        />
      ) : (
        // Display the text in an <h2> and make it clickable
        <h3 onClick={toggleEditing} style={{ cursor: "pointer" }}>
          {text}
        </h3>
)}
               
               
          {isEditingDescription ? (
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            onBlur={toggleEditingDescription} // Save and switch back to display mode when focus is lost
            autoFocus
            style={{
              fontSize: "2vh",
              textAlign: "center",
              width: "60%",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          />
        ) : (
          <p onClick={toggleEditingDescription} style={{ cursor: "pointer" }}>
            {description}
          </p>
        )}

            </div>

            <div className={styles.resizeHandle} onMouseDown={startResizing}>👆</div>
           
            <div className={styles.colorPickerCont}>
            <label>Select a Color</label>
            <input type="color" value={color} onChange={ColorHange} />

            <button onClick={captureScreenshot} className={styles.shot}>
    Capture Screenshot
</button>
            </div>
        </>
    );
}

export default Card