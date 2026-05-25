import { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Progress, Radio, RadioGroup, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../src/store/use-auth-store'
import { useTestStore } from '../../src/store/use-test-store'
import { testData, calculateMbtiResult, calculateBig5Result, calculateDiscResult, calculateEnneagramResult, calculateColorResult, type TestQuestion } from '../../src/data/personality-test'
import Nav from '../../src/components/common/Nav'

export default function TestPage() {
  const router = useRouter()
  const { testType } = router.query
  const { currentUser, initAuth } = useAuthStore()
  const { currentQuestionIndex, answers, loadProgress, saveProgress, submitTest, resetTest } = useTestStore()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const questions = testType && testData[testType as keyof typeof testData] ? testData[testType as keyof typeof testData] : []

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (currentUser && testType) {
      loadProgress(currentUser.id, testType as string)
    }
  }, [currentUser, testType, loadProgress])

  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login')
    }
  }, [currentUser, router])

  if (!currentUser || !testType || !questions.length) {
    return null
  }

  const currentQuestion = questions[currentQuestionIndex] as TestQuestion

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answer
    
    saveProgress(currentUser.id, testType as string, newAnswers)
    
    if (currentQuestionIndex < questions.length - 1) {
      setIsLoading(true)
      setTimeout(() => {
        router.replace(`/test/${testType}?q=${currentQuestionIndex + 1}`)
        setIsLoading(false)
      }, 300)
    }
  }

  const handleSubmit = () => {
    const scores = answers.map((answer, index) => {
      const question = questions[index]
      const option = question.answerOptions.find(o => o.type === answer)
      return option?.score || ''
    })

    let resultType = ''
    switch (testType) {
      case 'mbti':
        resultType = calculateMbtiResult(scores)
        break
      case 'big5':
        resultType = JSON.stringify(calculateBig5Result(scores))
        break
      case 'disc':
        resultType = calculateDiscResult(scores)
        break
      case 'enneagram':
        resultType = calculateEnneagramResult(scores)
        break
      case 'color':
        resultType = calculateColorResult(scores)
        break
    }

    submitTest(currentUser.id, testType as string, answers, scores)
    resetTest()
    router.push(`/test/result?type=${testType}&result=${encodeURIComponent(resultType)}`)
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <Box minH="100vh" bg="gray.50">
      <Nav />
      
      <Box maxW="600px" mx="auto" px={4} py={8}>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          测试进行中
        </Heading>
        
        <Progress value={progress} mb={6} size="sm" />
        <Text textAlign="center" mb={8}>
          第 {currentQuestionIndex + 1} / {questions.length} 题
        </Text>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" mb={6}>
            {currentQuestion?.question}
          </Heading>

          <RadioGroup defaultValue={answers[currentQuestionIndex]} onChange={handleAnswer}>
            <Flex direction="column" gap={3}>
              {currentQuestion?.answerOptions.map((option) => (
                <Radio
                  key={option.type}
                  value={option.type}
                  colorScheme="primary"
                  isDisabled={isLoading}
                >
                  {option.answer}
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        </Box>

        <Flex mt={6} gap={4}>
          <Button
            flex={1}
            variant="ghost"
            onClick={() => {
              if (currentQuestionIndex > 0) {
                router.replace(`/test/${testType}?q=${currentQuestionIndex - 1}`)
              }
            }}
            isDisabled={currentQuestionIndex === 0 || isLoading}
          >
            上一题
          </Button>
          
          {currentQuestionIndex === questions.length - 1 ? (
            <Button flex={1} colorScheme="primary" onClick={handleSubmit} isLoading={isLoading}>
              提交测试
            </Button>
          ) : (
            <Button
              flex={1}
              colorScheme="primary"
              onClick={() => {
                if (answers[currentQuestionIndex]) {
                  setIsLoading(true)
                  setTimeout(() => {
                    router.replace(`/test/${testType}?q=${currentQuestionIndex + 1}`)
                    setIsLoading(false)
                  }, 300)
                } else {
                  toast({
                    title: '请选择答案',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                  })
                }
              }}
              isDisabled={!answers[currentQuestionIndex] || isLoading}
            >
              下一题
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
