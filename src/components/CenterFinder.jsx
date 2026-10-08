import "../App.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function CenterFinder() {
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCenters = async () => {
      const { data, error } = await supabase
        .from("centers")
        .select("id, name, location, phone")
        .eq("is_active", true);

      if (error) {
        setError(error.message);
        return;
      }

      setCenters(data || []);
    };

    loadCenters();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setSearched(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const uniqueCenters = Array.from(
  new Map(
    centers.map((center) => [
      `${center.name}-${center.location}`,
      center,
    ])
  ).values()
);

const filteredCenters = uniqueCenters.filter((center) => {
  const searchText = location.toLowerCase().trim();

  if (!searchText) {
    return true;
  }

  return (
    center.name.toLowerCase().includes(searchText) ||
    center.location.toLowerCase().includes(searchText)
  );
});

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

  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
  >
    <option value="">Select Location</option>

    {Array.from(
      new Set(centers.map((center) => center.location))
    ).map((place) => (
      <option key={place} value={place}>
        {place}
      </option>
    ))}
  </select>

  <button onClick={handleSearch}>
    Search
  </button>
</div>

      {error && (
        <p style={{ color: "#b42318" }}>
          {error}
        </p>
      )}

      {searched && (
        <div className="center-list">
          <h2>Available Vaccination Centers</h2>

          {loading ? (
            <p>Searching centers...</p>
          ) : filteredCenters.length === 0 ? (
            <p>No vaccination centers found for "{location}".</p>
          ) : (
            filteredCenters.map((center) => (
              <div className="center-card" key={center.id}>
                <h3>🏥 {center.name}</h3>

                <p>📍 {center.location}</p>

                <p>
                  📞 {center.phone || "Phone number not available"}
                </p>

                <button
                  onClick={() =>
                    alert(
                      `Center: ${center.name}\nLocation: ${center.location}\nPhone: ${
                        center.phone || "Not available"
                      }`
                    )
                  }
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default CenterFinder;