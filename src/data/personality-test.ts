export interface TestQuestion {
  no: number
  question: string
  answerOptions: {
    type: string
    answer: string
    score: string
  }[]
}

export interface PersonalityClassGroup {
  type: string
  name: string
  nameDescription: string
  epithet: string
  description: string
  traits: string[]
  strengths: string[]
  suggestions: string[]
}

export const testTypes = [
  { id: 'mbti', name: 'MBTI性格测试', description: '经典的16型人格测试', questionsCount: 70 },
  { id: 'big5', name: '大五人格测试', description: '基于五因素模型的科学测试', questionsCount: 60 },
  { id: 'disc', name: 'DISC行为测试', description: '行为风格评估工具', questionsCount: 24 },
  { id: 'enneagram', name: '九型人格测试', description: '九种性格类型分析', questionsCount: 36 },
  { id: 'color', name: '色彩性格测试', description: '通过颜色了解性格', questionsCount: 15 },
]

export const mbtiTest: TestQuestion[] = [
  {
    no: 1,
    question: '在派对上，你通常会：',
    answerOptions: [
      { type: 'A', answer: '与许多人交流，包括陌生人', score: 'E' },
      { type: 'B', answer: '与几个你认识的人交流', score: 'I' },
    ],
  },
  {
    no: 2,
    question: '你更倾向于：',
    answerOptions: [
      { type: 'A', answer: '现实一些，而不是爱幻想', score: 'S' },
      { type: 'B', answer: '爱幻想，而不是过于现实', score: 'N' },
    ],
  },
  {
    no: 3,
    question: '以下哪种情况更糟：',
    answerOptions: [
      { type: 'A', answer: '总是异想天开', score: 'S' },
      { type: 'B', answer: '墨守成规', score: 'N' },
    ],
  },
  {
    no: 4,
    question: '你更欣赏：',
    answerOptions: [
      { type: 'A', answer: '原则', score: 'T' },
      { type: 'B', answer: '情感', score: 'F' },
    ],
  },
  {
    no: 5,
    question: '你更喜欢哪种工作方式：',
    answerOptions: [
      { type: 'A', answer: '按截止日期完成任务', score: 'J' },
      { type: 'B', answer: '随意什么时候都行', score: 'P' },
    ],
  },
  {
    no: 6,
    question: '在聚会上你通常：',
    answerOptions: [
      { type: 'A', answer: '待到很晚，越来越有活力', score: 'E' },
      { type: 'B', answer: '早早离开，感觉越来越疲倦', score: 'I' },
    ],
  },
  {
    no: 7,
    question: '你更被哪种人吸引：',
    answerOptions: [
      { type: 'A', answer: '理智的人', score: 'S' },
      { type: 'B', answer: '富有想象力的人', score: 'N' },
    ],
  },
  {
    no: 8,
    question: '当评判他人时，你更容易被哪种因素影响：',
    answerOptions: [
      { type: 'A', answer: '法律比具体情况更重要', score: 'T' },
      { type: 'B', answer: '具体情况比法律更重要', score: 'F' },
    ],
  },
  {
    no: 9,
    question: '你更倾向于：',
    answerOptions: [
      { type: 'A', answer: '守时', score: 'J' },
      { type: 'B', answer: '从容', score: 'P' },
    ],
  },
  {
    no: 10,
    question: '在你的社交圈中你是：',
    answerOptions: [
      { type: 'A', answer: '了解他人动态', score: 'E' },
      { type: 'B', answer: '对新闻消息不太了解', score: 'I' },
    ],
  },
]

