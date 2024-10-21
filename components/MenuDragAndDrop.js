import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

const MenuDragAndDrop = () => {
  const [menus, setMenus] = useState([
    { id: '1', name: 'Airdrop Baru' },
    { id: '2', name: 'Airdrop Daily' },
    { id: '3', name: 'Airdrop Testnet' },
    { id: '4', name: 'Airdrop Campur' },
    { id: '5', name: 'Pengaturan' },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = Array.from(menus);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    setMenus(newOrder);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="menus">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {menus.map((menu, index) => (
              <Draggable key={menu.id} draggableId={menu.id} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ marginBottom: 2, padding: 2, backgroundColor: '#333', borderRadius: 2 }}
                  >
                    <Typography sx={{ color: 'white' }}>{menu.name}</Typography>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MenuDragAndDrop;
