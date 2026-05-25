import { useEffect, useState } from 'react'
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, Heading, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react'
import { FiArrowLeft, FiCalendar, FiTrendingUp } from 'react-icons/fi'
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

export default function HabitStatsPage() {
  const router = useRouter()
  const { currentUser, initAuth } = useAuthStore()
  const { habits, loadHabits, getHabitStats } = useHabitStore()
  const [stats, setStats] = useState<Record<string, { completed: number; total: number; streak: number }>>({})
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('week')

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
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 90
    const fetchStats = async () => {
      const newStats: Record<string, { completed: number; total: number; streak: number }> = {}
      for (const habit of habits) {
        const stat = await getHabitStats(habit.id, days)
        newStats[habit.id] = stat
      }
      setStats(newStats)
    }
    fetchStats()
  }, [habits, getHabitStats, period])

  if (!currentUser) {
    return null
  }

  const getIcon = (iconId: string) => {
    const icon = HABIT_ICONS.find(i => i.id === iconId)
    return icon?.emoji || '📌'
  }

  const getPeriodLabel = () => {
    const map = {
      week: '本周',
      month: '本月',
      quarter: '本季度',
    }
    return map[period]
  }

  const totalCompleted = Object.values(stats).reduce((sum, s) => sum + s.completed, 0)
  const totalTotal = Object.values(stats).reduce((sum, s) => sum + s.total, 0)
  const overallRate = totalTotal > 0 ? Math.round((totalCompleted / totalTotal) * 100) : 0

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center" gap={4}>
            <Button variant="ghost" onClick={() => router.push('/habit')}>
              <Icon as={FiArrowLeft} />
            </Button>
            <Heading as="h1" size="2xl">
              习惯统计
            </Heading>
          </Flex>
          <Flex gap={2}>
            {(['week', 'month', 'quarter'] as const).map((p) => (
              <Button
                key={p}
                variant={period === p ? 'solid' : 'outline'}
                colorScheme={period === p ? 'primary' : 'gray'}
                onClick={() => setPeriod(p)}
              >
                {p === 'week' ? '周' : p === 'month' ? '月' : '季度'}
              </Button>
            ))}
          </Flex>
        </Flex>

        <Card bg={useColorModeValue('white', 'gray.800')} boxShadow={useColorModeValue('md', 'dark-lg')} mb={6}>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={2}>
                <Icon as={FiTrendingUp} size={24} />
                <Heading as="h3" size="lg">{getPeriodLabel()}总览</Heading>
              </Flex>
              <Text color="gray.500" display="flex" alignItems="center">
                <Icon as={FiCalendar} mr={1} />
                {dayjs().format('YYYY年MM月')}
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex justify="space-around">
              <Box textAlign="center">
                <Text fontSize="4xl" fontWeight="bold" color="primary.600">{overallRate}%</Text>
                <Text color="gray.500">完成率</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="4xl" fontWeight="bold" color="green.600">{totalCompleted}</Text>
                <Text color="gray.500">已完成次数</Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="4xl" fontWeight="bold" color="orange.600">
                  {Object.values(stats).reduce((max, s) => Math.max(max, s.streak), 0)}
                </Text>
                <Text color="gray.500">最长连续天数</Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
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
                    <Flex align="center" gap={3}>
                      <Text fontSize="3xl">{getIcon(habit.icon)}</Text>
                      <Heading as="h3" size="md">{habit.name}</Heading>
                    </Flex>
                    {stat && stat.streak > 0 && (
                      <Text color="orange.500" fontWeight="bold">🔥 {stat.streak}天</Text>
                    )}
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Progress value={completionRate} mb={3} />
                  <Flex justify="space-between">
                    <Text color="gray.500">{getPeriodLabel()}完成率</Text>
                    <Text fontWeight="bold" color="primary.600">{completionRate}%</Text>
                  </Flex>
                  <Text color="gray.400" fontSize="sm" mt={2}>
                    已完成 {stat?.completed || 0} / {stat?.total || 0} 次
                  </Text>
                </CardBody>
              </Card>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
