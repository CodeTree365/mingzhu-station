import { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: '重置链接已发送',
      description: '请检查您的邮箱',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <Flex minH="100vh" alignItems="center" justifyContent="center" bg="gray.50">
        <Box p={8} maxW="md" w="full" bg="white" borderRadius="lg" boxShadow="lg" textAlign="center">
          <Heading mb={4}>邮件已发送</Heading>
          <p>请检查您的邮箱以重置密码</p>
          <Button mt={6} colorScheme="primary" onClick={() => router.push('/auth/login')}>
            返回登录
          </Button>
        </Box>
      </Flex>
    )
  }

  return (
    <Flex minH="100vh" alignItems="center" justifyContent="center" bg="gray.50">
      <Box p={8} maxW="md" w="full" bg="white" borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center">
          忘记密码
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={6}>
            <FormLabel>邮箱</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入注册邮箱"
            />
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="primary"
            size="lg"
            w="full"
            isLoading={isLoading}
            mb={4}
          >
            发送重置链接
          </Button>
          
          <Link href="/auth/login" color="primary.600" textAlign="center" display="block">
            返回登录
          </Link>
        </form>
      </Box>
    </Flex>
  )
}
