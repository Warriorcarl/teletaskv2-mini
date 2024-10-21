import { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';

const AirdropsDaily = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Fetch data tugas harian
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/get-tasks');  // Panggil API untuk mengambil data tugas
      const data = await response.json();
      setTasks(data.tasks.filter(task => !task.completed));  // Tugas yang belum dikerjakan
      setCompletedTasks(data.tasks.filter(task => task.completed));  // Tugas yang sudah dikerjakan
    }

    fetchTasks();
  }, []);

  // Fungsi untuk memindahkan tugas ke sub-menu "Sudah Dikerjakan"
  const markAsCompleted = async (taskId) => {
    const response = await fetch('/api/move-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, menu: 'completed', completed: true }), // Tandai sebagai completed
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task._id !== taskId));  // Hapus dari sub-menu "Belum Dikerjakan"
      const completedTask = tasks.find(task => task._id === taskId);
      setCompletedTasks([...completedTasks, completedTask]);  // Pindahkan ke "Sudah Dikerjakan"
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ color: 'white', marginBottom: 4 }}>
        Airdrop Daily - Belum Dikerjakan
      </Typography>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <Box key={task._id} sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Typography sx={{ color: 'white' }}>{task.text}</Typography>
            <Button
              variant="contained"
              onClick={() => markAsCompleted(task._id)}
              sx={{ marginTop: 2 }}
            >
              Tandai Sudah Dikerjakan
            </Button>
          </Box>
        ))
      ) : (
        <Typography sx={{ color: 'white' }}>Tidak ada tugas harian yang belum dikerjakan.</Typography>
      )}

      <Typography variant="h4" sx={{ color: 'white', marginTop: 6 }}>
        Airdrop Daily - Sudah Dikerjakan
      </Typography>
      {completedTasks.length > 0 ? (
        completedTasks.map(task => (
          <Box key={task._id} sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
            <Typography sx={{ color: 'white' }}>{task.text}</Typography>
          </Box>
        ))
      ) : (
        <Typography sx={{ color: 'white' }}>Belum ada tugas yang sudah dikerjakan.</Typography>
      )}
    </Box>
  );
};

export default AirdropsDaily;