export const big5Test: TestQuestion[] = [
  {
    no: 1,
    question: '我经常感到紧张或焦虑',
    answerOptions: [
      { type: '1', answer: '非常不符合', score: 'N-1' },
      { type: '2', answer: '不太符合', score: 'N-2' },
      { type: '3', answer: '一般', score: 'N-3' },
      { type: '4', answer: '比较符合', score: 'N-4' },
      { type: '5', answer: '非常符合', score: 'N-5' },
    ],
  },
  {
    no: 2,
    question: '我喜欢和很多人在一起',
    answerOptions: [
      { type: '1', answer: '非常不符合', score: 'E-1' },
      { type: '2', answer: '不太符合', score: 'E-2' },
      { type: '3', answer: '一般', score: 'E-3' },
      { type: '4', answer: '比较符合', score: 'E-4' },
      { type: '5', answer: '非常符合', score: 'E-5' },
    ],
  },
  {
    no: 3,
    question: '我喜欢尝试新的事物',
    answerOptions: [
      { type: '1', answer: '非常不符合', score: 'O-1' },
      { type: '2', answer: '不太符合', score: 'O-2' },
      { type: '3', answer: '一般', score: 'O-3' },
      { type: '4', answer: '比较符合', score: 'O-4' },
      { type: '5', answer: '非常符合', score: 'O-5' },
    ],
  },
  {
    no: 4,
    question: '我很注重细节和秩序',
    answerOptions: [
      { type: '1', answer: '非常不符合', score: 'C-1' },
      { type: '2', answer: '不太符合', score: 'C-2' },
      { type: '3', answer: '一般', score: 'C-3' },
      { type: '4', answer: '比较符合', score: 'C-4' },
      { type: '5', answer: '非常符合', score: 'C-5' },
    ],
  },
  {
    no: 5,
    question: '我乐于助人，关心他人',
    answerOptions: [
      { type: '1', answer: '非常不符合', score: 'A-1' },
      { type: '2', answer: '不太符合', score: 'A-2' },
      { type: '3', answer: '一般', score: 'A-3' },
      { type: '4', answer: '比较符合', score: 'A-4' },
      { type: '5', answer: '非常符合', score: 'A-5' },
    ],
  },
]

export const discTest: TestQuestion[] = [
  {
    no: 1,
    question: '开会时我更倾向于：',
    answerOptions: [
      { type: 'A', answer: '主导讨论，做出决策', score: 'D' },
      { type: 'B', answer: '提出创意和想法', score: 'I' },
      { type: 'C', answer: '分析数据，提供建议', score: 'C' },
      { type: 'D', answer: '协调各方，保持和谐', score: 'S' },
    ],
  },
  {
    no: 2,
    question: '面对压力时，我通常：',
    answerOptions: [
      { type: 'A', answer: '快速做出决定', score: 'D' },
      { type: 'B', answer: '寻求他人支持', score: 'I' },
      { type: 'C', answer: '分析所有可能性', score: 'C' },
      { type: 'D', answer: '保持冷静，等待时机', score: 'S' },
    ],
  },
  {
    no: 3,
    question: '我的沟通风格更偏向：',
    answerOptions: [
      { type: 'A', answer: '直接、坦率', score: 'D' },
      { type: 'B', answer: '热情、友好', score: 'I' },
      { type: 'C', answer: '精确、详细', score: 'C' },
      { type: 'D', answer: '温和、委婉', score: 'S' },
    ],
  },
  {
    no: 4,
    question: '工作中我最看重：',
    answerOptions: [
      { type: 'A', answer: '结果和效率', score: 'D' },
      { type: 'B', answer: '与人互动', score: 'I' },
      { type: 'C', answer: '准确性和质量', score: 'C' },
      { type: 'D', answer: '稳定和安全', score: 'S' },
    ],
  },
  {
    no: 5,
    question: '团队合作中我通常：',
    answerOptions: [
      { type: 'A', answer: '设定目标并推动完成', score: 'D' },
      { type: 'B', answer: '激励和鼓励团队成员', score: 'I' },
      { type: 'C', answer: '提供专业知识和分析', score: 'C' },
      { type: 'D', answer: '支持和协助他人', score: 'S' },
    ],
  },
]

