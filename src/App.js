import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [userData, setUserData] = useState(null);
  const fetchAPI = async () => {
    try {
      const res = await fetch(
        "https://randomuser.me/api/?page=1&results=1&seed=abc"
      );
      const data = await res.json();
      const user = data.results[0];
      const { name, picture, location, phone, gender } = user;
      const dobDate = new Date(data.results[0].dob.date);
      const dobFormatted = dobDate.toISOString().split("T")[0];
      const userData = {
        firstName: name.first,
        lastName: name.last,
        gender: gender,
        dob: dobFormatted,
        phone: phone,
        photo: picture.large,
        address:
          location.street.name + ", " + location.city + ", " + location.country,
      };

      setUserData(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      {userData && (
        <div className="card">
          <div className="image">
            <img src={userData.photo} alt="User" />
          </div>
          <div className="info">
            <p>
              <span className="title">Name: </span> {userData.firstName}{" "}
              {userData.lastName}
            </p>
            <p>
              <span className="title">Gender: </span>
              {userData.gender}
            </p>
            <p>
              <span className="title">DOB: </span>
              {userData.dob}
            </p>
            <p>
              <span className="title">Phone Number: </span>
              {userData.phone}
            </p>
            <p>
              <span className="title">Address: </span>
              {userData.address}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
