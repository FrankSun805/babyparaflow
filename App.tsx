import React, { useState } from 'react';
import { ChatSidebar } from './components/Chat/ChatSidebar';
import { CanvasContainer } from './components/Canvas/CanvasContainer';
import { MarkdownModal } from './components/Editor/MarkdownModal';
import { WhiteboardModal } from './components/Editor/WhiteboardModal';
import { ImmersiveView } from './components/Preview/ImmersiveView';
import { PinModal } from './components/Editor/PinModal';
import { DatabaseModal } from './components/Editor/DatabaseModal';
import { IntegrationModal } from './components/Editor/IntegrationModal';
import { CanvasNode, ChatMessage, NodeType, DocumentData, WhiteboardData, ScreenData, CanvasEdge, CanvasView, PlanStep, CanvasPin, TableData, APIData, IntegrationData, QuestionData } from './types';
import { 
  LAYOUT_CENTER_X, 
  LAYOUT_CENTER_Y, 
  SECTION_IDS,
  NODE_SPACING_X,
  INITIAL_ZOOM
} from './constants';
import { 
  screen_auth_1, screen_auth_2, screen_auth_3, screen_auth_4, screen_auth_5, screen_auth_6,
  screen_search_1, screen_search_2, screen_search_3, screen_search_4, screen_search_5, screen_search_6,
} from './data/eduAppScreens';
import {
  screen_learn_1, screen_learn_2, screen_learn_3, screen_learn_4, screen_learn_5,
  screen_profile_1, screen_profile_2, screen_profile_3, screen_profile_4, screen_profile_5,
  screen_live_1, screen_live_2, screen_live_3, screen_live_4, screen_live_5,
} from './data/eduAppScreens2';

// --- Product Decision Questions Configuration ---
const PRODUCT_QUESTIONS: QuestionData[] = [
  {
    questionId: 'q1',
    questionText: '您想要构建什么类型的教育产品？',
    currentPage: 1,
    totalPages: 3,
    options: [
      { id: 'k12', label: 'K12教育', description: '中小学课程、考试辅导' },
      { id: 'vocational', label: '职业教育', description: '技能培训、职业认证' },
      { id: 'language', label: '语言学习', description: '外语培训、口语练习' },
      { id: 'hobby', label: '兴趣培养', description: '艺术、音乐、体育' }
    ]
  },
  {
    questionId: 'q2',
    questionText: '您的核心用户场景是什么？',
    currentPage: 2,
    totalPages: 3,
    options: [
      { id: 'video', label: '录播视频学习', description: '随时随地观看课程视频' },
      { id: 'live', label: '直播互动教学', description: '实时在线授课答疑' },
      { id: 'practice', label: '刷题练习', description: '题库训练、模拟考试' },
      { id: 'social', label: '社群学习', description: '学习圈子、互助答疑' }
    ]
  },
  {
    questionId: 'q3',
    questionText: '您期望的产品形态？',
    currentPage: 3,
    totalPages: 3,
    options: [
      { id: 'mobile', label: '移动端优先', description: 'APP为主，适配移动学习' },
      { id: 'web', label: 'Web端优先', description: '网页版为主，大屏体验' },
      { id: 'both', label: '多端同步', description: 'APP+Web，数据互通' },
      { id: 'mini', label: '小程序', description: '微信/支付宝小程序' }
    ]
  }
];

