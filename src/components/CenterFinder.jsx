import { useState } from "react";

function CenterFinder() {
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);

  const centers = [
    {
      name: "Apollo Vaccination Center",
      location: "Koramangala, Bengaluru",
      vaccines: "Covaxin, Covishield",
      slots: "10:00 AM, 2:00 PM, 4:00 PM",
    },
    {
      name: "City Care Hospital",
      location: "Indiranagar, Bengaluru",
      vaccines: "Covishield",
      slots: "11:00 AM, 3:00 PM",
    },
    {
      name: "Government Health Center",
      location: "Whitefield, Bengaluru",
      vaccines: "Covaxin, Covishield",
      slots: "9:00 AM, 1:00 PM",
    },
  ];

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div className="center-finder">
      <h1>📍 Vaccination Center Finder</h1>

      <p>Find vaccination centers near you</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city, area or PIN code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {searched && (
        <div className="center-list">
          <h2>Available Vaccination Centers</h2>

          {centers.map((center, index) => (
            <div className="center-card" key={index}>
              <h3>🏥 {center.name}</h3>

              <p>📍 {center.location}</p>

              <p>💉 {center.vaccines}</p>

              <p>🕐 {center.slots}</p>

              <button>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CenterFinder;