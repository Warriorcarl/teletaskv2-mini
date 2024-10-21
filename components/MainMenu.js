import { Button, Box, Container } from '@mui/material';
import { Home, Info, CloudDownload, Settings } from '@mui/icons-material';
import Link from 'next/link'; // Pastikan menggunakan Link dari Next.js

const MainMenu = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Link href="/airdrops-new" passHref>
          <Button
            variant="contained"
            startIcon={<CloudDownload />}
            sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
          >
            Airdrop Baru
          </Button>
        </Link>
        <Link href="/airdrops-info" passHref>
          <Button
            variant="contained"
            startIcon={<Info />}
            sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
          >
            Info Baru Airdrop
          </Button>
        </Link>
        <Link href="/airdrops-daily" passHref>
          <Button
            variant="contained"
            startIcon={<Home />}
            sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
          >
            Airdrop Daily
          </Button>
        </Link>
        <Link href="/airdrops-testnet" passHref>
          <Button
            variant="contained"
            startIcon={<Home />}
            sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
          >
            Airdrop Testnet
          </Button>
        </Link>
        <Link href="/airdrops-campur" passHref>
          <Button
            variant="contained"
            startIcon={<Home />}
            sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
          >
            Airdrop Campur
          </Button>
        </Link>
        <Link href="/settings" passHref>
          <Button
            variant="contained"
            startIcon={<Settings />}
            sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
          >
            Pengaturan
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default MainMenu;