export const enneagramTest: TestQuestion[] = [
  {
    no: 1,
    question: '我最害怕的是：',
    answerOptions: [
      { type: 'A', answer: '被批评或指责', score: '1' },
      { type: 'B', answer: '不被爱或被抛弃', score: '2' },
      { type: 'C', answer: '失败或无能', score: '3' },
      { type: 'D', answer: '没有意义或不被理解', score: '4' },
      { type: 'E', answer: '失控或被侵犯', score: '5' },
      { type: 'F', answer: '危险或不确定', score: '6' },
      { type: 'G', answer: '无聊或痛苦', score: '7' },
      { type: 'H', answer: '被利用或软弱', score: '8' },
      { type: 'I', answer: '冲突或分离', score: '9' },
    ],
  },
  {
    no: 2,
    question: '当我感到压力时，我会：',
    answerOptions: [
      { type: 'A', answer: '更加努力工作，追求完美', score: '1' },
      { type: 'B', answer: '更加关心和帮助他人', score: '2' },
      { type: 'C', answer: '更加专注于目标', score: '3' },
      { type: 'D', answer: '更加内省和情绪化', score: '4' },
      { type: 'E', answer: '更加退缩和思考', score: '5' },
      { type: 'F', answer: '更加警惕和怀疑', score: '6' },
      { type: 'G', answer: '更加寻找快乐和刺激', score: '7' },
      { type: 'H', answer: '更加强势和控制', score: '8' },
      { type: 'I', answer: '更加随和和回避', score: '9' },
    ],
  },
  {
    no: 3,
    question: '我最大的优点是：',
    answerOptions: [
      { type: 'A', answer: '公正、有原则', score: '1' },
      { type: 'B', answer: '善良、乐于助人', score: '2' },
      { type: 'C', answer: '自信、有成就', score: '3' },
      { type: 'D', answer: '敏感、有创造力', score: '4' },
      { type: 'E', answer: '聪明、有洞察力', score: '5' },
      { type: 'F', answer: '忠诚、可靠', score: '6' },
      { type: 'G', answer: '乐观、有趣', score: '7' },
      { type: 'H', answer: '坚强、有力量', score: '8' },
      { type: 'I', answer: '平和、包容', score: '9' },
    ],
  },
]

export const colorTest: TestQuestion[] = [
  {
    no: 1,
    question: '你最喜欢的颜色是：',
    answerOptions: [
      { type: 'A', answer: '红色', score: 'red' },
      { type: 'B', answer: '蓝色', score: 'blue' },
      { type: 'C', answer: '黄色', score: 'yellow' },
      { type: 'D', answer: '绿色', score: 'green' },
    ],
  },
  {
    no: 2,
    question: '你喜欢的环境是：',
    answerOptions: [
      { type: 'A', answer: '充满活力和激情', score: 'red' },
      { type: 'B', answer: '安静和思考', score: 'blue' },
      { type: 'C', answer: '快乐和轻松', score: 'yellow' },
      { type: 'D', answer: '自然和和谐', score: 'green' },
    ],
  },
  {
    no: 3,
    question: '你处理问题的方式是：',
    answerOptions: [
      { type: 'A', answer: '快速果断', score: 'red' },
      { type: 'B', answer: '深思熟虑', score: 'blue' },
      { type: 'C', answer: '乐观积极', score: 'yellow' },
      { type: 'D', answer: '寻求共识', score: 'green' },
    ],
  },
]

export const testData: Record<string, TestQuestion[]> = {
  mbti: mbtiTest,
  big5: big5Test,
  disc: discTest,
  enneagram: enneagramTest,
  color: colorTest,
}

