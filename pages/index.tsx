import { useEffect } from 'react'
import { Box, Button, Flex, Grid, Heading, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { FiBookOpen, FiCalendar, FiCheckCircle, FiHeart } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuthStore } from '../src/store/use-auth-store'
import Nav from '../src/components/common/Nav'

export default function Home() {
  const { currentUser, initAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  const features = [
    {
      icon: FiBookOpen,
      title: '性格测试',
      description: '探索你的性格类型，了解自己的优势和潜力',
      path: '/test',
    },
    {
      icon: FiCalendar,
      title: '电子日记',
      description: '记录生活点滴，保存珍贵回忆',
      path: '/diary',
    },
    {
      icon: FiCheckCircle,
      title: '习惯打卡',
      description: '养成良好习惯，实现自我提升',
      path: '/habit',
    },
  ]

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="1200px" mx="auto" px={4} py={12}>
        <Flex direction="column" alignItems="center" textAlign="center" mb={12}>
          <Box mb={4}>
            <Icon as={FiHeart} color="primary.500" w={12} h={12} />
          </Box>
          <Heading as="h1" size="2xl" mb={4}>
            欢迎来到明珠驿站
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="md">
            探索自我，记录生活，养成习惯。开启你的成长之旅。
          </Text>
          
          {!currentUser && (
            <Button mt={6} colorScheme="primary" size="lg" onClick={() => router.push('/auth/login')}>
              立即开始
            </Button>
          )}
        </Flex>

        <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          {features.map((feature) => {
            return (
              <Box
                key={feature.path}
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="lg"
                boxShadow={useColorModeValue('md', 'dark-lg')}
                cursor="pointer"
                _hover={{ transform: 'translateY(-4px)', transition: 'transform 0.2s' }}
                onClick={() => router.push(feature.path)}
              >
                <Box mb={4}>
                  <Icon as={feature.icon} color="primary.500" w={8} h={8} />
                </Box>
                <Heading as="h3" size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">
                  {feature.description}
                </Text>
              </Box>
            )
          })}
        </Grid>

        <Box mt={12} p={8} bg={useColorModeValue('white', 'gray.800')} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')}>
          <Heading as="h2" size="xl" mb={4} textAlign="center">
            为什么选择明珠驿站
          </Heading>
          <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="primary.500" mb={2}>5+</Text>
              <Text color="gray.600">性格测试类型</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="primary.500" mb={2}>无限</Text>
              <Text color="gray.600">日记存储空间</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="primary.500" mb={2}>安全</Text>
              <Text color="gray.600">本地数据存储</Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
