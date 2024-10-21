import { Box, Typography, Button, IconButton, Tabs, Tab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AirdropsDailyPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch daily tasks from your backend
    async function fetchTasks() {
      const response = await fetch('/api/daily-tasks');
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    // Mark task as completed
    await fetch(`/api/complete-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId }),
    });
    // Update UI to move task to completed
    setTasks(tasks.map(task => task._id === taskId ? { ...task, completed: true } : task));
  };

  const handleResetTasks = async () => {
    // Reset tasks at the end of the day
    await fetch('/api/reset-tasks');
    // Refresh tasks
    setTasks(tasks.map(task => ({ ...task, completed: false })));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Airdrop Daily
      </Typography>

      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Belum Dikerjakan" />
        <Tab label="Sudah Dikerjakan" />
      </Tabs>

      <Box>
        {tabIndex === 0 && tasks.filter(task => !task.completed).map(task => (
          <Box key={task.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#333', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Button variant="contained" onClick={() => handleCompleteTask(task.id)}>
              Tandai Selesai
            </Button>
          </Box>
        ))}
        {tabIndex === 1 && tasks.filter(task => task.completed).map(task => (
          <Box key={task.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#333', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
          </Box>
        ))}
      </Box>

      <Button variant="contained" onClick={handleResetTasks}>
        Reset Tugas Harian
      </Button>
    </Box>
  );
};

export default AirdropsDailyPage;
