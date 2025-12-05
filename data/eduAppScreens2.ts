// 教育APP移动端屏幕数据 - 第二部分 (shadcn/ui 风格)
import { ScreenData } from '../types';

// Section 3: 我的学习流程
export const screen_learn_1: ScreenData = {
  screenName: "我的课程",
  variant: 'mobile',
  plan: `# 我的课程列表`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 py-3 border-b border-slate-100">
        <h1 class="text-base font-semibold text-slate-900">我的课程</h1>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer" data-to="learn-2">
            <div class="flex gap-3">
              <div class="w-16 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-lg shrink-0">📐</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-slate-900">中考数学冲刺班</h4>
                  <span class="text-xs font-medium text-violet-600">35%</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">已学 5/12 节</p>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all" style="width: 35%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div class="flex gap-3">
              <div class="w-16 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-lg shrink-0">📚</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-slate-900">高考英语突破营</h4>
                  <span class="text-xs font-medium text-emerald-600">80%</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">已学 16/20 节</p>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style="width: 80%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div class="flex gap-3">
              <div class="w-16 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-lg shrink-0">💻</div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium text-slate-900">Python编程入门</h4>
                  <span class="text-xs font-medium text-amber-600">10%</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">已学 2/18 节</p>
                <div class="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style="width: 10%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_learn_2: ScreenData = {
  screenName: "课程目录",
  variant: 'mobile',
  plan: `# 课程章节目录`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">中考数学冲刺班</span>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-400">学习进度</span>
            <span class="text-xs font-medium text-violet-600">35%</span>
          </div>
          <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" style="width: 35%"></div>
          </div>
        </div>
        <h3 class="text-sm font-semibold text-slate-900 mb-3">章节目录</h3>
        <div class="space-y-1">
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="text-sm text-slate-500">第一章：函数基础</span>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="text-sm text-slate-500">第二章：函数图像</span>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 bg-violet-50 rounded-lg border border-violet-100" data-to="learn-3">
            <div class="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="text-sm font-medium text-violet-700 flex-1">第三章：几何入门</span>
            <span class="text-xs text-violet-500 font-medium">继续</span>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-6 h-6 border-2 border-slate-200 rounded-full"></div>
            <span class="text-sm text-slate-600">第四章：几何证明</span>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-6 h-6 border-2 border-slate-200 rounded-full"></div>
            <span class="text-sm text-slate-600">第五章：压轴题技巧</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_learn_3: ScreenData = {
  screenName: "章节详情",
  variant: 'mobile',
  plan: `# 章节课程列表`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">第三章：几何入门</span>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <p class="text-xs text-slate-400 mb-4">本章共 4 节课</p>
        <div class="space-y-2">
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-slate-500">3.1 点线面的关系</p>
              <p class="text-xs text-slate-400 mt-0.5">15:20</p>
            </div>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-slate-500">3.2 角度计算基础</p>
              <p class="text-xs text-slate-400 mt-0.5">18:45</p>
            </div>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 bg-violet-50 rounded-xl border border-violet-100" data-to="learn-4">
            <div class="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-violet-700">3.3 三角形性质</p>
              <p class="text-xs text-violet-400 mt-0.5">22:10</p>
            </div>
            <button class="px-4 py-1.5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-medium rounded-lg transition-colors">
              继续
            </button>
          </div>
          <div class="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div class="w-8 h-8 border-2 border-slate-200 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-slate-600">3.4 四边形入门</p>
              <p class="text-xs text-slate-400 mt-0.5">19:30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_learn_4: ScreenData = {
  screenName: "视频播放",
  variant: 'mobile',
  plan: `# 视频播放页`,
  htmlContent: `
    <div class="h-full bg-slate-900 flex flex-col">
      <div class="relative aspect-video bg-black">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <button class="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-colors">
              <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <p class="text-sm text-white/80">3.3 三角形性质</p>
          </div>
        </div>
        <button class="absolute top-4 left-4 w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <div class="h-1 bg-white/20 rounded-full overflow-hidden mb-2">
            <div class="h-full bg-violet-500 rounded-full" style="width: 45%"></div>
          </div>
          <div class="flex items-center justify-between text-xs text-white/60">
            <span>09:58</span>
            <span>22:10</span>
          </div>
        </div>
      </div>
      <div class="flex-1 p-4">
        <h2 class="text-base font-semibold text-white mb-1">3.3 三角形性质</h2>
        <p class="text-sm text-slate-400 mb-4">王老师 · 第三章第3节</p>
        <div class="flex gap-3 mb-4">
          <button class="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors">上一节</button>
          <button class="flex-1 py-3 bg-violet-500 hover:bg-violet-600 text-white rounded-xl text-sm font-medium transition-colors" data-to="learn-5">下一节</button>
        </div>
        <div class="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 class="text-xs font-medium text-slate-400 mb-2">课程笔记</h3>
          <p class="text-sm text-slate-300">三角形内角和等于180度，这是几何证明的基础...</p>
        </div>
      </div>
    </div>
  `
};

export const screen_learn_5: ScreenData = {
  screenName: "学习完成",
  variant: 'mobile',
  plan: `# 学习完成页`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-violet-600 to-purple-700 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
          <svg class="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white">恭喜完成学习</h1>
        <p class="text-sm text-violet-200 mt-2 mb-6">「3.3 三角形性质」</p>
        <div class="flex items-center gap-8 mb-10">
          <div class="text-center">
            <p class="text-3xl font-bold text-white">22</p>
            <p class="text-xs text-violet-200 mt-1">学习时长(分钟)</p>
          </div>
          <div class="w-px h-12 bg-white/20"></div>
          <div class="text-center">
            <p class="text-3xl font-bold text-white">+10</p>
            <p class="text-xs text-violet-200 mt-1">获得积分</p>
          </div>
        </div>
        <button class="w-full bg-white hover:bg-slate-50 text-violet-600 py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 mb-3">
          继续下一节
        </button>
        <button class="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 rounded-xl text-sm font-medium transition-all duration-200">
          返回目录
        </button>
      </div>
    </div>
  `
};

// Section 4: 个人中心流程
export const screen_profile_1: ScreenData = {
  screenName: "个人中心",
  variant: 'mobile',
  plan: `# 个人中心首页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-gradient-to-br from-slate-900 to-slate-800 px-4 pt-6 pb-12">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/10">
            <span class="text-white font-semibold text-lg">张</span>
          </div>
          <div class="text-white flex-1">
            <h2 class="text-base font-semibold">张小明</h2>
            <p class="text-xs text-slate-400 mt-0.5">ID: 88888888</p>
          </div>
          <button class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" data-to="profile-2">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-1 -mt-6 px-4 overflow-auto">
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-4">
          <div class="flex justify-around">
            <div class="text-center">
              <p class="text-xl font-bold text-slate-900">5</p>
              <p class="text-xs text-slate-400 mt-1">我的课程</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-slate-900">128h</p>
              <p class="text-xs text-slate-400 mt-1">学习时长</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-slate-900">3</p>
              <p class="text-xs text-slate-400 mt-1">获得证书</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <button class="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100" data-to="profile-3">
            <div class="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <span class="text-sm text-slate-700 flex-1 text-left">我的订单</span>
            <span class="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">2</span>
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          <button class="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div class="w-9 h-9 bg-pink-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <span class="text-sm text-slate-700 flex-1 text-left">我的收藏</span>
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          <button class="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div class="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <span class="text-sm text-slate-700 flex-1 text-left">消息通知</span>
            <span class="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">5</span>
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          <button class="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
            <div class="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-sm text-slate-700 flex-1 text-left">帮助中心</span>
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
};

export const screen_profile_2: ScreenData = {
  screenName: "编辑资料",
  variant: 'mobile',
  plan: `# 编辑资料页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">编辑资料</span>
        <button class="text-sm text-violet-600 font-medium hover:text-violet-700" data-to="profile-3">保存</button>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="flex flex-col items-center mb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-3">
            <span class="text-white font-semibold text-2xl">张</span>
          </div>
          <button class="text-sm text-violet-600 font-medium">更换头像</button>
        </div>
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <span class="text-sm text-slate-500">昵称</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-900">张小明</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <span class="text-sm text-slate-500">性别</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-900">男</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <span class="text-sm text-slate-500">学校</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-900">北京市第一中学</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <span class="text-sm text-slate-500">年级</span>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-900">初三</span>
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_profile_3: ScreenData = {
  screenName: "我的订单",
  variant: 'mobile',
  plan: `# 订单列表页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">我的订单</span>
      </div>
      <div class="flex gap-1 p-2 bg-white border-b border-slate-100">
        <button class="flex-1 py-2 text-sm rounded-lg bg-slate-900 text-white font-medium">全部</button>
        <button class="flex-1 py-2 text-sm rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">待支付</button>
        <button class="flex-1 py-2 text-sm rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">已完成</button>
        <button class="flex-1 py-2 text-sm rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">退款</button>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100" data-to="profile-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-slate-400">2024-12-05 14:32</span>
              <span class="text-xs text-emerald-600 font-medium">已完成</span>
            </div>
            <div class="flex gap-3">
              <div class="w-14 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-base shrink-0">📐</div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-slate-900">中考数学冲刺班</h4>
                <p class="text-sm font-semibold text-violet-600 mt-1">¥249</p>
              </div>
            </div>
            <div class="flex gap-2 mt-3 pt-3 border-t border-slate-100">
              <button class="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-medium transition-colors">申请退款</button>
              <button class="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors">再次购买</button>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-slate-400">2024-11-20 10:15</span>
              <span class="text-xs text-emerald-600 font-medium">已完成</span>
            </div>
            <div class="flex gap-3">
              <div class="w-14 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-base shrink-0">📚</div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-slate-900">高考英语突破营</h4>
                <p class="text-sm font-semibold text-violet-600 mt-1">¥399</p>
              </div>
            </div>
            <div class="flex gap-2 mt-3 pt-3 border-t border-slate-100">
              <button class="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-medium transition-colors">申请退款</button>
              <button class="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors">再次购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_profile_4: ScreenData = {
  screenName: "订单详情",
  variant: 'mobile',
  plan: `# 订单详情页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">订单详情</span>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-900">交易成功</h3>
              <p class="text-xs text-slate-400">2024-12-05 14:32:18</p>
            </div>
          </div>
          <div class="flex gap-3 p-3 bg-slate-50 rounded-lg">
            <div class="w-14 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-base shrink-0">📐</div>
            <div>
              <h4 class="text-sm font-medium text-slate-900">中考数学冲刺班</h4>
              <p class="text-xs text-slate-400">王老师 · 12节课</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3">
          <h3 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">订单信息</h3>
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500">订单编号</span>
              <span class="text-sm text-slate-900 font-mono">2024120500001</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500">支付方式</span>
              <span class="text-sm text-slate-900">微信支付</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500">订单金额</span>
              <span class="text-sm text-slate-900">¥299</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-500">优惠金额</span>
              <span class="text-sm text-red-500">-¥50</span>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <span class="text-sm text-slate-500">实付金额</span>
              <span class="text-base font-bold text-violet-600">¥249</span>
            </div>
          </div>
        </div>
        <button class="w-full py-3 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-sm font-medium transition-colors" data-to="profile-5">
          申请退款
        </button>
      </div>
    </div>
  `
};

export const screen_profile_5: ScreenData = {
  screenName: "退款成功",
  variant: 'mobile',
  plan: `# 退款成功页`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-emerald-500 to-emerald-600 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
          <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white">退款成功</h1>
        <p class="text-base text-emerald-100 mt-2">退款金额：¥249</p>
        <p class="text-sm text-emerald-200 mt-1 mb-10 text-center">退款将在1-3个工作日内<br/>原路返回您的支付账户</p>
        <button class="w-full bg-white hover:bg-slate-50 text-emerald-600 py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200">
          返回订单列表
        </button>
      </div>
    </div>
  `
};

// Section 5: 直播课程流程
export const screen_live_1: ScreenData = {
  screenName: "直播列表",
  variant: 'mobile',
  plan: `# 直播列表页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 py-3 border-b border-slate-100">
        <h1 class="text-base font-semibold text-slate-900">直播课程</h1>
      </div>
      <div class="flex gap-1 p-2 bg-white border-b border-slate-100">
        <button class="flex-1 py-2 text-sm rounded-lg bg-violet-600 text-white font-medium">即将开始</button>
        <button class="flex-1 py-2 text-sm rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">正在直播</button>
        <button class="flex-1 py-2 text-sm rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">精彩回放</button>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer" data-to="live-2">
            <div class="flex gap-3">
              <div class="w-24 h-16 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg flex items-center justify-center relative overflow-hidden shrink-0">
                <svg class="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-medium rounded">即将开始</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-slate-900">中考数学押题班</h4>
                <p class="text-xs text-slate-400 mt-0.5">王老师</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs text-violet-600 font-medium">今天 19:00</span>
                  <span class="text-xs text-slate-300">·</span>
                  <span class="text-xs text-slate-400">1.2万人预约</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div class="flex gap-3">
              <div class="w-24 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shrink-0">
                <svg class="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-slate-900">英语语法突破</h4>
                <p class="text-xs text-slate-400 mt-0.5">李老师</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs text-violet-600 font-medium">明天 20:00</span>
                  <span class="text-xs text-slate-300">·</span>
                  <span class="text-xs text-slate-400">8562人预约</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_live_2: ScreenData = {
  screenName: "直播详情",
  variant: 'mobile',
  plan: `# 直播详情页`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="relative h-40 bg-gradient-to-br from-violet-600 to-purple-700">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <button class="absolute top-3 left-3 w-9 h-9 bg-black/20 backdrop-blur rounded-full flex items-center justify-center z-10">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span class="px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-lg">即将开始</span>
          <span class="text-sm text-white/80">今天 19:00</span>
        </div>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <h1 class="text-lg font-semibold text-slate-900 mb-1">中考数学押题班</h1>
        <p class="text-sm text-slate-400 mb-4">王老师 · 预计时长90分钟</p>
        <div class="bg-violet-50 border border-violet-100 rounded-xl p-3 mb-4">
          <p class="text-sm text-violet-700 flex items-center gap-2">
            <span>📢</span>
            距离开播还有 2小时15分
          </p>
        </div>
        <h3 class="text-sm font-semibold text-slate-900 mb-3">直播内容</h3>
        <ul class="space-y-2 mb-4">
          <li class="flex items-start gap-2 text-sm text-slate-600">
            <span class="text-violet-500 mt-0.5">•</span>
            2024年中考数学命题趋势分析
          </li>
          <li class="flex items-start gap-2 text-sm text-slate-600">
            <span class="text-violet-500 mt-0.5">•</span>
            高频考点精准押题
          </li>
          <li class="flex items-start gap-2 text-sm text-slate-600">
            <span class="text-violet-500 mt-0.5">•</span>
            压轴题解题策略
          </li>
        </ul>
        <div class="flex items-center gap-2 text-sm text-slate-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span>1.2万人已预约</span>
        </div>
      </div>
      <div class="p-4 border-t border-slate-100">
        <button class="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium shadow-lg shadow-violet-500/20 transition-all" data-to="live-3">
          立即预约
        </button>
      </div>
    </div>
  `
};

export const screen_live_3: ScreenData = {
  screenName: "预约成功",
  variant: 'mobile',
  plan: `# 预约成功页`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-violet-600 to-purple-700 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
          <svg class="w-10 h-10 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white">预约成功</h1>
        <p class="text-sm text-violet-200 mt-2">「中考数学押题班」</p>
        <p class="text-base text-white mt-1 mb-6">开播时间：今天 19:00</p>
        <div class="bg-white/10 backdrop-blur rounded-xl p-4 mb-8 w-full border border-white/10">
          <p class="text-sm text-center text-white/90 mb-3">开播前15分钟将通过以下方式提醒您：</p>
          <div class="flex justify-center gap-6">
            <span class="text-sm text-white/70">📱 APP推送</span>
            <span class="text-sm text-white/70">💬 短信</span>
          </div>
        </div>
        <button class="w-full bg-white hover:bg-slate-50 text-violet-600 py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 mb-3" data-to="live-4">
          添加到日历
        </button>
        <button class="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 rounded-xl text-sm font-medium transition-all duration-200">
          返回直播列表
        </button>
      </div>
    </div>
  `
};

export const screen_live_4: ScreenData = {
  screenName: "直播间",
  variant: 'mobile',
  plan: `# 直播间页面`,
  htmlContent: `
    <div class="h-full bg-slate-900 flex flex-col">
      <div class="relative flex-1 bg-gradient-to-b from-slate-800 to-slate-900">
        <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <button class="w-9 h-9 bg-black/30 backdrop-blur rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <span class="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            直播中
          </span>
          <span class="text-sm text-white/80 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">1.5万</span>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-3 flex items-center justify-center ring-4 ring-violet-500/20">
              <span class="text-white font-semibold text-2xl">王</span>
            </div>
            <p class="text-base font-medium text-white">王老师</p>
            <p class="text-sm text-white/60 mt-0.5">中考数学押题班</p>
          </div>
        </div>
      </div>
      <div class="h-36 bg-black/50 backdrop-blur p-3">
        <div class="h-16 overflow-hidden mb-3 space-y-1.5">
          <div class="text-sm">
            <span class="text-violet-400 font-medium">学生A</span>
            <span class="text-white/80 ml-2">老师讲得太好了！</span>
          </div>
          <div class="text-sm">
            <span class="text-pink-400 font-medium">学生B</span>
            <span class="text-white/80 ml-2">这个公式我终于懂了</span>
          </div>
          <div class="text-sm">
            <span class="text-cyan-400 font-medium">学生C</span>
            <span class="text-white/80 ml-2">❤️❤️❤️</span>
          </div>
        </div>
        <div class="flex gap-2">
          <input class="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50" placeholder="发送弹幕..." />
          <button class="px-5 py-2.5 bg-violet-500 hover:bg-violet-600 text-white rounded-full text-sm font-medium transition-colors" data-to="live-5">发送</button>
        </div>
      </div>
    </div>
  `
};

export const screen_live_5: ScreenData = {
  screenName: "直播结束",
  variant: 'mobile',
  plan: `# 直播结束页`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl ring-4 ring-white/10">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white">直播已结束</h1>
        <p class="text-sm text-slate-400 mt-2 mb-6">感谢您的观看！</p>
        <div class="bg-white/5 backdrop-blur rounded-xl p-5 mb-8 w-full border border-white/10">
          <div class="flex justify-around text-center">
            <div>
              <p class="text-2xl font-bold text-white">92</p>
              <p class="text-xs text-slate-400 mt-1">观看时长(分钟)</p>
            </div>
            <div class="w-px bg-white/10"></div>
            <div>
              <p class="text-2xl font-bold text-white">12</p>
              <p class="text-xs text-slate-400 mt-1">发送弹幕</p>
            </div>
            <div class="w-px bg-white/10"></div>
            <div>
              <p class="text-2xl font-bold text-white">+50</p>
              <p class="text-xs text-slate-400 mt-1">获得积分</p>
            </div>
          </div>
        </div>
        <button class="w-full bg-violet-500 hover:bg-violet-600 text-white py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 mb-3">
          观看回放
        </button>
        <button class="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3.5 px-6 rounded-xl text-sm font-medium transition-all duration-200">
          返回首页
        </button>
      </div>
    </div>
  `
};

// 导出
export const EDU_APP_SCREENS_2 = {
  learn: [screen_learn_1, screen_learn_2, screen_learn_3, screen_learn_4, screen_learn_5],
  profile: [screen_profile_1, screen_profile_2, screen_profile_3, screen_profile_4, screen_profile_5],
  live: [screen_live_1, screen_live_2, screen_live_3, screen_live_4, screen_live_5],
};
