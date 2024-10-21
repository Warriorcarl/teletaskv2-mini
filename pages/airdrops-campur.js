import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const AirdropsCampur = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/get-tasks');
      const data = await response.json();
      setTasks(data.tasks.filter(task => task.menu === 'airdrop-campur'));
    }

    fetchTasks();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Airdrop Campur
      </Typography>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <Box key={task._id} sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Typography sx={{ color: 'white' }}>{task.text}</Typography>
          </Box>
        ))
      ) : (
        <Typography sx={{ color: 'white' }}>Tidak ada tugas campur.</Typography>
      )}
    </Box>
  );
};

export default AirdropsCampur;