export const mbtiResults: Record<string, PersonalityClassGroup> = {
  INTJ: {
    type: 'INTJ',
    name: '建筑师',
    nameDescription: '富有想象力和战略性的思想家',
    epithet: '独立思考的战略家',
    description: 'INTJ型的人是完美主义者，他们善于思考，具有远见卓识。他们喜欢独立工作，追求知识和智慧。',
    traits: ['富有洞察力', '善于分析', '独立思考', '目标导向'],
    strengths: ['战略思维', '创新能力', '专注力', '自律'],
    suggestions: ['学会放松', '倾听他人意见', '培养耐心'],
  },
  INFJ: {
    type: 'INFJ',
    name: '提倡者',
    nameDescription: '富有洞察力和创造力的理想主义者',
    epithet: '富有同情心的导师',
    description: 'INFJ型的人是富有同情心的理想主义者，他们善于理解他人，追求意义和价值。',
    traits: ['富有同理心', '直觉敏锐', '理想主义', '富有创造力'],
    strengths: ['洞察力', '说服力', '创造力', '坚定信念'],
    suggestions: ['保护自己的能量', '学会说不', '关注自己的需求'],
  },
  INFP: {
    type: 'INFP',
    name: '调停者',
    nameDescription: '富有创造力和理想主义的艺术家',
    epithet: '温和的理想主义者',
    description: 'INFP型的人是温和的理想主义者，他们珍视个人价值，追求内心的真实和美好。',
    traits: ['敏感', '理想主义', '富有创造力', '忠诚'],
    strengths: ['同理心', '创造力', '坚定信念', '真诚'],
    suggestions: ['设定实际目标', '学会表达自己', '保护自己'],
  },
  ISTJ: {
    type: 'ISTJ',
    name: '物流师',
    nameDescription: '务实可靠的组织者',
    epithet: '可靠的守护者',
    description: 'ISTJ型的人是务实可靠的组织者，他们注重秩序和责任，是值得信赖的伙伴。',
    traits: ['可靠', '务实', '有责任感', '注重细节'],
    strengths: ['组织能力', '可靠性', '责任感', '实际性'],
    suggestions: ['学会变通', '接受变化', '放松控制'],
  },
  ISFJ: {
    type: 'ISFJ',
    name: '守卫者',
    nameDescription: '温暖负责的保护者',
    epithet: '无私的照顾者',
    description: 'ISFJ型的人是温暖负责的保护者，他们关心他人，乐于奉献，是家庭和团队的支柱。',
    traits: ['善良', '体贴', '有责任感', '注重传统'],
    strengths: ['同情心', '可靠性', '组织能力', '耐心'],
    suggestions: ['照顾自己', '学会拒绝', '相信自己的判断'],
  },
  ISTP: {
    type: 'ISTP',
    name: '鉴赏家',
    nameDescription: '灵活务实的问题解决者',
    epithet: '冷静的实干家',
    description: 'ISTP型的人是灵活务实的问题解决者，他们善于分析和动手，喜欢探索和实践。',
    traits: ['冷静', '务实', '善于分析', '灵活'],
    strengths: ['解决问题', '实际操作', '适应性', '独立性'],
    suggestions: ['培养耐心', '关注他人感受', '坚持到底'],
  },
  ISFP: {
    type: 'ISFP',
    name: '探险家',
    nameDescription: '富有艺术感和同情心的创作者',
    epithet: '温柔的艺术家',
    description: 'ISFP型的人是富有艺术感和同情心的创作者，他们热爱生活，注重当下，追求真实。',
    traits: ['艺术感', '敏感', '温和', '注重当下'],
    strengths: ['创造力', '同理心', '灵活性', '真实性'],
    suggestions: ['学会表达自己', '设定界限', '相信自己'],
  },
  ENFJ: {
    type: 'ENFJ',
    name: '教育家',
    nameDescription: '热情有魅力的领导者',
    epithet: '鼓舞人心的领导者',
    description: 'ENFJ型的人是热情有魅力的领导者，他们善于激励他人，追求共同的理想和目标。',
    traits: ['热情', '有魅力', '善于沟通', '富有同情心'],
    strengths: ['领导力', '说服力', '同理心', '组织能力'],
    suggestions: ['保护自己的能量', '学会倾听', '接受不完美'],
  },
  ENFP: {
    type: 'ENFP',
    name: '竞选者',
    nameDescription: '充满热情和创造力的倡导者',
    epithet: '热情的梦想家',
    description: 'ENFP型的人是充满热情和创造力的倡导者，他们热爱生活，善于发现机会，激励他人。',
    traits: ['热情', '富有创造力', '善于社交', '乐观'],
    strengths: ['创造力', '热情', '沟通能力', '适应能力'],
    suggestions: ['专注于完成', '学会承诺', '倾听他人'],
  },
  ENTJ: {
    type: 'ENTJ',
    name: '指挥官',
    nameDescription: '果断自信的领导者',
    epithet: '天生的领导者',
    description: 'ENTJ型的人是果断自信的领导者，他们善于决策，追求效率和结果，是天生的管理者。',
    traits: ['果断', '自信', '有远见', '善于组织'],
    strengths: ['领导力', '战略思维', '决策能力', '执行力'],
    suggestions: ['学会倾听', '培养同理心', '放慢节奏'],
  },
  ENTP: {
    type: 'ENTP',
    name: '辩论家',
    nameDescription: '聪明好奇的创新者',
    epithet: '机智的创新者',
    description: 'ENTP型的人是聪明好奇的创新者，他们善于分析，喜欢挑战，追求知识和创新。',
    traits: ['聪明', '好奇', '善于辩论', '富有创造力'],
    strengths: ['创新能力', '分析能力', '适应能力', '沟通能力'],
    suggestions: ['学会专注', '完成项目', '考虑他人感受'],
  },
  ESTJ: {
    type: 'ESTJ',
    name: '总经理',
    nameDescription: '务实高效的管理者',
    epithet: '可靠的管理者',
    description: 'ESTJ型的人是务实高效的管理者，他们注重秩序和效率，善于组织和管理。',
    traits: ['务实', '有责任感', '善于组织', '果断'],
    strengths: ['组织能力', '可靠性', '执行力', '领导能力'],
    suggestions: ['学会变通', '倾听他人', '放松控制'],
  },
  ESFJ: {
    type: 'ESFJ',
    name: '执政官',
    nameDescription: '热情负责的协调者',
    epithet: '温暖的社交家',
    description: 'ESFJ型的人是热情负责的协调者，他们善于与人交往，关心他人，是团队的粘合剂。',
    traits: ['热情', '负责', '善于社交', '体贴'],
    strengths: ['社交能力', '组织能力', '可靠性', '同情心'],
    suggestions: ['照顾自己', '学会拒绝', '相信自己'],
  },
  ESTP: {
    type: 'ESTP',
    name: '企业家',
    nameDescription: '精力充沛的实践者',
    epithet: '灵活的行动者',
    description: 'ESTP型的人是精力充沛的实践者，他们善于行动，喜欢挑战，追求刺激和体验。',
    traits: ['精力充沛', '务实', '善于行动', '乐观'],
    strengths: ['行动力', '适应能力', '解决问题', '社交能力'],
    suggestions: ['学会规划', '考虑后果', '培养耐心'],
  },
  ESFP: {
    type: 'ESFP',
    name: '表演者',
    nameDescription: '热情活泼的社交者',
    epithet: '快乐的表演者',
    description: 'ESFP型的人是热情活泼的社交者，他们热爱生活，善于表达，是聚会的灵魂人物。',
    traits: ['热情', '活泼', '善于表达', '注重体验'],
    strengths: ['社交能力', '创造力', '适应性', '乐观'],
    suggestions: ['设定目标', '学会专注', '考虑未来'],
  },
}

