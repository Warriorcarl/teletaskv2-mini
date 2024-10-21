import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  // Menggunakan useRouter untuk mengelola tombol kembali
import { Box, Typography, Button, IconButton } from '@mui/material';  // Mengembalikan komponen MUI
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Ikon back dari MUI

const AirdropsNew = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();  // Untuk navigasi kembali ke halaman utama

  // Fungsi untuk mengambil data tugas dari API
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/get-tasks');  // Memanggil API untuk mendapatkan tugas-tugas yang belum dipindahkan
      const data = await response.json();
      setTasks(data.tasks);
    }

    fetchTasks();
  }, []);

  // Fungsi untuk memindahkan tugas ke menu/submenu yang dipilih
  const moveToMenu = async (taskId, menu) => {
    const response = await fetch('/api/move-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, menu }),  // Mengirim data taskId dan menu tujuan
    });

    if (response.ok) {
      // Hapus tugas dari tampilan setelah berhasil dipindahkan
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Tombol Kembali */}
      <IconButton onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <ArrowBackIcon sx={{ color: 'white' }} /> {/* Menggunakan ikon back dari Material UI */}
      </IconButton>

      <Typography variant="h3" sx={{ color: 'white', marginBottom: 3 }}>
        Airdrop Baru
      </Typography>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Box key={task._id} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#333', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Typography sx={{ color: 'white' }}>{task.text}</Typography>
            <a href={task.link} target="_blank" rel="noopener noreferrer" style={{ color: 'cyan' }}>Lihat di Channel</a>
            <br />
            <Typography sx={{ color: 'white' }}>Diposting pada: {new Date(task.createdAt).toLocaleString()}</Typography>

            {/* Dropdown untuk memilih submenu tujuan */}
            <select onChange={(e) => moveToMenu(task._id, e.target.value)} defaultValue="" style={{ marginTop: '10px', padding: '5px' }}>
              <option value="" disabled>Pilih menu</option>
              <option value="airdrop-daily">Airdrop Daily</option>
              <option value="airdrop-testnet">Airdrop Testnet</option>
              <option value="airdrop-campur">Airdrop Campur</option>
            </select>
          </Box>
        ))
      ) : (
        <Typography sx={{ color: 'white' }}>Tidak ada airdrop baru.</Typography>
      )}
    </Box>
  );
};

export default AirdropsNew;
