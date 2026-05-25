import { useEffect } from 'react'
import { Box, Button, Flex, Heading, Table, Tbody, Td, Th, Tr, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../../../src/store/use-auth-store'
import { useTestStore } from '../../../../src/store/use-test-store'
import { testTypes } from '../../../../src/data/personality-test'
import Nav from '../../../../src/components/common/Nav'
import dayjs from 'dayjs'

export default function TestHistoryPage() {
  const router = useRouter()
  const { currentUser, initAuth } = useAuthStore()
  const { results, loadResults } = useTestStore()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (currentUser) {
      loadResults(currentUser.id)
    }
  }, [currentUser, loadResults])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const getTestName = (type: string) => {
    const test = testTypes.find(t => t.id === type)
    return test?.name || type
  }

  const getResultSummary = (type: string, scores: string[]) => {
    if (type === 'mbti') {
      return scores.slice(-4).join('')
    }
    if (type === 'disc') {
      return scores[0] || '-'
    }
    if (type === 'enneagram') {
      return `第${scores[0]}型`
    }
    if (type === 'color') {
      const colors: Record<string, string> = { red: '红色', blue: '蓝色', yellow: '黄色', green: '绿色' }
      return colors[scores[0]] || scores[0]
    }
    return '查看详情'
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="800px" mx="auto" px={4} py={12}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h1" size="2xl">
            测试历史
          </Heading>
          <Button variant="ghost" onClick={() => router.push('/test')}>
            进行新测试
          </Button>
        </Flex>

        {results.length === 0 ? (
          <Box bg={useColorModeValue('white', 'gray.800')} p={12} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')} textAlign="center">
            <Text fontSize="lg" color="gray.500">
              暂无测试记录
            </Text>
            <Button mt={4} colorScheme="primary" onClick={() => router.push('/test')}>
              开始第一个测试
            </Button>
          </Box>
        ) : (
          <Table variant="simple" bg={useColorModeValue('white', 'gray.800')} borderRadius="lg" boxShadow={useColorModeValue('md', 'dark-lg')}>
            <Tbody>
              {results.map((result) => (
                <Tr key={result.id} cursor="pointer" _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
                  <Td padding="8">
                    <Text fontWeight="bold">{getTestName(result.testType)}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {dayjs(result.timestamp).format('YYYY-MM-DD HH:mm')}
                    </Text>
                  </Td>
                  <Td padding="8">
                    <Text color="primary.600">{getResultSummary(result.testType, result.testScores)}</Text>
                  </Td>
                  <Td padding="8">
                    <Button size="sm" colorScheme="primary">
                      查看详情
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  )
}
