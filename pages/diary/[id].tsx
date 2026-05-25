import { useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Icon, Text, useToast } from '@chakra-ui/react'
import { FiArrowLeft, FiCalendar, FiDelete, FiEdit, FiShare2 } from 'react-icons/fi'
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

export default function DiaryDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { currentUser, initAuth } = useAuthStore()
  const { diaries, deleteDiary } = useDiaryStore()
  const toast = useToast()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  const diary = diaries.find(d => d.id === id)

  if (!currentUser || !diary) {
    return null
  }

  const moodInfo = MOODS.find(m => m.id === diary.mood)

  const handleDelete = () => {
    if (confirm('确定要删除这篇日记吗？')) {
      deleteDiary(diary.id)
      toast({
        title: '日记已删除',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/diary')
    }
  }

  const handleShare = () => {
    const text = `【${diary.title}】\n\n${diary.content}\n\n—— 来自明珠驿站`
    if (navigator.share) {
      navigator.share({
        title: diary.title,
        text,
      })
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: '内容已复制',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Nav />
      
      <Box maxW="800px" mx="auto" px={4} py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center" gap={4}>
            <Button variant="ghost" onClick={() => router.push('/diary')}>
              <FiArrowLeft />
            </Button>
            <Heading as="h1" size="2xl">
              {diary.title}
            </Heading>
          </Flex>
          <Flex gap={2}>
            <Button variant="ghost" onClick={handleShare}>
              <FiShare2 />
            </Button>
            <Button variant="ghost" onClick={() => router.push(`/diary/${diary.id}/edit`)}>
              <FiEdit />
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={handleDelete}>
              <FiDelete />
            </Button>
          </Flex>
        </Flex>

        <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
          <Flex justify="space-between" align="center" mb={6}>
            <Flex align="center" gap={4}>
              <Text fontSize="3xl">{moodInfo?.emoji}</Text>
              <Text color="gray.500" display="flex" alignItems="center">
                <Icon as={FiCalendar} mr={2} />
                {dayjs(diary.createdAt).format('YYYY年MM月DD日')}
              </Text>
            </Flex>
            <Text color="gray.400">
              {moodInfo?.label}
            </Text>
          </Flex>

          {diary.images.length > 0 && (
            <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} mb={6}>
              {diary.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </Grid>
          )}

          <Text fontSize="lg" lineHeight="1.8" whiteSpace="pre-wrap">
            {diary.content}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
