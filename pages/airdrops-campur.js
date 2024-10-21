import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Untuk tombol kembali

const AirdropsCampurPage = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/campur-tasks'); // Endpoint untuk mendapatkan data dari MongoDB
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Airdrop Campur
      </Typography>

      {tasks.length === 0 ? (
        <Typography sx={{ color: 'white' }}>Tidak ada tugas airdrop Campur.</Typography>
      ) : (
        tasks.map((task) => (
          <Box key={task.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#333', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Typography sx={{ color: 'white' }}>{task.content}</Typography>
            <Typography sx={{ color: 'white' }}>Dari: {task.channelName} | Diposting pada: {task.postDate}</Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default AirdropsCampurPage;
