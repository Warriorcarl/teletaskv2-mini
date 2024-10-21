import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

const MainMenu = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => router.push('/airdrops-new')}
      >
        Airdrop Baru
      </Button>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => router.push('/airdrops-daily')}
      >
        Airdrop Daily
      </Button>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => router.push('/airdrops-testnet')}
      >
        Airdrop Testnet
      </Button>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => router.push('/airdrops-campur')}
      >
        Airdrop Campur
      </Button>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={() => router.push('/settings')}
      >
        Pengaturan
      </Button>
    </Box>
  );
};

export default MainMenu;
