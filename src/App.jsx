import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [dataUser, setDataUser] = useState(null)
  // 1. Ini State buat mengatur Menu mana yang aktif
  const [activeMenu, setActiveMenu] = useState('dashboard')

  useEffect(() => {
    // Ganti angka 1 jadi 2, 3, dst buat ganti orang (Data API)
    axios.get('https://jsonplaceholder.typicode.com/users/3')
      .then(response => {
        setDataUser(response.data)
      })
      .catch(error => {
        console.error("Error mengambil data:", error)
      })
  }, [])

  // Fungsi untuk merubah konten berdasarkan menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="stats-grid">
            {/* Kartu Profil API */}
            <div className="card">
              <h3>PROFIL PENGGUNA (LIVE API)</h3>
              {dataUser ? (
                <>
                  <div className="data-value">{dataUser.name}</div>
                  <p style={{color: '#94a3b8', fontSize: '14px'}}>{dataUser.email}</p>
                  <p style={{marginTop: '10px'}}>Kota: {dataUser.address.city}</p>
                  <span className="status-badge status-active">Terhubung API</span>
                </>
              ) : <p>Loading...</p>}
            </div>

            {/* Kartu Skor */}
            <div className="card">
              <h3>SKOR POSTUR TUBUH</h3>
              <div className="data-value" style={{color: '#4ade80'}}>Perfect Score</div>
              <p style={{color: '#94a3b8', fontSize: '13px', marginTop: '5px'}}>Posisi duduk sangat baik.</p>
            </div>

            {/* Kartu Durasi */}
            <div className="card">
              <h3>DURASI DUDUK</h3>
              <div className="data-value">4 Jam 20 Menit</div>
              <p style={{color: '#facc15', fontSize: '13px', marginTop: '5px'}}>Waktunya peregangan!</p>
            </div>

            {/* Kartu Status */}
            <div className="card">
              <h3>STATUS SISTEM</h3>
              <div className="data-value">Online</div>
              <div style={{marginTop: '10px', fontSize: '14px', color: '#94a3b8'}}>
                Camera: <span style={{color:'#4ade80'}}>Active</span><br/>
                AI Engine: <span style={{color:'#4ade80'}}>Running</span>
              </div>
            </div>
          </div>
        )
      
      case 'riwayat':
        return (
          <div className="card">
            <h3>Riwayat Deteksi Hari Ini</h3>
            <ul style={{marginTop: '20px', listStyle: 'none', color: '#cbd5e1'}}>
              <li style={{marginBottom:'10px'}}>🕒 08:00 - <span style={{color:'#4ade80'}}>Postur Baik</span></li>
              <li style={{marginBottom:'10px'}}>🕒 09:30 - <span style={{color:'#f87171'}}>Terdeteksi Bungkuk</span></li>
              <li style={{marginBottom:'10px'}}>🕒 10:15 - <span style={{color:'#4ade80'}}>Postur Baik</span></li>
            </ul>
          </div>
        )

      case 'analisis':
        return (
          <div className="card">
            <h3>Analisis AI</h3>
            <p style={{marginTop: '10px', color:'#94a3b8'}}>
              Berdasarkan data minggu ini, kecenderungan bungkuk Anda terjadi pada jam 2 siang.
              Disarankan melakukan stretching setiap 30 menit.
            </p>
          </div>
        )
        
      case 'pengaturan':
        return (
          <div className="card">
            <h3>Pengaturan Aplikasi</h3>
            <p>Versi Aplikasi: v1.0.0 (Beta)</p>
            <button style={{marginTop:'15px', padding:'10px 20px', backgroundColor:'#ef4444', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>Logout</button>
          </div>
        )

      default:
        return <div>Halaman tidak ditemukan</div>
    }
  }

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">🤖 Posture AI</div>
        
        {/* Menu Items sekarang bisa diklik */}
        <div 
          className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveMenu('dashboard')}
        >
          Dashboard
        </div>
        <div 
          className={`menu-item ${activeMenu === 'riwayat' ? 'active' : ''}`}
          onClick={() => setActiveMenu('riwayat')}
        >
          Riwayat Deteksi
        </div>
        <div 
          className={`menu-item ${activeMenu === 'analisis' ? 'active' : ''}`}
          onClick={() => setActiveMenu('analisis')}
        >
          Analisis Postur
        </div>
        <div 
          className={`menu-item ${activeMenu === 'pengaturan' ? 'active' : ''}`}
          onClick={() => setActiveMenu('pengaturan')}
        >
          Pengaturan
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="main-content">
        <header>
          {/* Judul berubah sesuai menu */}
          <h1>{activeMenu === 'dashboard' ? 'Monitoring Real-Time' : activeMenu.toUpperCase()}</h1>
          <p className="subtitle">Sistem Deteksi Kesehatan Postur Tubuh Berbasis AI</p>
        </header>

        {/* Ini yang menampilkan isi halaman berubah-ubah */}
        {renderContent()}
        
      </main>
    </div>
  )
}

export default App