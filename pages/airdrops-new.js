import { useEffect, useState } from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

const AirdropsNew = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter(); // Untuk navigasi kembali

  // Fetch data tugas baru dari API
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/get-tasks'); // Panggil API untuk mengambil data tugas
      const data = await response.json();
      setTasks(data.tasks);
    }

    fetchTasks();
  }, []);

  // Fungsi untuk memindahkan tugas ke sub-menu lain
  const moveToMenu = async (taskId, menu) => {
    const response = await fetch('/api/move-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, menu }),
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task._id !== taskId)); // Update tampilan setelah tugas dipindahkan
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',  // Konten dimulai dari atas
        minHeight: '100vh',
        backgroundColor: '#000',
        textAlign: 'center',
        paddingTop: '10vh',            // Jarak dari atas untuk judul
        position: 'relative',          // Untuk memastikan tombol kembali tetap di atas
      }}
    >
      {/* Tombol kembali */}
      <IconButton onClick={() => router.back()} sx={{ position: 'absolute', top: 20, left: 20 }}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>

      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Airdrop Baru
      </Typography>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <Box key={task._id} sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Typography sx={{ color: 'white' }}>{task.text}</Typography>
            <a href={task.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4caf50' }}>
              Lihat di Channel
            </a>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Diposting pada: {new Date(task.createdAt).toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              onClick={() => moveToMenu(task._id, 'airdrop-daily')}
              sx={{ marginTop: 2 }}
            >
              Pindah ke Airdrop Daily
            </Button>
          </Box>
        ))
      ) : (
        <Typography sx={{ color: 'white' }}>Tidak ada airdrop baru.</Typography>
      )}
    </Box>
  );
};

export default AirdropsNew;
