import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Untuk tombol kembali

const AirdropsInfoPage = () => {
  const [updates, setUpdates] = useState([]);
  const router = useRouter(); // Mengatur navigasi tombol kembali

  useEffect(() => {
    // Fetch updates from your backend/database
    async function fetchUpdates() {
      const response = await fetch('/api/updates'); // Modify to your API endpoint
      const data = await response.json();
      setUpdates(data);
    }
    fetchUpdates();
  }, []);

  const handleCombineWithTask = async (updateId, taskId) => {
    // Combine the update with a task
    await fetch(`/api/combine-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateId, taskId }),
    });
    // Update frontend to reflect changes
    setUpdates(updates.filter((update) => update.id !== updateId));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Info Baru Airdrop
      </Typography>

      {updates.length === 0 ? (
        <Typography sx={{ color: 'white' }}>Tidak ada info baru.</Typography>
      ) : (
        updates.map((update) => (
          <Box key={update.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#333', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{update.title}</Typography>
            <Typography sx={{ color: 'white' }}>{update.content}</Typography>
            <Button variant="contained" onClick={() => handleCombineWithTask(update.id, update.taskId)}>
              Gabungkan dengan Tugas
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default AirdropsInfoPage;
