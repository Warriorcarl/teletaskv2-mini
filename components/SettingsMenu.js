import { Button, Box } from '@mui/material';
import { Edit, Add, Palette } from '@mui/icons-material';

const SettingsMenu = ({ onEditMenu, onEditPosition, onEditAppearance }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Button
        variant="contained"
        startIcon={<Edit />}
        sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
        onClick={onEditMenu}
      >
        Atur Nama Menu
      </Button>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
        onClick={onEditPosition}
      >
        Atur Posisi Menu (Drag & Drop)
      </Button>
      <Button
        variant="contained"
        startIcon={<Palette />}
        sx={{ mb: 2, width: '100%', padding: 2, fontSize: '18px' }}
        onClick={onEditAppearance}
      >
        Atur Warna/Ikon
      </Button>
    </Box>
  );
};

export default SettingsMenu;