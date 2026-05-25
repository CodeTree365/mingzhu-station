import { useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Avatar,
  Icon,
} from '@chakra-ui/react'
import { FiHome, FiBookOpen, FiCalendar, FiUser, FiMenu, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '../../store/use-auth-store'
import { useRouter } from 'next/router'

export default function Nav() {
  const { currentUser, logout } = useAuthStore()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const navItems = [
    { icon: FiHome, label: '首页', path: '/' },
    { icon: FiBookOpen, label: '性格测试', path: '/test' },
    { icon: FiCalendar, label: '日记本', path: '/diary' },
    { icon: FiUser, label: '习惯打卡', path: '/habit' },
  ]

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={useColorModeValue('1px solid gray.200', '1px solid gray.700')}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex maxW="1200px" mx="auto" px={4} h={16} alignItems="center" justifyContent="space-between">
        <Box fontSize="xl" fontWeight="bold" color="primary.600" cursor="pointer" onClick={() => router.push('/')}>
          明珠驿站
        </Box>

        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={router.pathname === item.path ? 'solid' : 'ghost'}
              colorScheme={router.pathname === item.path ? 'primary' : 'gray'}
              onClick={() => router.push(item.path)}
            >
              <Icon as={item.icon} mr={2} w={5} h={5} />
              {item.label}
            </Button>
          ))}
        </HStack>

        <Flex alignItems="center" gap={3}>
          {currentUser ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="ghost"
                  cursor="pointer"
                  minW="44px"
                  h="44px"
                >
                  <Avatar name={currentUser.name} size="md" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>
                    <Icon as={FiLogOut} mr={2} w={5} h={5} />
                    退出登录
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Button colorScheme="primary" onClick={() => router.push('/auth/login')}>
              登录
            </Button>
          )}

          <Button
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon as={FiMenu} w={5} h={5} />
          </Button>
        </Flex>
      </Flex>

      {isMenuOpen && (
        <Box display={{ md: 'none' }} pb={4} px={4} borderTop={useColorModeValue('1px solid gray.200', '1px solid gray.700')}>
          <HStack spacing={2} direction="column">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={router.pathname === item.path ? 'solid' : 'ghost'}
                colorScheme={router.pathname === item.path ? 'primary' : 'gray'}
                onClick={() => {
                  router.push(item.path)
                  setIsMenuOpen(false)
                }}
                justifyContent="flex-start"
              >
                <Icon as={item.icon} mr={2} w={5} h={5} />
                {item.label}
              </Button>
            ))}
          </HStack>
        </Box>
      )}
    </Box>
  )
}
