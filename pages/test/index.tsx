import { useEffect } from 'react'
import { Box, Button, Card, CardBody, CardHeader, Flex, Grid, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../../src/store/use-auth-store'
import { testTypes } from '../../src/data/personality-test'
import Nav from '../../src/components/common/Nav'

export default function TestIndexPage() {
  const { currentUser, initAuth } = useAuthStore()
  const router = useRouter()

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

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Nav />
      
      <Box maxW="1200px" mx="auto" px={4} py={12}>
        <Heading as="h1" size="2xl" mb={8} textAlign="center">
          性格测试
        </Heading>
        
        <Grid gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {testTypes.map((test) => (
            <Card
              key={test.id}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={useColorModeValue('md', 'dark-lg')}
              cursor="pointer"
              _hover={{ transform: 'translateY(-4px)', transition: 'transform 0.2s' }}
              onClick={() => router.push(`/test/${test.id}`)}
            >
              <CardHeader>
                <Heading as="h3" size="md">{test.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text color="gray.600" mb={4}>{test.description}</Text>
                <Button colorScheme="primary" w="full">
                  开始测试 ({test.questionsCount}题)
                </Button>
              </CardBody>
            </Card>
          ))}
        </Grid>

        <Flex mt={8} justify="center">
          <Button variant="ghost" onClick={() => router.push('/test/result/history')}>
            查看测试历史
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
