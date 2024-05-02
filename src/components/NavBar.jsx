import { Box, Flex, Text, Link } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box bg="blue.500" color="white" p={4}>
      <Flex justify="space-between" align="center" maxW="1200px" m="0 auto">
        <Text fontSize="lg" fontWeight="bold">Todo App</Text>
        <Flex>
          <Link p={2} href="/" _hover={{ textDecoration: 'none', bg: 'blue.600' }}>Home</Link>
          <Link p={2} href="/about" _hover={{ textDecoration: 'none', bg: 'blue.600' }}>About</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;