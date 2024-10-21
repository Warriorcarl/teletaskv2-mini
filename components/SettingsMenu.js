import { Button, Box, Container } from '@mui/material';
import { Edit, Add, Palette } from '@mui/icons-material';

const SettingsMenu = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <Button
          variant="contained"
          startIcon={<Edit />}
          sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
        >
          Atur Nama Menu
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
        >
          Atur Menu
        </Button>
        <Button
          variant="contained"
          startIcon={<Palette />}
          sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
        >
          Atur Warna
        </Button>
      </Box>
    </Container>
  );
};

export default SettingsMenu;