// 教育APP流程图数据
const MOCK_EDU_DATA = {
  // Section 1: 登录注册流程
  authScreens: [screen_auth_1, screen_auth_2, screen_auth_3, screen_auth_4, screen_auth_5, screen_auth_6],
  // Section 2: 搜索下单流程
  searchScreens: [screen_search_1, screen_search_2, screen_search_3, screen_search_4, screen_search_5, screen_search_6],
  // Section 3: 我的学习流程
  learnScreens: [screen_learn_1, screen_learn_2, screen_learn_3, screen_learn_4, screen_learn_5],
  // Section 4: 个人中心流程
  profileScreens: [screen_profile_1, screen_profile_2, screen_profile_3, screen_profile_4, screen_profile_5],
  // Section 5: 直播课程流程
  liveScreens: [screen_live_1, screen_live_2, screen_live_3, screen_live_4, screen_live_5],
  
  // 信息架构图 (Information Architecture)
  infoArchitecture: {
    elements: [
      // 顶层：APP
      { id: 'app', type: 'rect' as const, x: 350, y: 30, width: 120, height: 50, content: '学习通 APP', color: '#6366F1' },
      // 一级导航
      { id: 'a1', type: 'arrow' as const, x: 410, y: 80, width: 0, height: 30, content: '', color: '#94a3b8' },
      { id: 'nav', type: 'rect' as const, x: 320, y: 110, width: 180, height: 40, content: '底部导航栏', color: '#94a3b8' },
      // 箭头到各模块
      { id: 'a2', type: 'arrow' as const, x: 410, y: 150, width: -260, height: 40, content: '', color: '#94a3b8' },
      { id: 'a3', type: 'arrow' as const, x: 410, y: 150, width: 0, height: 40, content: '', color: '#94a3b8' },
      { id: 'a4', type: 'arrow' as const, x: 410, y: 150, width: 260, height: 40, content: '', color: '#94a3b8' },
      // 三大模块
      { id: 'home', type: 'rect' as const, x: 80, y: 190, width: 140, height: 50, content: '首页', color: '#10B981' },
      { id: 'live', type: 'rect' as const, x: 340, y: 190, width: 140, height: 50, content: '直播', color: '#8B5CF6' },
      { id: 'profile', type: 'rect' as const, x: 600, y: 190, width: 140, height: 50, content: '我的', color: '#F59E0B' },
      // 首页子功能
      { id: 'a5', type: 'arrow' as const, x: 150, y: 240, width: 0, height: 30, content: '', color: '#94a3b8' },
      { id: 'home_sub', type: 'rect' as const, x: 30, y: 270, width: 240, height: 120, content: '', color: '#f1f5f9' },
      { id: 't1', type: 'text' as const, x: 50, y: 285, width: 80, height: 20, content: '• 搜索课程', color: '#334155' },
      { id: 't2', type: 'text' as const, x: 50, y: 310, width: 80, height: 20, content: '• 推荐课程', color: '#334155' },
      { id: 't3', type: 'text' as const, x: 50, y: 335, width: 80, height: 20, content: '• 热门直播', color: '#334155' },
      { id: 't4', type: 'text' as const, x: 50, y: 360, width: 80, height: 20, content: '• 学习进度', color: '#334155' },
      // 直播子功能
      { id: 'a6', type: 'arrow' as const, x: 410, y: 240, width: 0, height: 30, content: '', color: '#94a3b8' },
      { id: 'live_sub', type: 'rect' as const, x: 290, y: 270, width: 240, height: 120, content: '', color: '#f1f5f9' },
      { id: 't5', type: 'text' as const, x: 310, y: 285, width: 80, height: 20, content: '• 直播列表', color: '#334155' },
      { id: 't6', type: 'text' as const, x: 310, y: 310, width: 80, height: 20, content: '• 直播间', color: '#334155' },
      { id: 't7', type: 'text' as const, x: 310, y: 335, width: 80, height: 20, content: '• 互动问答', color: '#334155' },
      { id: 't8', type: 'text' as const, x: 310, y: 360, width: 80, height: 20, content: '• 课程回放', color: '#334155' },
      // 我的子功能
      { id: 'a7', type: 'arrow' as const, x: 670, y: 240, width: 0, height: 30, content: '', color: '#94a3b8' },
      { id: 'profile_sub', type: 'rect' as const, x: 550, y: 270, width: 240, height: 120, content: '', color: '#f1f5f9' },
      { id: 't9', type: 'text' as const, x: 570, y: 285, width: 80, height: 20, content: '• 我的课程', color: '#334155' },
      { id: 't10', type: 'text' as const, x: 570, y: 310, width: 80, height: 20, content: '• 我的订单', color: '#334155' },
      { id: 't11', type: 'text' as const, x: 570, y: 335, width: 80, height: 20, content: '• 学习记录', color: '#334155' },
      { id: 't12', type: 'text' as const, x: 570, y: 360, width: 80, height: 20, content: '• 账户设置', color: '#334155' },
    ]
  },

  // 登录注册流程图
  authFlow: {
    elements: [
      { id: 'start', type: 'circle' as const, x: 50, y: 150, width: 60, height: 60, content: '开始', color: '#6366F1' },
      { id: 'a1', type: 'arrow' as const, x: 110, y: 180, width: 50, height: 0, content: '', color: '#94a3b8' },
      { id: 'welcome', type: 'rect' as const, x: 160, y: 155, width: 100, height: 50, content: '欢迎页', color: '#6366F1' },
      { id: 'a2', type: 'arrow' as const, x: 260, y: 180, width: 50, height: 0, content: '', color: '#94a3b8' },
      { id: 'input', type: 'rect' as const, x: 310, y: 155, width: 100, height: 50, content: '输入手机号', color: '#10B981' },
      { id: 'a3', type: 'arrow' as const, x: 410, y: 180, width: 50, height: 0, content: '', color: '#94a3b8' },
      { id: 'code', type: 'rect' as const, x: 460, y: 155, width: 100, height: 50, content: '获取验证码', color: '#10B981' },
      { id: 'a4', type: 'arrow' as const, x: 560, y: 180, width: 50, height: 0, content: '', color: '#94a3b8' },
      { id: 'verify', type: 'diamond' as const, x: 610, y: 145, width: 70, height: 70, content: '验证', color: '#F59E0B' },
      { id: 'a5', type: 'arrow' as const, x: 680, y: 180, width: 50, height: 0, content: '成功', color: '#94a3b8' },
      { id: 'success', type: 'rect' as const, x: 730, y: 155, width: 80, height: 50, content: '注册成功', color: '#10B981' },
      { id: 'a6', type: 'arrow' as const, x: 645, y: 215, width: 0, height: 40, content: '失败', color: '#94a3b8' },
      { id: 'retry', type: 'rect' as const, x: 595, y: 255, width: 100, height: 40, content: '重新输入', color: '#EF4444' },
    ]
  },

  // 搜索下单流程图
  searchFlow: {
    elements: [
      { id: 'start', type: 'circle' as const, x: 50, y: 150, width: 60, height: 60, content: '首页', color: '#10B981' },
      { id: 'a1', type: 'arrow' as const, x: 110, y: 180, width: 40, height: 0, content: '', color: '#94a3b8' },
      { id: 'search', type: 'rect' as const, x: 150, y: 155, width: 80, height: 50, content: '点击搜索', color: '#6366F1' },
      { id: 'a2', type: 'arrow' as const, x: 230, y: 180, width: 40, height: 0, content: '', color: '#94a3b8' },
      { id: 'input', type: 'rect' as const, x: 270, y: 155, width: 80, height: 50, content: '输入关键词', color: '#6366F1' },
      { id: 'a3', type: 'arrow' as const, x: 350, y: 180, width: 40, height: 0, content: '', color: '#94a3b8' },
      { id: 'result', type: 'rect' as const, x: 390, y: 155, width: 80, height: 50, content: '搜索结果', color: '#10B981' },
      { id: 'a4', type: 'arrow' as const, x: 470, y: 180, width: 40, height: 0, content: '', color: '#94a3b8' },
      { id: 'detail', type: 'rect' as const, x: 510, y: 155, width: 80, height: 50, content: '课程详情', color: '#8B5CF6' },
      { id: 'a5', type: 'arrow' as const, x: 590, y: 180, width: 40, height: 0, content: '', color: '#94a3b8' },
      { id: 'order', type: 'rect' as const, x: 630, y: 155, width: 80, height: 50, content: '确认订单', color: '#F59E0B' },
      { id: 'a6', type: 'arrow' as const, x: 710, y: 180, width: 40, height: 0, content: '', color: '#94a3b8' },
      { id: 'pay', type: 'diamond' as const, x: 750, y: 145, width: 70, height: 70, content: '支付', color: '#F59E0B' },
      { id: 'a7', type: 'arrow' as const, x: 820, y: 180, width: 40, height: 0, content: '成功', color: '#94a3b8' },
      { id: 'success', type: 'rect' as const, x: 860, y: 155, width: 80, height: 50, content: '支付成功', color: '#10B981' },
    ]
  },

  // 整体用户流程图
  whiteboard: {
    elements: [
      { id: 'start', type: 'circle' as const, x: 50, y: 200, width: 80, height: 80, content: '用户\n进入', color: '#6366F1' },
      { id: 'a1', type: 'arrow' as const, x: 130, y: 240, width: 80, height: 0, content: '', color: '#94a3b8' },
      { id: 'auth', type: 'rect' as const, x: 210, y: 210, width: 100, height: 60, content: '登录注册', color: '#6366F1' },
      { id: 'a2', type: 'arrow' as const, x: 310, y: 240, width: 80, height: 0, content: '', color: '#94a3b8' },
      { id: 'home', type: 'rect' as const, x: 390, y: 210, width: 100, height: 60, content: 'APP首页', color: '#10B981' },
      { id: 'a3', type: 'arrow' as const, x: 440, y: 270, width: 0, height: 60, content: '', color: '#94a3b8' },
      { id: 'decide', type: 'diamond' as const, x: 400, y: 330, width: 80, height: 80, content: '选择\n功能', color: '#F59E0B' },
      { id: 'a4', type: 'arrow' as const, x: 340, y: 370, width: -80, height: 0, content: '搜索', color: '#94a3b8' },
      { id: 'search', type: 'rect' as const, x: 160, y: 340, width: 100, height: 60, content: '搜索下单', color: '#10B981' },
      { id: 'a5', type: 'arrow' as const, x: 480, y: 370, width: 80, height: 0, content: '学习', color: '#94a3b8' },
      { id: 'learn', type: 'rect' as const, x: 560, y: 340, width: 100, height: 60, content: '我的学习', color: '#F59E0B' },
      { id: 'a6', type: 'arrow' as const, x: 440, y: 410, width: 0, height: 60, content: '直播', color: '#94a3b8' },
      { id: 'live', type: 'rect' as const, x: 400, y: 470, width: 80, height: 60, content: '直播课', color: '#8B5CF6' },
    ]
  },
  // 产品文档
  docPRD: {
    content: `# 学习通产品需求文档

## 产品概述
学习通是一款面向K12学生的移动端教育APP，提供课程学习、直播互动、题库练习等功能。

## 核心功能
### 1. 用户系统
- 手机号注册/登录
- 验证码认证
- 个人中心

### 2. 课程系统
- 课程搜索与购买
- 视频学习与进度跟踪
- 章节管理

### 3. 直播系统
- 直播预约
- 实时弹幕互动
- 回放功能

### 4. 订单系统
- 课程下单支付
- 订单管理
- 退款申请
`
  },
  // 用户画像文档
  docPersona: {
    content: `# 用户画像

## 目标用户：初高中学生

### 人口特征
- 年龄：12-18岁
- 地区：一二三线城市
- 设备：智能手机为主

### 学习需求
- 课后辅导补习
- 考试冲刺提分
- 知识点答疑

### 使用场景
- 放学后在家学习
- 周末集中刷题
- 考前突击复习

### 痛点
- 课堂知识消化不完全
- 缺少个性化辅导
- 学习进度难以跟踪
`
  }
};

