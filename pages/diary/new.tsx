import { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Textarea, useToast } from '@chakra-ui/react'
import { FiArrowLeft, FiImage, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../src/store/use-auth-store'
import { useDiaryStore } from '../../src/store/use-diary-store'
import Nav from '../../src/components/common/Nav'

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

export default function NewDiaryPage() {
  const router = useRouter()
  const { currentUser, initAuth } = useAuthStore()
  const { createDiary } = useDiaryStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('peaceful')
  const [images, setImages] = useState<string[]>([])
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setImages(prev => [...prev, event.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: '请填写完整',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    createDiary(currentUser.id, title.trim(), content.trim(), mood, images)
    toast({
      title: '日记保存成功',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    router.push('/diary')
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Nav />
      
      <Box maxW="800px" mx="auto" px={4} py={8}>
        <Flex align="center" gap={4} mb={8}>
          <Button variant="ghost" onClick={() => router.push('/diary')}>
            <FiArrowLeft />
          </Button>
          <Heading as="h1" size="2xl">
            写日记
          </Heading>
        </Flex>

        <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
          <FormControl isRequired mb={6}>
            <FormLabel>标题</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="今天发生了什么..."
              fontSize="lg"
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>心情</FormLabel>
            <Grid gridTemplateColumns="repeat(8, 1fr)" gap={2}>
              {MOODS.map((moodOption) => (
                <Button
                  key={moodOption.id}
                  variant={mood === moodOption.id ? 'solid' : 'outline'}
                  colorScheme={mood === moodOption.id ? 'primary' : 'gray'}
                  onClick={() => setMood(moodOption.id)}
                  fontSize="2xl"
                  py={4}
                >
                  {moodOption.emoji}
                </Button>
              ))}
            </Grid>
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>图片</FormLabel>
            <Flex gap={2} flexWrap="wrap">
              {images.map((img, index) => (
                <Box key={index} position="relative" width="120px" height="120px">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                  <Button
                    position="absolute"
                    top={1}
                    right={1}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <FiX size={14} />
                  </Button>
                </Box>
              ))}
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500">
                <FiImage size={24} color="gray.400" />
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </Flex>
          </FormControl>

          <FormControl isRequired mb={6}>
            <FormLabel>内容</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="记录今天的心情和故事..."
              rows={10}
              fontSize="lg"
              resize="none"
            />
          </FormControl>

          <Flex justify="flex-end" gap={4}>
            <Button variant="ghost" onClick={() => router.push('/diary')}>
              取消
            </Button>
            <Button colorScheme="primary" onClick={handleSubmit}>
              保存日记
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
