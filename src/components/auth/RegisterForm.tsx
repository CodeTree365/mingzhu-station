import { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Link, useToast } from '@chakra-ui/react'
import { useAuthStore } from '../../store/use-auth-store'
import { useRouter } from 'next/router'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        title: '密码不匹配',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    if (password.length < 6) {
      toast({
        title: '密码太短',
        description: '密码至少需要6个字符',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    setIsLoading(true)
    
    const success = await register(email, password, name)
    
    if (success) {
      toast({
        title: '注册成功',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      router.push('/')
    } else {
      toast({
        title: '注册失败',
        description: '该邮箱已被注册',
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
          注册
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel>昵称</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入昵称"
            />
          </FormControl>
          
          <FormControl isRequired mb={4}>
            <FormLabel>邮箱</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
            />
          </FormControl>
          
          <FormControl isRequired mb={4}>
            <FormLabel>密码</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </FormControl>
          
          <FormControl isRequired mb={6}>
            <FormLabel>确认密码</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="请确认密码"
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
            注册
          </Button>
          
          <Link href="/auth/login" color="primary.600" textAlign="center" display="block">
            已有账号? 立即登录
          </Link>
        </form>
      </Box>
    </Flex>
  )
}
