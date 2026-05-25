import { useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Heading, Text, UnorderedList, ListItem, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { useAuthStore } from '../../../src/store/use-auth-store'
import { mbtiResults, big5Descriptions, discDescriptions, colorDescriptions, enneagramDescriptions } from '../../../src/data/personality-test'
import Nav from '../../../src/components/common/Nav'

export default function TestResultPage() {
  const router = useRouter()
  const { type, result } = router.query
  const { currentUser, initAuth } = useAuthStore()
  const [resultData, setResultData] = useState<{
    title: string
    subtitle: string
    description: string
    traits: string[]
    suggestions: string[]
  } | null>(null)
  const [radarData, setRadarData] = useState<{ subject: string; score: number; fullMark: number }[]>([])

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  useEffect(() => {
    if (!type || !result) return

    switch (type) {
      case 'mbti': {
        const mbtiResult = mbtiResults[result as string]
        if (mbtiResult) {
          setResultData({
            title: `${mbtiResult.type} - ${mbtiResult.name}`,
            subtitle: mbtiResult.epithet,
            description: mbtiResult.description,
            traits: mbtiResult.traits,
            suggestions: mbtiResult.suggestions,
          })
        }
        break
      }
      case 'big5': {
        try {
          const scores = JSON.parse(result as string)
          const traits: string[] = []
          const suggestions: string[] = []
          const radar: { subject: string; score: number; fullMark: number }[] = []
          
          Object.entries(scores).forEach(([key, value]) => {
            const numValue = Number(value)
            const desc = big5Descriptions[key as keyof typeof big5Descriptions]
            if (desc) {
              const score = Math.round((numValue / 20) * 100)
              traits.push(`${desc.name}: ${score}% (${numValue > 12 ? desc.high : desc.low})`)
              radar.push({ subject: desc.name, score, fullMark: 100 })
              suggestions.push(`您的${desc.name}得分${score > 60 ? '较高' : score < 40 ? '较低' : '适中'}，${desc.advice}`)
            }
          })
          
          setRadarData(radar)
          setResultData({
            title: '大五人格分析',
            subtitle: '五因素模型测试结果',
            description: '大五人格模型是目前最科学的人格测评方法之一，包含神经质、外向性、开放性、尽责性和宜人性五个维度。',
            traits,
            suggestions,
          })
        } catch (e) {
          console.error('Failed to parse big5 result')
        }
        break
      }
      case 'disc': {
        const discResult = discDescriptions[result as keyof typeof discDescriptions]
        if (discResult) {
          setResultData({
            title: discResult.name,
            subtitle: discResult.description,
            description: 'DISC是一种行为风格测评工具，帮助您了解自己的行为模式和沟通风格。',
            traits: discResult.traits,
            suggestions: discResult.suggestions,
          })
        }
        break
      }
      case 'enneagram': {
        const enneagramResult = enneagramDescriptions[result as keyof typeof enneagramDescriptions]
        if (enneagramResult) {
          setResultData({
            title: enneagramResult.name,
            subtitle: enneagramResult.description,
            description: '九型人格是一种古老的人格分类系统，帮助您了解自己的核心动机和成长方向。',
            traits: enneagramResult.traits,
            suggestions: enneagramResult.suggestions,
          })
        }
        break
      }
      case 'color': {
        const colorResult = colorDescriptions[result as keyof typeof colorDescriptions]
        if (colorResult) {
          setResultData({
            title: colorResult.name,
            subtitle: colorResult.description,
            description: '色彩性格测试通过您对颜色的偏好来揭示您的性格特点。',
            traits: colorResult.traits,
            suggestions: colorResult.suggestions,
          })
        }
        break
      }
    }
  }, [type, result])

  if (!currentUser || !resultData) {
    return null
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="800px" mx="auto" px={4} py={12}>
        <Heading as="h1" size="2xl" mb={4} textAlign="center">
          {resultData.title}
        </Heading>
        <Text fontSize="lg" textAlign="center" color="primary.600" mb={8}>
          {resultData.subtitle}
        </Text>

        {radarData.length > 0 && (
          <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} mb={8}>
            <Heading as="h2" size="lg" mb={4} textAlign="center">
              性格特质雷达图
            </Heading>
            <Box height={400}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke={useColorModeValue('#e2e8f0', '#475569')} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: useColorModeValue('#64748b', '#cbd5e1'), fontSize: 14 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]}
                    tick={{ fill: useColorModeValue('#94a3b8', '#94a3b8'), fontSize: 12 }}
                  />
                  <Radar
                    name="得分"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}

        <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} mb={8}>
          <Text fontSize="lg" lineHeight="1.8">
            {resultData.description}
          </Text>
        </Box>

        <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            您的性格特质
          </Heading>
          <UnorderedList spacing={3}>
            {resultData.traits.map((trait, index) => (
              <ListItem key={index} fontSize="lg">
                {trait}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            发展建议
          </Heading>
          <UnorderedList spacing={3}>
            {resultData.suggestions.map((suggestion, index) => (
              <ListItem key={index} fontSize="lg">
                {suggestion}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Flex justify="center" gap={4}>
          <Button variant="ghost" onClick={() => router.push('/test')}>
            进行其他测试
          </Button>
          <Button colorScheme="primary" onClick={() => router.push('/test/result/history')}>
            查看测试历史
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