export function calculateMbtiResult(scores: string[]): string {
  const count = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  
  for (const score of scores) {
    if (count[score as keyof typeof count] !== undefined) {
      count[score as keyof typeof count]++
    }
  }
  
  return `${count.E >= count.I ? 'E' : 'I'}${count.S >= count.N ? 'S' : 'N'}${count.T >= count.F ? 'T' : 'F'}${count.J >= count.P ? 'J' : 'P'}`
}

export function calculateBig5Result(scores: string[]): Record<string, number> {
  const result: Record<string, number> = { N: 0, E: 0, O: 0, C: 0, A: 0 }
  
  for (const score of scores) {
    const [factor, value] = score.split('-')
    if (result[factor] !== undefined) {
      result[factor] += parseInt(value)
    }
  }
  
  return result
}

export function calculateDiscResult(scores: string[]): string {
  const count = { D: 0, I: 0, S: 0, C: 0 }
  
  for (const score of scores) {
    if (count[score as keyof typeof count] !== undefined) {
      count[score as keyof typeof count]++
    }
  }
  
  const max = Math.max(count.D, count.I, count.S, count.C)
  
  if (count.D === max) return 'D'
  if (count.I === max) return 'I'
  if (count.S === max) return 'S'
  return 'C'
}

export function calculateEnneagramResult(scores: string[]): string {
  const count: Record<string, number> = {}
  
  for (const score of scores) {
    count[score] = (count[score] || 0) + 1
  }
  
  let maxType = '1'
  let maxCount = 0
  
  for (const [type, cnt] of Object.entries(count)) {
    if (cnt > maxCount) {
      maxCount = cnt
      maxType = type
    }
  }
  
  return maxType
}

export function calculateColorResult(scores: string[]): string {
  const count: Record<string, number> = {}
  
  for (const score of scores) {
    count[score] = (count[score] || 0) + 1
  }
  
  let maxColor = 'red'
  let maxCount = 0
  
  for (const [color, cnt] of Object.entries(count)) {
    if (cnt > maxCount) {
      maxCount = cnt
      maxColor = color
    }
  }
  
  return maxColor
}

export const big5Descriptions = {
  N: {
    name: '神经质',
    low: '情绪稳定、冷静',
    high: '情绪敏感、易焦虑',
    advice: '可以尝试练习冥想或深呼吸来管理情绪波动',
  },
  E: {
    name: '外向性',
    low: '内向、喜欢独处',
    high: '外向、喜欢社交',
    advice: '可以平衡社交活动和独处时间，保持身心和谐',
  },
  O: {
    name: '开放性',
    low: '传统、务实',
    high: '开放、富有想象力',
    advice: '可以尝试新的兴趣爱好，拓展视野',
  },
  C: {
    name: '尽责性',
    low: '随性、灵活',
    high: '负责、有组织',
    advice: '可以设定合理的目标，保持适度的灵活性',
  },
  A: {
    name: '宜人性',
    low: '独立、果断',
    high: '友善、乐于助人',
    advice: '可以在帮助他人的同时，也要关注自己的需求',
  },
}

