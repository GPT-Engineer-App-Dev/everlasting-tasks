import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast, Flex, Heading, Text } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { client } from 'lib/crud';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const fetchTasks = async () => {
    const data = await client.getWithPrefix('task:');
    if (data) {
      setTasks(data.map(item => ({ id: item.key.split(':')[1], ...item.value })));
    }
  };

  const addTask = async () => {
    if (input.trim() === '') {
      toast({
        title: 'No input',
        description: "You need to write something to add a task.",
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = { text: input, completed: false };
    const key = `task:${Date.now()}`;
    const success = await client.set(key, newTask);
    if (success) {
      fetchTasks();
      setInput('');
    }
  };

  const deleteTask = async (id) => {
    const success = await client.delete(`task:${id}`);
    if (success) {
      fetchTasks();
    }
  };

  const editTask = async (id, newText) => {
    const task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, text: newText };
    const success = await client.set(`task:${id}`, updatedTask);
    if (success) {
      fetchTasks();
    }
  };

  useState(() => {
    fetchTasks();
  }, []);

  return (
    <Box p={5}>
      <Flex direction="column" align="center" justify="center">
        <Heading mb={4}>Todo App</Heading>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            size="md"
          />
          <IconButton
            icon={<FaPlus />}
            onClick={addTask}
            colorScheme="blue"
            aria-label="Add task"
            ml={2}
          />
        </Flex>
        <List spacing={3} mt={4} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Text>{task.text}</Text>
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete task"
              />
              <IconButton
                icon={<FaEdit />}
                onClick={() => editTask(task.id, prompt('Edit task:', task.text))}
                colorScheme="green"
                aria-label="Edit task"
              />
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  );
};

export default Index;