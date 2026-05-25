import { useEffect, useState } from 'react'
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, Heading, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react'
import { FiPlus, FiCheckCircle, FiCalendar } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../src/store/use-auth-store'
import { useHabitStore } from '../../src/store/use-habit-store'
import Nav from '../../src/components/common/Nav'
import dayjs from 'dayjs'

const HABIT_ICONS = [
  { id: 'book', emoji: '📚' },
  { id: 'heart', emoji: '❤️' },
  { id: 'dumbbell', emoji: '🏋️' },
  { id: 'moon', emoji: '🌙' },
  { id: 'droplet', emoji: '💧' },
  { id: 'apple', emoji: '🍎' },
  { id: 'bike', emoji: '🚴' },
  { id: 'music', emoji: '🎵' },
  { id: 'pencil', emoji: '✏️' },
  { id: 'target', emoji: '🎯' },
]

export default function HabitPage() {
  const router = useRouter()
  const { currentUser, initAuth } = useAuthStore()
  const { habits, loadHabits, toggleHabit, getHabitStats } = useHabitStore()
  const [stats, setStats] = useState<Record<string, { completed: number; total: number; streak: number }>>({})
  const [today] = useState(dayjs().format('YYYY-MM-DD'))

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (currentUser) {
      loadHabits(currentUser.id)
    }
  }, [currentUser, loadHabits])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  useEffect(() => {
    const fetchStats = async () => {
      const newStats: Record<string, { completed: number; total: number; streak: number }> = {}
      for (const habit of habits) {
        const stat = await getHabitStats(habit.id, 7)
        newStats[habit.id] = stat
      }
      setStats(newStats)
    }
    fetchStats()
  }, [habits, getHabitStats])

  if (!currentUser) {
    return null
  }

  const getIcon = (iconId: string) => {
    const icon = HABIT_ICONS.find(i => i.id === iconId)
    return icon?.emoji || '📌'
  }

  const getFrequencyText = (frequency: string) => {
    const map: Record<string, string> = {
      daily: '每天',
      weekly: '每周',
      monthly: '每月',
    }
    return map[frequency] || frequency
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h1" size="2xl">
            习惯打卡
          </Heading>
          <Button colorScheme="primary" onClick={() => router.push('/habit/new')}>
            <Icon as={FiPlus} mr={2} />
            添加习惯
          </Button>
        </Flex>

        {habits.length === 0 ? (
          <Box bg={useColorModeValue('white', 'gray.800')} p={12} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} textAlign="center">
            <Text fontSize="lg" color="gray.500">
              暂无习惯
            </Text>
            <Button mt={4} colorScheme="primary" onClick={() => router.push('/habit/new')}>
              创建第一个习惯
            </Button>
          </Box>
        ) : (
          <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {habits.map((habit) => {
              const stat = stats[habit.id]
              const completionRate = stat ? Math.round((stat.completed / stat.total) * 100) : 0
              
              return (
                <Card
                  key={habit.id}
                  bg={useColorModeValue('white', 'gray.800')}
                  boxShadow={useColorModeValue('md', 'dark-lg')}
                >
                  <CardHeader>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="3xl">{getIcon(habit.icon)}</Text>
                      <Button
                        onClick={() => toggleHabit(habit.id, today)}
                        colorScheme={stat?.completed === stat?.total ? 'green' : 'gray'}
                        size="sm"
                      >
                        <Icon as={FiCheckCircle} />
                      </Button>
                    </Flex>
                    <Heading as="h3" size="md" mt={2}>{habit.name}</Heading>
                    <Text fontSize="sm" color="gray.500">
                      <Icon as={FiCalendar} mr={1} />
                      {getFrequencyText(habit.frequency)}
                    </Text>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" mb={4}>{habit.description}</Text>
                    
                    <Progress value={completionRate} mb={2} />
                    <Flex justify="space-between" fontSize="sm">
                      <Text color="gray.500">本周完成率</Text>
                      <Text fontWeight="bold" color="primary.600">{completionRate}%</Text>
                    </Flex>
                    
                    {stat && stat.streak > 0 && (
                      <Flex align="center" mt={4} color="orange.500">
                        <Text>🔥 连续打卡 {stat.streak} 天</Text>
                      </Flex>
                    )}
                  </CardBody>
                </Card>
              )
            })}
          </Grid>
        )}
      </Box>
    </Box>
  )
}
