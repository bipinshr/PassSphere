import React, { useEffect, useState } from "react";
import "./PasswordVault.css";
import Axios from "axios";
import PasswordBox from "./PasswordBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PasswordVault() {
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [Listpasswords, setListPasswords] = useState([]);
  const [decryptedPasswords, setDecryptedPasswords] = useState({});
  const [isDecrypting, setIsDecrypting] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpassword").then((response) => {
      setListPasswords(response.data);
    });
  }, []);

  const addPassword = () => {
    if (!website || !account || !password) {
      // Show the error message as a toast notification
      toast.error("All fields are required", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    Axios.post("http://localhost:3001/addpassword", { Website: website, password: password, account: account })
      .then((response) => {
        if (response.data === "Success") {
          // Fetch the updated password list after adding the new password
          Axios.get("http://localhost:3001/showpassword").then((response) => {
            setListPasswords(response.data);
            setWebsite("");
            setAccount("");
            setPassword("");
            setDecryptedPasswords({}); // Clear decrypted passwords
            // Show the success message as a toast notification
            toast.success("Password added successfully", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
        } else {
          toast.error("Failed to add password. Please try again.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error adding password:", error);
        toast.error("Failed to add password. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const deletePassword = (id) => {
    Axios.post("http://localhost:3001/deletepassword", { id })
      .then((response) => {
        // Remove the deleted password from the list of passwords in state
        setListPasswords(Listpasswords.filter((password) => password.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting password:", error);
        toast.error("Failed to delete password. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const decryptPassword = (encryption) => {
    if (isDecrypting) {
      return;
    }

    setIsDecrypting(true);

    Axios.post("http://localhost:3001/decryptpassword", { password: encryption.password, iv: encryption.iv })
      .then((response) => {
        setDecryptedPasswords((prevState) => ({
          ...prevState,
          [encryption.id]: response.data,
        }));
        setIsDecrypting(false);
      })
      .catch((error) => {
        console.error("Error decrypting password:", error);
        setIsDecrypting(false);
        toast.error("Failed to decrypt password. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  const toggleDecryptedPassword = (id) => {
    setDecryptedPasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      <div className="addPass">
        <div className="addingPassword">
          <input
            type="text"
            placeholder="Eg.Netflix, Facebook"
            value={website}
            onChange={(event) => {
              setWebsite(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Eg. Username098"
            value={account}
            onChange={(event) => {
              setAccount(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Eg. Password123$"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button className="btn--add" onClick={addPassword}>
            Add Password
          </button>
        </div>
      </div>

      <div className="headName">
        <h1>My Passwords</h1>
      </div>

      <PasswordBox
        passwordList={Listpasswords}
        decryptedPasswords={decryptedPasswords}
        toggleDecryptedPassword={toggleDecryptedPassword}
        decryptPassword={decryptPassword}
        onDelete={deletePassword}
      />

      {/* Add the ToastContainer at the bottom of the component */}
      <ToastContainer />
    </div>
  );
}

export default PasswordVault;