const App = () => {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [edges, setEdges] = useState<CanvasEdge[]>([]);
  const [pins, setPins] = useState<CanvasPin[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
      { id: 'welcome', type: 'ai', role: 'ai', content: '你好！我可以帮你把想法变成完整的产品原型。请描述你想要构建的APP吧！', timestamp: Date.now() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [simulationStarted, setSimulationStarted] = useState(false);

  // 问题流程状态
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<PlanStep[] | null>(null);

  // Canvas @ Mention State
  const [isCanvasSelectionMode, setIsCanvasSelectionMode] = useState(false);
  const [mentionedNodeIds, setMentionedNodeIds] = useState<string[]>([]);
  const [selectedNodeForMention, setSelectedNodeForMention] = useState<{ nodeId: string; nodeTitle: string } | null>(null);
  const [mentionedScreenElements, setMentionedScreenElements] = useState<Record<string, any>>({});

  // Camera State
  const [view, setView] = useState<CanvasView>({ 
      x: -(LAYOUT_CENTER_X - (window.innerWidth / 2)) * INITIAL_ZOOM, 
      y: -(LAYOUT_CENTER_Y - (window.innerHeight / 2)) * INITIAL_ZOOM, 
      scale: INITIAL_ZOOM 
  });

  // Editor & Preview States
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [editingWhiteboardId, setEditingWhiteboardId] = useState<string | null>(null);
  const [runningScreenId, setRunningScreenId] = useState<string | null>(null);
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [editingIntegrationId, setEditingIntegrationId] = useState<string | null>(null);
  const [newPinPos, setNewPinPos] = useState<{x: number, y: number} | null>(null);
  const [pendingPinCanvasPos, setPendingPinCanvasPos] = useState<{x: number, y: number} | null>(null);

  const panTo = (targetX: number, targetY: number, targetScale: number) => {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const newX = -(targetX * targetScale) + (screenW / 2);
      const newY = -(targetY * targetScale) + (screenH / 2);
      setView({ x: newX, y: newY, scale: targetScale });
  };

  // 运行模拟
  const runSimulation = async () => {
      setSimulationStarted(true);
      const userMsgId = Date.now().toString();
      setMessages(prev => [...prev, {
        id: userMsgId, type: 'user', role: 'user',
        content: "我想做一个移动端教育APP，类似学习通。",
        timestamp: Date.now()
      }]);
      setIsProcessing(true);

      await new Promise(r => setTimeout(r, 1000));
      setMessages(prev => [...prev, {
        id: 'ai-intro', type: 'ai', role: 'ai',
        content: "好的！在开始设计之前，让我先了解一些关键需求。",
        timestamp: Date.now()
      }]);
      setIsProcessing(false);

      await new Promise(r => setTimeout(r, 800));
      const firstQuestion = { ...PRODUCT_QUESTIONS[0], allQuestions: PRODUCT_QUESTIONS, currentIndex: 0 };
      setMessages(prev => [...prev, {
        id: 'question-container', type: 'question', content: '', timestamp: Date.now(),
        question: firstQuestion
      }]);
  };

  const updatePlanStatus = (msgId: string, stepId: string, status: 'pending' | 'loading' | 'done') => {
      setMessages(prev => prev.map(msg => {
          if (msg.id === msgId && msg.plan) {
              const updatedPlan = msg.plan.map(s => s.id === stepId ? { ...s, status } : s);
              setCurrentPlan(updatedPlan);
              return { ...msg, plan: updatedPlan };
          }
          return msg;
      }));
  };

  const handleAnswerQuestion = (messageId: string, optionId: string) => {};

  const handleContinueQuestion = async (messageId: string) => {
    setQuestionsCompleted(true);
    setMessages(prev => prev.map(msg =>
      msg.id === 'question-container' ? { ...msg, collapsed: true } : msg
    ));

    await new Promise(r => setTimeout(r, 500));
    const planMsgId = 'ai-plan';
    const initialSteps: PlanStep[] = [
      { id: 's1', label: '分析产品需求', status: 'pending' },
      { id: 's2', label: '设计用户流程', status: 'pending' },
      { id: 's3', label: '生成UI原型 - 登录注册', status: 'pending' },
      { id: 's4', label: '生成UI原型 - 搜索下单', status: 'pending' },
      { id: 's5', label: '生成UI原型 - 学习中心', status: 'pending' },
      { id: 's6', label: '生成UI原型 - 个人中心', status: 'pending' },
      { id: 's7', label: '生成UI原型 - 直播课程', status: 'pending' },
    ];

    setMessages(prev => [...prev, {
      id: planMsgId, type: 'ai', role: 'ai',
      content: "明白了！根据你的需求，这是我的执行计划：",
      timestamp: Date.now(), plan: initialSteps, executionStarted: false
    }]);
  };

  const handleSkipQuestion = async (messageId: string) => {
    handleContinueQuestion(messageId);
  };

  const handleStartExecution = async (messageId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        if (msg.plan) setCurrentPlan(msg.plan);
        return { ...msg, executionStarted: true };
      }
      return msg;
    }));
    await new Promise(r => setTimeout(r, 500));
    executeWorkflow(messageId);
  };

  const addAIMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: `ai-${Date.now()}-${Math.random()}`, type: 'ai', role: 'ai', content, timestamp: Date.now()
    }]);
  };

  const addFileOperationMessage = (
    operation: 'create' | 'write' | 'edit' | 'delete' | 'move',
    target: 'file' | 'document' | 'whiteboard' | 'screen' | 'table' | 'integration' | 'section',
    title: string, nodeId?: string, status: 'loading' | 'success' | 'error' = 'loading'
  ) => {
    const msgId = `file-op-${Date.now()}-${Math.random()}`;
    setMessages(prev => [...prev, {
      id: msgId, type: 'file_operation', content: '', timestamp: Date.now(),
      fileOperation: { operation, target, title, nodeId, status }
    }]);
    return msgId;
  };

  const updateFileOperationStatus = (msgId: string, status: 'loading' | 'success' | 'error') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId && msg.fileOperation) {
        return { ...msg, fileOperation: { ...msg.fileOperation, status } };
      }
      return msg;
    }));
  };

  const handleLocateNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) panTo(node.x, node.y, 0.5);
  };

  // 执行工作流
  const executeWorkflow = async (planMsgId: string) => {
    const cx = LAYOUT_CENTER_X;
    const cy = LAYOUT_CENTER_Y;
    const MOBILE_SPACING_X = 400;
    const SECTION_Y_GAP = 900;

    // Phase 1: 分析产品需求
    updatePlanStatus(planMsgId, 's1', 'loading');
    addAIMessage("正在分析教育APP产品需求...");
    await new Promise(r => setTimeout(r, 800));

    // 创建文档节点
    const docY = cy - 600;
    const docNodes: CanvasNode[] = [
      { id: 'node-doc-prd', type: NodeType.DOCUMENT, x: cx - 300, y: docY, title: '产品需求文档', status: 'loading', data: null, sectionId: SECTION_IDS.DOCUMENT },
      { id: 'node-doc-persona', type: NodeType.DOCUMENT, x: cx + 200, y: docY, title: '用户画像', status: 'loading', data: null, sectionId: SECTION_IDS.DOCUMENT },
    ];
    setNodes(prev => [...prev, ...docNodes]);
    panTo(cx, docY, 0.4);

    await new Promise(r => setTimeout(r, 600));
    let opId = addFileOperationMessage('create', 'document', '产品需求文档', 'node-doc-prd');
    await new Promise(r => setTimeout(r, 400));
    updateFileOperationStatus(opId, 'success');
    setNodes(prev => prev.map(n => n.id === 'node-doc-prd' ? { ...n, status: 'done', data: MOCK_EDU_DATA.docPRD } : n));

    opId = addFileOperationMessage('create', 'document', '用户画像', 'node-doc-persona');
    await new Promise(r => setTimeout(r, 400));
    updateFileOperationStatus(opId, 'success');
    setNodes(prev => prev.map(n => n.id === 'node-doc-persona' ? { ...n, status: 'done', data: MOCK_EDU_DATA.docPersona } : n));
    updatePlanStatus(planMsgId, 's1', 'done');

    // Phase 2: 设计信息架构和用户流程
    await new Promise(r => setTimeout(r, 600));
    updatePlanStatus(planMsgId, 's2', 'loading');
    addAIMessage("正在设计 APP 信息架构图...");

    const chartX = cx - 1200;
    const chartY = cy - 400;
    panTo(chartX + 400, chartY + 200, 0.4);

    // 创建信息架构图
    await new Promise(r => setTimeout(r, 400));
    const iaNode: CanvasNode = {
      id: 'node-whiteboard-ia', type: NodeType.WHITEBOARD, x: chartX, y: chartY, title: 'APP 信息架构图', status: 'loading', data: null, sectionId: SECTION_IDS.CHART
    };
    setNodes(prev => [...prev, iaNode]);

    opId = addFileOperationMessage('create', 'whiteboard', 'APP 信息架构图', 'node-whiteboard-ia');
    await new Promise(r => setTimeout(r, 500));
    updateFileOperationStatus(opId, 'success');
    setNodes(prev => prev.map(n => n.id === 'node-whiteboard-ia' ? { ...n, status: 'done', data: MOCK_EDU_DATA.infoArchitecture } : n));

    // 创建整体用户流程图
    addAIMessage("正在设计整体用户流程图...");
    await new Promise(r => setTimeout(r, 400));
    const overallFlowNode: CanvasNode = {
      id: 'node-whiteboard-overall', type: NodeType.WHITEBOARD, x: chartX + 900, y: chartY, title: '整体用户流程图', status: 'loading', data: null, sectionId: SECTION_IDS.CHART
    };
    setNodes(prev => [...prev, overallFlowNode]);

    opId = addFileOperationMessage('create', 'whiteboard', '整体用户流程图', 'node-whiteboard-overall');
    await new Promise(r => setTimeout(r, 500));
    updateFileOperationStatus(opId, 'success');
    setNodes(prev => prev.map(n => n.id === 'node-whiteboard-overall' ? { ...n, status: 'done', data: MOCK_EDU_DATA.whiteboard } : n));

    // 创建登录注册流程图
    addAIMessage("正在设计登录注册流程图...");
    await new Promise(r => setTimeout(r, 400));
    const authFlowNode: CanvasNode = {
      id: 'node-whiteboard-auth', type: NodeType.WHITEBOARD, x: chartX, y: chartY + 750, title: '登录注册流程图', status: 'loading', data: null, sectionId: SECTION_IDS.CHART
    };
    setNodes(prev => [...prev, authFlowNode]);
    panTo(chartX + 400, chartY + 750, 0.4);

    opId = addFileOperationMessage('create', 'whiteboard', '登录注册流程图', 'node-whiteboard-auth');
    await new Promise(r => setTimeout(r, 500));
    updateFileOperationStatus(opId, 'success');
    setNodes(prev => prev.map(n => n.id === 'node-whiteboard-auth' ? { ...n, status: 'done', data: MOCK_EDU_DATA.authFlow } : n));

    // 创建搜索下单流程图
    addAIMessage("正在设计搜索下单流程图...");
    await new Promise(r => setTimeout(r, 400));
    const searchFlowNode: CanvasNode = {
      id: 'node-whiteboard-search', type: NodeType.WHITEBOARD, x: chartX + 900, y: chartY + 750, title: '搜索下单流程图', status: 'loading', data: null, sectionId: SECTION_IDS.CHART
    };
    setNodes(prev => [...prev, searchFlowNode]);

    opId = addFileOperationMessage('create', 'whiteboard', '搜索下单流程图', 'node-whiteboard-search');
    await new Promise(r => setTimeout(r, 500));
    updateFileOperationStatus(opId, 'success');
    setNodes(prev => prev.map(n => n.id === 'node-whiteboard-search' ? { ...n, status: 'done', data: MOCK_EDU_DATA.searchFlow } : n));

    updatePlanStatus(planMsgId, 's2', 'done');

    // Phase 3-7: 生成UI原型（5个独立Section）
    // 每条边的点击热点配置：{ x, y } 是相对于手机屏幕内容区域的百分比位置，label 是按钮名称
    // x: 0=左边, 1=右边; y: 0=顶部, 1=底部
    const edgeAnchors: Record<string, { x: number; y: number; label: string }[]> = {
      auth: [
        { x: 0.5, y: 0.62, label: '手机号注册' },      // 欢迎页 → 输入框聚焦 (按钮在中下部)
        { x: 0.5, y: 0.22, label: '输入框' },          // 输入框聚焦 → 输入手机号 (输入框在上部)
        { x: 0.82, y: 0.22, label: '获取验证码' },     // 输入手机号 → 接收验证码 (按钮在输入框右侧)
        { x: 0.5, y: 0.42, label: '注册' },            // 接收验证码 → 注册成功 (注册按钮)
      ],
      search: [
        { x: 0.5, y: 0.06, label: '搜索框' },          // 首页 → 搜索页 (搜索框在顶部)
        { x: 0.9, y: 0.06, label: '搜索' },            // 搜索页 → 输入搜索 (搜索按钮在右上)
        { x: 0.5, y: 0.13, label: '中考冲刺' },        // 输入搜索 → 搜索结果 (热门标签)
        { x: 0.5, y: 0.35, label: '课程卡片' },        // 搜索结果 → 课程详情 (课程卡片在中部)
        { x: 0.5, y: 0.88, label: '立即购买' },        // 课程详情 → 下单页 (购买按钮在底部)
        { x: 0.5, y: 0.88, label: '确认支付' },        // 下单页 → 支付成功 (支付按钮在底部)
      ],
      learn: [
        { x: 0.7, y: 0.32, label: '继续学习' },        // 学习首页 → 课程详情 (继续学习按钮)
        { x: 0.5, y: 0.88, label: '开始学习' },        // 课程详情 → 视频播放 (开始学习按钮)
        { x: 0.75, y: 0.90, label: '笔记' },           // 视频播放 → 笔记页 (底部工具栏)
        { x: 0.5, y: 0.88, label: '保存笔记' },        // 笔记页 → 完成页 (保存按钮)
      ],
      profile: [
        { x: 0.25, y: 0.45, label: '我的订单' },       // 个人中心 → 我的订单 (功能入口)
        { x: 0.5, y: 0.30, label: '订单卡片' },        // 我的订单 → 订单详情 (订单卡片)
        { x: 0.08, y: 0.02, label: '返回' },           // 订单详情 → 设置 (返回按钮在左上角)
        { x: 0.5, y: 0.28, label: '修改密码' },        // 设置 → 修改密码 (设置项)
      ],
      live: [
        { x: 0.5, y: 0.32, label: '直播卡片' },        // 直播列表 → 直播详情 (直播卡片)
        { x: 0.5, y: 0.88, label: '进入直播' },        // 直播详情 → 直播间 (进入按钮)
        { x: 0.85, y: 0.88, label: '互动' },           // 直播间 → 互动页 (互动按钮)
        { x: 0.5, y: 0.88, label: '查看回放' },        // 互动页 → 回放页 (查看回放)
      ],
    };

    const sectionConfigs = [
      { id: 's3', title: 'Section 1: 登录注册流程', screens: MOCK_EDU_DATA.authScreens, prefix: 'auth', sectionId: SECTION_IDS.FLOW_AUTH },
      { id: 's4', title: 'Section 2: 搜索下单流程', screens: MOCK_EDU_DATA.searchScreens, prefix: 'search', sectionId: SECTION_IDS.FLOW_SEARCH },
      { id: 's5', title: 'Section 3: 我的学习流程', screens: MOCK_EDU_DATA.learnScreens, prefix: 'learn', sectionId: SECTION_IDS.FLOW_LEARN },
      { id: 's6', title: 'Section 4: 个人中心流程', screens: MOCK_EDU_DATA.profileScreens, prefix: 'profile', sectionId: SECTION_IDS.FLOW_PROFILE },
      { id: 's7', title: 'Section 5: 直播课程流程', screens: MOCK_EDU_DATA.liveScreens, prefix: 'live', sectionId: SECTION_IDS.FLOW_LIVE },
    ];

    for (let sIdx = 0; sIdx < sectionConfigs.length; sIdx++) {
      const config = sectionConfigs[sIdx];
    await new Promise(r => setTimeout(r, 600));
      updatePlanStatus(planMsgId, config.id, 'loading');
      addAIMessage(`正在生成 ${config.title}...`);

      const sectionY = cy + sIdx * SECTION_Y_GAP;
      const startX = cx - ((config.screens.length - 1) * MOBILE_SPACING_X) / 2;
      panTo(cx, sectionY, 0.25);

      // 创建该Section的所有屏幕节点（每个流程有独立的sectionId）
      const screenNodes: CanvasNode[] = config.screens.map((screen, i) => ({
        id: `node-screen-${config.prefix}-${i + 1}`,
        type: NodeType.SCREEN,
        x: startX + i * MOBILE_SPACING_X,
        y: sectionY,
        title: screen.screenName,
        status: 'loading' as const,
        data: null,
        sectionId: config.sectionId
      }));
      setNodes(prev => [...prev, ...screenNodes]);

      // 创建连接线（带点击热点标记）
      const anchors = edgeAnchors[config.prefix] || [];
      const sectionEdges: CanvasEdge[] = [];
      for (let i = 0; i < config.screens.length - 1; i++) {
        const anchor = anchors[i];
        sectionEdges.push({
          id: `edge-${config.prefix}-${i}`,
          fromNode: `node-screen-${config.prefix}-${i + 1}`,
          toNode: `node-screen-${config.prefix}-${i + 2}`,
          type: 'flow',
          fromAnchor: anchor ? { x: anchor.x, y: anchor.y, label: anchor.label } : undefined
        });
      }
      setEdges(prev => [...prev, ...sectionEdges]);

      // 逐个显示屏幕
      for (let i = 0; i < config.screens.length; i++) {
        const nodeId = `node-screen-${config.prefix}-${i + 1}`;
        const screen = config.screens[i];
        opId = addFileOperationMessage('create', 'screen', screen.screenName, nodeId);
    await new Promise(r => setTimeout(r, 300));
        updateFileOperationStatus(opId, 'success');
        setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'done', data: screen } : n));
      }

      updatePlanStatus(planMsgId, config.id, 'done');
    }

    // 完成
    await new Promise(r => setTimeout(r, 600));
    panTo(cx, cy + 1800, 0.15);
    setIsProcessing(false);
    addAIMessage("完成！你的移动端教育APP原型已生成：\n\n📄 **产品文档**\n• 产品需求文档\n• 用户画像\n\n🗺️ **架构与流程图**\n• APP 信息架构图\n• 整体用户流程图\n• 登录注册流程图\n• 搜索下单流程图\n\n📱 **UI 原型（5个流程，27个屏幕）**\n• 登录注册流程\n• 搜索下单流程\n• 我的学习流程\n• 个人中心流程\n• 直播课程流程\n\n点击任意屏幕可以运行预览，点击流程图可以编辑。");
  };

  // 标准处理函数
  const handleUpdateNodePosition = (id: string, x: number, y: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleBatchUpdateNodePosition = (updates: {id: string, dx: number, dy: number}[]) => {
     setNodes(prev => {
         const map = new Map(prev.map(n => [n.id, n]));
         updates.forEach(({id, dx, dy}) => {
             const node = map.get(id);
             if (node) map.set(id, { ...node, x: node.x + dx, y: node.y + dy });
         });
         return Array.from(map.values());
     });
  };

  const handleUpdateNodeSection = (nodeId: string, sectionId: string | undefined) => {
     setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, sectionId } : n));
  };

  const handleAddNode = (node: CanvasNode) => {
      setNodes(prev => [...prev, node]);
  };

  const handleEditNode = (id: string) => {
      const node = nodes.find(n => n.id === id);
      if (!node) return;
      if (node.type === NodeType.DOCUMENT) setEditingDocId(id);
      else if (node.type === NodeType.WHITEBOARD) setEditingWhiteboardId(id);
      else if (node.type === NodeType.SCREEN) setEditingDocId(id);
      else if (node.type === NodeType.TABLE) setEditingTableId(id);
      else if (node.type === NodeType.INTEGRATION) setEditingIntegrationId(id);
  };

  const handleDeleteNodes = (ids: string[]) => {
      setNodes(prev => prev.filter(n => !ids.includes(n.id)));
      setEdges(prev => prev.filter(e => !ids.includes(e.fromNode) && !ids.includes(e.toNode)));
      setPins(prev => prev.filter(p => !ids.includes(p.targetNodeId || '')));
  };

  const handleNavigate = (targetId: string) => {
    setRunningScreenId(targetId);
  };

  const onAddPinStart = (x: number, y: number) => {
      setPendingPinCanvasPos({ x, y });
      const screenX = x * view.scale + view.x;
      const screenY = y * view.scale + view.y;
      setNewPinPos({ x: screenX, y: screenY });
  };

  const handleSavePin = (content: string) => {
      if (pendingPinCanvasPos) {
          const newPin: CanvasPin = { id: `pin-${Date.now()}`, x: pendingPinCanvasPos.x, y: pendingPinCanvasPos.y, content };
          setPins(prev => [...prev, newPin]);
          setPendingPinCanvasPos(null);
          setNewPinPos(null);
      }
  };

  const handleDeletePin = (id: string) => {
      setPins(prev => prev.filter(p => p.id !== id));
  };

  const getMarkdownModalProps = () => {
    const node = nodes.find(n => n.id === editingDocId);
    if (!node) return { title: '', content: '' };
    if (node.type === NodeType.DOCUMENT) return { title: node.title, content: (node.data as DocumentData)?.content || '' };
    if (node.type === NodeType.SCREEN) return { title: `Plan: ${node.title}`, content: (node.data as ScreenData)?.plan || '' };
    return { title: '', content: '' };
  };

  const getRunningScreenData = () => {
    const node = nodes.find(n => n.id === runningScreenId);
    return node && node.type === NodeType.SCREEN ? node.data as ScreenData : null;
  };

  const getTableData = () => {
      const node = nodes.find(n => n.id === editingTableId);
      return node && node.type === NodeType.TABLE ? node.data as TableData : null;
  };

  const handleEnterCanvasSelection = () => setIsCanvasSelectionMode(true);

  const handleNodeMentionSelect = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      if (!mentionedNodeIds.includes(nodeId)) setMentionedNodeIds(prev => [...prev, nodeId]);
      setSelectedNodeForMention({ nodeId: node.id, nodeTitle: node.title });
      setIsCanvasSelectionMode(false);
    }
  };

  const handleClearSelectedNode = () => setSelectedNodeForMention(null);

  const handleRemoveMention = (nodeId: string) => {
    setMentionedNodeIds(prev => prev.filter(id => id !== nodeId));
    const node = nodes.find(n => n.id === nodeId);
    if (node) setSelectedNodeForMention({ nodeId: node.id, nodeTitle: `REMOVE:${node.title}` });
  };

  const handleScreenElementMentionSelect = (nodeId: string, element: any) => {
    const screenNode = nodes.find(n => n.id === nodeId);
    if (screenNode) {
      const elementId = `${nodeId}-${element.cssPath}`;
      const fullLabel = `${screenNode.title}-${element.label}`;
      setMentionedScreenElements(prev => ({ ...prev, [elementId]: { id: elementId, nodeId, cssPath: element.cssPath, label: element.label, boundingBox: element.boundingBox } }));
      setSelectedNodeForMention({ nodeId: elementId, nodeTitle: fullLabel });
      setIsCanvasSelectionMode(false);
    }
  };

  const handleRemoveScreenElementMention = (elementId: string) => {
    const element = mentionedScreenElements[elementId];
    if (element) {
      setMentionedScreenElements(prev => { const newState = { ...prev }; delete newState[elementId]; return newState; });
      const screenNode = nodes.find(n => n.id === element.nodeId);
      if (screenNode) {
        const fullLabel = `${screenNode.title}-${element.label}`;
        setSelectedNodeForMention({ nodeId: elementId, nodeTitle: `REMOVE:${fullLabel}` });
      }
    }
  };

  const handleSendMessage = (content: string) => {
    setMessages(p => [...p, { id: Date.now().toString(), role: 'user', type: 'user', content, timestamp: Date.now() }]);
    setMentionedNodeIds([]);
    setMentionedScreenElements({});
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCanvasSelectionMode) setIsCanvasSelectionMode(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCanvasSelectionMode]);

  return (
    <div className="flex w-full h-screen bg-moxt-theme-bg overflow-hidden">
      <ChatSidebar
        messages={messages}
        onSendMessage={handleSendMessage}
        onStartSimulation={runSimulation}
        isProcessing={isProcessing}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        nodes={nodes}
        sections={sections}
        onEnterCanvasSelection={handleEnterCanvasSelection}
        mentionedNodeIds={mentionedNodeIds}
        selectedNodeForMention={selectedNodeForMention}
        onClearSelectedNode={handleClearSelectedNode}
        onStartExecution={handleStartExecution}
        onAnswerQuestion={handleAnswerQuestion}
        onSkipQuestion={handleSkipQuestion}
        onContinueQuestion={handleContinueQuestion}
        onLocateNode={handleLocateNode}
        currentPlan={currentPlan}
      />

      <main className="flex-1 relative h-full">
        <CanvasContainer
            nodes={nodes}
            edges={edges}
            pins={pins}
            view={view}
            onViewChange={setView}
            onNodeMove={handleUpdateNodePosition}
            onBatchNodeMove={handleBatchUpdateNodePosition}
            onNodeSectionChange={handleUpdateNodeSection}
            onAddNode={handleAddNode}
            onEditNode={handleEditNode}
            onRunNode={setRunningScreenId}
            onAddPinClick={onAddPinStart}
            onDeletePin={handleDeletePin}
            onDeleteNodes={handleDeleteNodes}
            isCanvasSelectionMode={isCanvasSelectionMode}
            mentionedNodeIds={mentionedNodeIds}
            onNodeMentionSelect={handleNodeMentionSelect}
            onRemoveMention={handleRemoveMention}
        />

        {runningScreenId && (
          <ImmersiveView
             data={getRunningScreenData()!}
             onClose={() => setRunningScreenId(null)}
             onNavigate={handleNavigate}
             nodeId={runningScreenId}
             isCanvasSelectionMode={isCanvasSelectionMode}
             onElementMentionSelect={(element) => handleScreenElementMentionSelect(runningScreenId, element)}
             mentionedElements={Object.values(mentionedScreenElements).filter((el: any) => el.nodeId === runningScreenId)}
             onRemoveElementMention={(elementId) => handleRemoveScreenElementMention(elementId)}
          />
        )}

        {editingDocId && (
          <MarkdownModal
              isOpen={true}
              title={getMarkdownModalProps().title}
              initialContent={getMarkdownModalProps().content}
              onSave={(c) => setNodes(prev => prev.map(n => n.id === editingDocId ? { ...n, data: { ...n.data, [n.type === NodeType.SCREEN ? 'plan' : 'content']: c } as any } : n))}
              onClose={() => setEditingDocId(null)}
          />
        )}

        {editingWhiteboardId && (
          <WhiteboardModal
              isOpen={true}
              title="Chart Editor"
              initialData={nodes.find(n => n.id === editingWhiteboardId)?.data as WhiteboardData}
              onSave={(d) => setNodes(prev => prev.map(n => n.id === editingWhiteboardId ? { ...n, data: d } : n))}
              onClose={() => setEditingWhiteboardId(null)}
          />
        )}

        {editingTableId && (
          <DatabaseModal
              isOpen={true}
              title={nodes.find(n => n.id === editingTableId)?.title || 'Table'}
              data={getTableData()}
              onClose={() => setEditingTableId(null)}
          />
        )}

        {editingIntegrationId && (
          <IntegrationModal
              isOpen={true}
              title={nodes.find(n => n.id === editingIntegrationId)?.title || 'Integration'}
              initialData={nodes.find(n => n.id === editingIntegrationId)?.data as IntegrationData}
              onSave={(d) => setNodes(prev => prev.map(n => n.id === editingIntegrationId ? { ...n, data: d } : n))}
              onClose={() => setEditingIntegrationId(null)}
          />
        )}
      </main>

      {newPinPos && (
          <PinModal
              isOpen={true}
              position={newPinPos}
              nodes={nodes}
              onSave={handleSavePin}
              onClose={() => { setNewPinPos(null); setPendingPinCanvasPos(null); }}
          />
      )}
    </div>
  );
};

export default App;
