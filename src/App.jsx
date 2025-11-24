import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [dataUser, setDataUser] = useState(null);

  // Ini logic ambil data dari API Eksternal
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setDataUser(response.data);
      })
      .catch((error) => {
        console.error("Error mengambil data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Tugas Team Based Project</h1>
      <h2>Integrasi API Eksternal</h2>

      {/* Tampilkan data kalau sudah berhasil diambil */}
      {dataUser ? (
        <div
          style={{
            border: "1px solid white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <p>
            <strong>Nama:</strong> {dataUser.name}
          </p>
          <p>
            <strong>Email:</strong> {dataUser.email}
          </p>
          <p>
            <strong>Kota:</strong> {dataUser.address.city}
          </p>
        </div>
      ) : (
        <p>Sedang memuat data API...</p>
      )}
    </div>
  );
}

export default App;
