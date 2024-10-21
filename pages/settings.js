import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'; // Untuk navigasi kembali

const SettingsPage = () => {
  const router = useRouter(); // Navigasi kembali

  const handleSaveSettings = async () => {
    // Simpan pengaturan
    await fetch('/api/save-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ /* setting data */ }),
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Pengaturan
      </Typography>

      <Button variant="contained" sx={{ mb: 2, width: '100%' }} onClick={handleSaveSettings}>
        Atur Menu/Submenu
      </Button>
      <Button variant="contained" sx={{ mb: 2, width: '100%' }}>
        Atur Posisi Menu (Drag & Drop)
      </Button>
    </Box>
  );
};

export default SettingsPage;
