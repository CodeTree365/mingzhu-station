import { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, Text, useToast } from '@chakra-ui/react'
import { useAuthStore } from '../../store/use-auth-store'
import { useRouter } from 'next/router'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const success = await login(email, password)
    
    if (success) {
      toast({
        title: '登录成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    } else {
      toast({
        title: '登录失败',
        description: '邮箱或密码错误',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    
    setIsLoading(false)
  }

  return (
    <Flex minH="100vh" alignItems="center" justifyContent="center" bg="gray.50">
      <Box p={8} maxW="md" w="full" bg="white" borderRadius="lg" boxShadow="lg">
        <Heading mb={6} textAlign="center">
          登录
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>邮箱</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
            />
          </FormControl>
          
          <FormControl isRequired mb={6}>
            <FormLabel>密码</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
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
            登录
          </Button>
          
          <Flex justifyContent="space-between">
            <Link href="/auth/register" color="primary.600">
              注册账号
            </Link>
            <Link href="/auth/forgot-password" color="primary.600">
              忘记密码?
            </Link>
          </Flex>
        </form>
        
        <Text mt={6} textAlign="center" color="gray.500" fontSize="sm">
          测试账号: test@example.com / 密码: 123456
        </Text>
      </Box>
    </Flex>
  )
}
