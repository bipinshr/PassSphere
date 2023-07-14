import React, { useState, useEffect } from "react";
import "../../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function PassGen() {
  const [passwordLength, setPasswordLength] = useState("12");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    if (isButtonClicked) {
      fetch(`https://api.api-ninjas.com/v1/passwordgenerator?length=${passwordLength}`, {
        headers: {
          "X-Api-Key": "N3n0scLtYJMnX2QqCQJv0w==rYkdg2AqYQcQMzPO",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const password = data.random_password; // Extract the password from the response object
          setGeneratedPassword(password || ""); // Set an empty string if password is undefined
          // console.log(password);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsButtonClicked(false);
        });
    }
  }, [isButtonClicked, passwordLength]);

  const handleGeneratePassword = (event) => {
    event.preventDefault();
    setIsButtonClicked(true);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);

      toast.success("Password copied", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Failed to copy password:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="genContainer">
        <div className="container">
          <h1>Password Generator</h1>
          <form onSubmit={handleGeneratePassword}>
            <label htmlFor="length">Password Length: </label>
            <input
              className="numberInput"
              type="number"
              id="length"
              name="length"
              min="1"
              max="100"
              placeholder="12"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              required
            />

            <input type="submit" value="Generate Password" />
          </form>
          <h2>Generated Password: </h2>
          <div>
            <input
              className="resultBox"
              id="password"
              placeholder="Password will be generated here"
              value={generatedPassword}
              readOnly
            />
            <button type="button" onClick={handleCopyToClipboard}>
              <ContentCopyIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassGen;
