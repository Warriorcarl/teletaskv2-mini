import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MainMenu from '../components/MainMenu';

const HomePage = () => {
  const [username, setUsername] = useState(null);
  const [queryId, setQueryId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      const user = tg.initDataUnsafe.user;
      if (user) {
        setUsername(user.username || user.first_name);
      }
      setQueryId(tg.initDataUnsafe.query_id);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#000' }}>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Welcome to Teletask
      </Typography>
      <Typography variant="h6" sx={{ color: 'white', marginBottom: 4 }}>
        {username ? `Hello, ${username}` : 'User not identified'}
      </Typography>
      <MainMenu />
    </Box>
  );
};

export default HomePage;