export const discDescriptions = {
  D: {
    name: '支配型',
    description: '果断、自信、注重结果',
    traits: ['目标导向', '决策迅速', '勇于挑战'],
    suggestions: ['学会倾听', '培养耐心', '关注他人感受'],
  },
  I: {
    name: '影响型',
    description: '热情、善于社交、富有感染力',
    traits: ['善于沟通', '乐观积极', '团队协作'],
    suggestions: ['学会专注', '注重细节', '考虑后果'],
  },
  S: {
    name: '稳健型',
    description: '温和、可靠、注重稳定',
    traits: ['耐心细致', '团队合作', '稳定可靠'],
    suggestions: ['学会表达', '勇于尝试', '接受变化'],
  },
  C: {
    name: '服从型',
    description: '严谨、精确、注重质量',
    traits: ['分析能力', '注重细节', '追求完美'],
    suggestions: ['学会变通', '快速决策', '相信直觉'],
  },
}

export const colorDescriptions = {
  red: {
    name: '红色性格',
    description: '热情、活力、果断',
    traits: ['自信', '勇敢', '行动力强'],
    suggestions: ['学会倾听', '控制情绪', '注重细节'],
  },
  blue: {
    name: '蓝色性格',
    description: '理性、冷静、深邃',
    traits: ['智慧', '思考', '注重深度'],
    suggestions: ['学会放松', '表达情感', '享受生活'],
  },
  yellow: {
    name: '黄色性格',
    description: '乐观、开朗、热情',
    traits: ['快乐', '创意', '善于社交'],
    suggestions: ['学会专注', '承担责任', '面对现实'],
  },
  green: {
    name: '绿色性格',
    description: '平和、和谐、稳定',
    traits: ['善良', '耐心', '善于协调'],
    suggestions: ['学会拒绝', '表达意见', '勇于尝试'],
  },
}

export const enneagramDescriptions: Record<string, { name: string; description: string; traits: string[]; suggestions: string[] }> = {
  '1': {
    name: '完美主义者',
    description: '追求完美和正义，有强烈的原则性',
    traits: ['正直', '自律', '有原则'],
    suggestions: ['学会放松', '接受不完美', '享受过程'],
  },
  '2': {
    name: '助人者',
    description: '乐于助人，关心他人，渴望被需要',
    traits: ['善良', '体贴', '无私'],
    suggestions: ['照顾自己', '学会拒绝', '表达需求'],
  },
  '3': {
    name: '成就者',
    description: '追求成功和认可，善于表现自己',
    traits: ['自信', '有能力', '目标导向'],
    suggestions: ['关注内心', '享受过程', '接受失败'],
  },
  '4': {
    name: '浪漫主义者',
    description: '富有创造力，追求独特和意义',
    traits: ['敏感', '有创造力', '独特'],
    suggestions: ['活在当下', '接受平凡', '培养自信'],
  },
  '5': {
    name: '观察者',
    description: '善于思考，追求知识和理解',
    traits: ['智慧', '独立', '理性'],
    suggestions: ['与人连接', '分享知识', '参与行动'],
  },
  '6': {
    name: '忠诚者',
    description: '忠诚可靠，追求安全和稳定',
    traits: ['忠诚', '谨慎', '负责任'],
    suggestions: ['信任自己', '面对恐惧', '放松警惕'],
  },
  '7': {
    name: '享乐主义者',
    description: '乐观开朗，追求快乐和体验',
    traits: ['乐观', '有趣', '富有创意'],
    suggestions: ['面对困难', '专注完成', '珍惜当下'],
  },
  '8': {
    name: '挑战者',
    description: '坚强有力，追求正义和控制',
    traits: ['坚强', '自信', '勇敢'],
    suggestions: ['学会倾听', '控制愤怒', '展现温柔'],
  },
  '9': {
    name: '和平使者',
    description: '温和包容，追求和谐与平静',
    traits: ['平和', '包容', '善良'],
    suggestions: ['表达意见', '设定界限', '追求目标'],
  },
}
