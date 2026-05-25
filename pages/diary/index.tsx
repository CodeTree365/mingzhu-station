import { useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Icon, Input, Text, useColorModeValue } from '@chakra-ui/react'
import { FiCalendar, FiFilter, FiPlus, FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../src/store/use-auth-store'
import { useDiaryStore } from '../../src/store/use-diary-store'
import Nav from '../../src/components/common/Nav'
import dayjs from 'dayjs'

const MOODS = [
  { id: 'happy', emoji: '😊', label: '开心' },
  { id: 'sad', emoji: '😢', label: '难过' },
  { id: 'angry', emoji: '😠', label: '生气' },
  { id: 'anxious', emoji: '😰', label: '焦虑' },
  { id: 'excited', emoji: '🤩', label: '兴奋' },
  { id: 'tired', emoji: '😴', label: '疲惫' },
  { id: 'peaceful', emoji: '😌', label: '平静' },
  { id: 'confused', emoji: '😕', label: '困惑' },
]

export default function DiaryPage() {
  const router = useRouter()
  const { currentUser, initAuth } = useAuthStore()
  const { diaries, loadDiaries, deleteDiary } = useDiaryStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMood, setSelectedMood] = useState('all')

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (currentUser) {
      loadDiaries(currentUser.id)
    }
  }, [currentUser, loadDiaries])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const filteredDiaries = diaries.filter((diary) => {
    const matchesSearch = diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diary.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMood = selectedMood === 'all' || diary.mood === selectedMood
    return matchesSearch && matchesMood
  })

  const getMoodEmoji = (mood: string) => {
    const moodItem = MOODS.find(m => m.id === mood)
    return moodItem?.emoji || '📝'
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h1" size="2xl">
            我的日记
          </Heading>
          <Button colorScheme="primary" onClick={() => router.push('/diary/new')}>
            <Icon as={FiPlus} mr={2} />
            写日记
          </Button>
        </Flex>

        <Flex gap={4} mb={6}>
          <Box position="relative" flex={1}>
            <Icon as={FiSearch} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" />
            <Input
              placeholder="搜索日记..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pl={10}
            />
          </Box>
          
          <Box position="relative">
            <Icon as={FiFilter} position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" />
            <select
              className="chakra-select css-13cymwt"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              style={{
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                height: '40px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
              }}
            >
              <option value="all">全部心情</option>
              {MOODS.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.emoji} {mood.label}
                </option>
              ))}
            </select>
          </Box>
        </Flex>

        {filteredDiaries.length === 0 ? (
          <Box bg={useColorModeValue('white', 'gray.800')} p={12} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} textAlign="center">
            <Text fontSize="lg" color="gray.500">
              暂无日记
            </Text>
            <Button mt={4} colorScheme="primary" onClick={() => router.push('/diary/new')}>
              写第一篇日记
            </Button>
          </Box>
        ) : (
          <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
            {filteredDiaries.map((diary) => (
              <Box
                key={diary.id}
                bg={useColorModeValue('white', 'gray.800')}
                p={6}
                borderRadius="lg"
                boxShadow={useColorModeValue('md', 'dark-lg')}
                cursor="pointer"
                _hover={{ transform: 'translateY(-4px)', transition: 'transform 0.2s' }}
                onClick={() => router.push(`/diary/${diary.id}`)}
              >
                <Flex justify="space-between" align="center" mb={3}>
                  <Text fontSize="2xl">{getMoodEmoji(diary.mood)}</Text>
                  <Text fontSize="sm" color="gray.500" display="flex" alignItems="center">
                    <Icon as={FiCalendar} mr={1} />
                    {dayjs(diary.createdAt).format('YYYY-MM-DD')}
                  </Text>
                </Flex>
                <Heading as="h3" size="md" mb={2}>{diary.title}</Heading>
                <Text color="gray.600" noOfLines={3}>
                  {diary.content}
                </Text>
              </Box>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}
