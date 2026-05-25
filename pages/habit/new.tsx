import { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../src/store/use-auth-store'
import { useHabitStore } from '../../src/store/use-habit-store'
import Nav from '../../src/components/common/Nav'

const HABIT_ICONS = [
  { id: 'book', emoji: '📚', label: '阅读' },
  { id: 'heart', emoji: '❤️', label: '健康' },
  { id: 'dumbbell', emoji: '🏋️', label: '健身' },
  { id: 'moon', emoji: '🌙', label: '睡眠' },
  { id: 'droplet', emoji: '💧', label: '喝水' },
  { id: 'apple', emoji: '🍎', label: '饮食' },
  { id: 'bike', emoji: '🚴', label: '运动' },
  { id: 'music', emoji: '🎵', label: '音乐' },
  { id: 'pencil', emoji: '✏️', label: '写作' },
  { id: 'target', emoji: '🎯', label: '目标' },
]

const FREQUENCIES = [
  { id: 'daily', label: '每天' },
  { id: 'weekly', label: '每周' },
  { id: 'monthly', label: '每月' },
]

export default function NewHabitPage() {
  const router = useRouter()
  const { currentUser, initAuth } = useAuthStore()
  const { createHabit } = useHabitStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('book')
  const [frequency, setFrequency] = useState('daily')
  const toast = useToast()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: '请输入习惯名称',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    createHabit(currentUser.id, name.trim(), description.trim(), icon, '#8b5cf6', frequency as 'daily' | 'weekly' | 'monthly')
    toast({
      title: '习惯创建成功',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    router.push('/habit')
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Nav />
      
      <Box maxW="600px" mx="auto" px={4} py={8}>
        <Flex align="center" gap={4} mb={8}>
          <Button variant="ghost" onClick={() => router.push('/habit')}>
            <FiArrowLeft />
          </Button>
          <Heading as="h1" size="2xl">
            添加习惯
          </Heading>
        </Flex>

        <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
          <FormControl isRequired mb={6}>
            <FormLabel>习惯名称</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：每天阅读30分钟"
              fontSize="lg"
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>图标</FormLabel>
            <Grid gridTemplateColumns="repeat(5, 1fr)" gap={2}>
              {HABIT_ICONS.map((iconOption) => (
                <Button
                  key={iconOption.id}
                  variant={icon === iconOption.id ? 'solid' : 'outline'}
                  colorScheme={icon === iconOption.id ? 'primary' : 'gray'}
                  onClick={() => setIcon(iconOption.id)}
                  fontSize="2xl"
                  py={4}
                  flexDirection="column"
                  gap={1}
                >
                  <span>{iconOption.emoji}</span>
                  <span style={{ fontSize: '10px' }}>{iconOption.label}</span>
                </Button>
              ))}
            </Grid>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>频率</FormLabel>
            <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
              {FREQUENCIES.map((freq) => (
                <Button
                  key={freq.id}
                  variant={frequency === freq.id ? 'solid' : 'outline'}
                  colorScheme={frequency === freq.id ? 'primary' : 'gray'}
                  onClick={() => setFrequency(freq.id)}
                >
                  {freq.label}
                </Button>
              ))}
            </Grid>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>描述</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="添加一些描述，帮助你更好地坚持这个习惯..."
              rows={4}
              resize="none"
            />
          </FormControl>

          <Flex justify="flex-end" gap={4}>
            <Button variant="ghost" onClick={() => router.push('/habit')}>
              取消
            </Button>
            <Button colorScheme="primary" onClick={handleSubmit}>
              创建习惯
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
