// 教育APP移动端屏幕数据 - shadcn/ui 风格
import { ScreenData } from '../types';

// shadcn 风格配色
// Primary: slate-900, Secondary: slate-500, Accent: violet-600
// Background: white/slate-50, Border: slate-200, Muted: slate-100

// Section 1: 登录注册流程
export const screen_auth_1: ScreenData = {
  screenName: "欢迎页",
  variant: 'mobile',
  plan: `# 欢迎页\n- 品牌展示\n- 注册/登录入口`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-violet-500/25 ring-1 ring-white/10">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white tracking-tight">学习通</h1>
        <p class="text-sm text-slate-400 mt-1 mb-10">让学习更简单高效</p>
        <button class="w-full bg-white hover:bg-slate-50 text-slate-900 py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200" data-to="auth-2">
          手机号注册
        </button>
        <button class="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3.5 px-6 rounded-xl text-sm font-medium mt-3 transition-all duration-200">
          已有账号登录
        </button>
        <p class="text-xs text-slate-500 mt-8 text-center">注册即表示同意<span class="text-violet-400">《用户协议》</span>和<span class="text-violet-400">《隐私政策》</span></p>
      </div>
    </div>
  `
};

export const screen_auth_2: ScreenData = {
  screenName: "输入框聚焦",
  variant: 'mobile',
  plan: `# 输入框聚焦状态\n- 引导用户输入`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="p-4 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">注册</span>
      </div>
      <div class="flex-1 p-6">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-slate-900">输入手机号</h2>
          <p class="text-sm text-slate-500 mt-1">我们将发送验证码到您的手机</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700">手机号码</label>
          <div class="relative">
            <div class="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border-2 border-violet-500 rounded-xl ring-4 ring-violet-500/10 transition-all">
              <span class="text-sm font-medium text-slate-600 pr-3 border-r border-slate-200">+86</span>
              <span class="text-sm text-violet-500 animate-pulse">|</span>
            </div>
          </div>
          <p class="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            输入框已获得焦点
          </p>
        </div>
        <button class="w-full bg-slate-100 text-slate-400 py-3.5 rounded-xl text-sm font-medium mt-6 cursor-not-allowed" disabled>
          获取验证码
        </button>
      </div>
    </div>
  `
};

export const screen_auth_3: ScreenData = {
  screenName: "输入手机号",
  variant: 'mobile',
  plan: `# 手机号输入完成\n- 可获取验证码`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="p-4 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">注册</span>
      </div>
      <div class="flex-1 p-6">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-slate-900">输入手机号</h2>
          <p class="text-sm text-slate-500 mt-1">我们将发送验证码到您的手机</p>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700">手机号码</label>
          <div class="flex items-center gap-3 px-4 py-3.5 bg-white border border-slate-200 rounded-xl transition-all">
            <span class="text-sm font-medium text-slate-600 pr-3 border-r border-slate-200">+86</span>
            <span class="text-sm font-medium text-slate-900 tracking-wider">138 8888 8888</span>
            <button class="ml-auto text-slate-400 hover:text-slate-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <button class="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl text-sm font-medium mt-6 shadow-lg shadow-slate-900/10 transition-all duration-200" data-to="auth-4">
          获取验证码
        </button>
        <p class="text-xs text-slate-400 text-center mt-4">验证码将在60秒内发送</p>
      </div>
    </div>
  `
};

export const screen_auth_4: ScreenData = {
  screenName: "输入验证码",
  variant: 'mobile',
  plan: `# 验证码输入中`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="p-4 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">验证码</span>
      </div>
      <div class="flex-1 p-6">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-slate-900">输入验证码</h2>
          <p class="text-sm text-slate-500 mt-1">已发送至 138****8888</p>
        </div>
        <div class="flex gap-2.5 justify-center mb-6">
          <div class="w-11 h-14 bg-slate-50 border-2 border-violet-500 rounded-lg flex items-center justify-center text-xl font-semibold text-slate-900 shadow-sm">5</div>
          <div class="w-11 h-14 bg-slate-50 border-2 border-violet-500 rounded-lg flex items-center justify-center text-xl font-semibold text-slate-900 shadow-sm">8</div>
          <div class="w-11 h-14 bg-slate-50 border-2 border-violet-500 rounded-lg flex items-center justify-center text-xl font-semibold text-slate-900 shadow-sm">3</div>
          <div class="w-11 h-14 bg-slate-50 border-2 border-violet-500 rounded-lg flex items-center justify-center text-xl font-semibold text-slate-900 shadow-sm">6</div>
          <div class="w-11 h-14 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center text-xl font-semibold text-slate-300"></div>
          <div class="w-11 h-14 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center text-xl font-semibold text-slate-300"></div>
        </div>
        <div class="flex items-center justify-center gap-2 text-sm text-slate-500">
          <div class="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></div>
          正在输入验证码...
        </div>
        <button class="w-full text-violet-600 hover:text-violet-700 text-sm font-medium mt-6 transition-colors">
          58秒后可重新获取
        </button>
      </div>
    </div>
  `
};

export const screen_auth_5: ScreenData = {
  screenName: "验证码正确",
  variant: 'mobile',
  plan: `# 验证成功`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="p-4 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">验证码</span>
      </div>
      <div class="flex-1 p-6">
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-slate-900">输入验证码</h2>
          <p class="text-sm text-slate-500 mt-1">已发送至 138****8888</p>
        </div>
        <div class="flex gap-2.5 justify-center mb-6">
          <div class="w-11 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center justify-center text-xl font-semibold text-emerald-600 shadow-sm">5</div>
          <div class="w-11 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center justify-center text-xl font-semibold text-emerald-600 shadow-sm">8</div>
          <div class="w-11 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center justify-center text-xl font-semibold text-emerald-600 shadow-sm">3</div>
          <div class="w-11 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center justify-center text-xl font-semibold text-emerald-600 shadow-sm">6</div>
          <div class="w-11 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center justify-center text-xl font-semibold text-emerald-600 shadow-sm">2</div>
          <div class="w-11 h-14 bg-emerald-50 border-2 border-emerald-500 rounded-lg flex items-center justify-center text-xl font-semibold text-emerald-600 shadow-sm">1</div>
        </div>
        <div class="flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          验证成功，正在注册...
        </div>
      </div>
    </div>
  `
};

export const screen_auth_6: ScreenData = {
  screenName: "注册成功",
  variant: 'mobile',
  plan: `# 注册成功页`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-emerald-500 to-emerald-600 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
          <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white">注册成功</h1>
        <p class="text-sm text-emerald-100 mt-2 mb-10 text-center">欢迎加入学习通<br/>开启你的学习之旅</p>
        <button class="w-full bg-white hover:bg-slate-50 text-emerald-600 py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200">
          进入首页
        </button>
      </div>
    </div>
  `
};

// Section 2: 搜索下单流程
export const screen_search_1: ScreenData = {
  screenName: "APP首页",
  variant: 'mobile',
  plan: `# APP首页\n- 搜索入口\n- 推荐课程`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 pt-3 pb-4 border-b border-slate-100">
        <div class="flex items-center gap-3 px-4 py-3 bg-slate-100 hover:bg-slate-200/70 rounded-xl cursor-pointer transition-colors" data-to="search-2">
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span class="text-sm text-slate-400">搜索课程、老师</span>
        </div>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-semibold text-slate-900">推荐课程</h3>
          <button class="text-xs text-violet-600 font-medium hover:text-violet-700">查看全部</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer">
            <div class="aspect-[4/3] bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-3xl mb-3">📐</div>
            <p class="text-sm font-medium text-slate-900 truncate">中考数学冲刺</p>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="text-xs text-slate-400">王老师</span>
              <span class="text-xs text-slate-300">·</span>
              <span class="text-xs text-slate-400">2.3万人</span>
            </div>
            <p class="text-sm font-semibold text-violet-600 mt-2">¥299</p>
          </div>
          <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer">
            <div class="aspect-[4/3] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-3xl mb-3">📚</div>
            <p class="text-sm font-medium text-slate-900 truncate">高考英语突破</p>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="text-xs text-slate-400">李老师</span>
              <span class="text-xs text-slate-300">·</span>
              <span class="text-xs text-slate-400">1.8万人</span>
            </div>
            <p class="text-sm font-semibold text-violet-600 mt-2">¥399</p>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-sm font-semibold text-slate-900 mb-3">热门直播</h3>
          <div class="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-4 shadow-lg shadow-violet-500/20">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 bg-red-500 text-white text-[10px] font-medium rounded">LIVE</span>
              <span class="text-xs text-violet-200">今晚 19:00</span>
            </div>
            <p class="text-base font-semibold text-white">中考数学押题直播</p>
            <p class="text-xs text-violet-200 mt-1">王老师 · 1.2万人预约</p>
          </div>
        </div>
      </div>
      <div class="bg-white border-t border-slate-100 px-6 py-3 flex justify-around">
        <button class="flex flex-col items-center gap-1 text-violet-600">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          <span class="text-[10px] font-medium">首页</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span class="text-[10px] font-medium">直播</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span class="text-[10px] font-medium">我的</span>
        </button>
      </div>
    </div>
  `
};

export const screen_search_2: ScreenData = {
  screenName: "搜索页",
  variant: 'mobile',
  plan: `# 搜索页面`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="p-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors shrink-0">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div class="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-xl ring-2 ring-violet-500 ring-offset-1">
            <svg class="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span class="text-sm text-violet-500 animate-pulse">|</span>
          </div>
          <button class="text-sm text-violet-600 font-medium shrink-0">搜索</button>
        </div>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <h3 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">热门搜索</h3>
        <div class="flex flex-wrap gap-2">
          <button class="px-3.5 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-lg text-sm font-medium transition-colors" data-to="search-3">🔥 中考冲刺</button>
          <button class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition-colors">高考数学</button>
          <button class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition-colors">英语口语</button>
          <button class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition-colors">物理实验</button>
          <button class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm transition-colors">编程入门</button>
        </div>
        <h3 class="text-xs font-medium text-slate-400 uppercase tracking-wider mt-6 mb-3">搜索历史</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-sm text-slate-600">初中数学</span>
          </div>
          <div class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <svg class="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-sm text-slate-600">Python编程</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_search_3: ScreenData = {
  screenName: "搜索结果",
  variant: 'mobile',
  plan: `# 搜索结果页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white p-4 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors shrink-0">
            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div class="flex-1 flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span class="text-sm text-slate-700">中考冲刺</span>
            <button class="ml-auto text-slate-400 hover:text-slate-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <p class="text-xs text-slate-400 mb-3">找到 28 个相关课程</p>
        <div class="space-y-3">
          <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all cursor-pointer" data-to="search-4">
            <div class="flex gap-3">
              <div class="w-24 h-18 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl shrink-0">📐</div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-slate-900">中考数学冲刺班</h4>
                <p class="text-xs text-slate-400 mt-1">王老师 · 2.3万人学过</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-sm font-semibold text-violet-600">¥299</span>
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span class="text-xs text-slate-500">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
            <div class="flex gap-3">
              <div class="w-24 h-18 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-2xl shrink-0">📖</div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-slate-900">中考语文提分班</h4>
                <p class="text-xs text-slate-400 mt-1">李老师 · 1.8万人学过</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-sm font-semibold text-violet-600">¥259</span>
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span class="text-xs text-slate-500">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const screen_search_4: ScreenData = {
  screenName: "课程详情",
  variant: 'mobile',
  plan: `# 课程详情页`,
  htmlContent: `
    <div class="h-full bg-white flex flex-col">
      <div class="relative h-44 bg-gradient-to-br from-violet-600 to-purple-700">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div class="absolute top-3 left-3 right-3 flex justify-between z-10">
          <button class="w-9 h-9 bg-black/20 backdrop-blur rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div class="flex gap-2">
            <button class="w-9 h-9 bg-black/20 backdrop-blur rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <button class="w-9 h-9 bg-black/20 backdrop-blur rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="absolute bottom-4 left-4 right-4 z-10">
          <span class="inline-block px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-md mb-2">数学</span>
          <h1 class="text-lg font-semibold text-white">中考数学冲刺班</h1>
          <p class="text-sm text-white/80 mt-1">王老师 · 12节课 · 2.3万人学习</p>
        </div>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="flex items-baseline gap-3 mb-4">
          <span class="text-2xl font-bold text-violet-600">¥299</span>
          <span class="text-sm text-slate-400 line-through">¥599</span>
          <span class="px-2 py-0.5 bg-red-50 text-red-500 text-xs font-medium rounded">5折</span>
        </div>
        <div class="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
          <p class="text-sm text-amber-700 flex items-center gap-2">
            <span>🔥</span>
            限时优惠：新用户立减50元
          </p>
        </div>
        <h3 class="text-sm font-semibold text-slate-900 mb-3">课程大纲</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-3 py-2.5 border-b border-slate-100">
            <div class="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-violet-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="text-sm text-slate-600">第1章：函数与图像专题</span>
          </div>
          <div class="flex items-center gap-3 py-2.5 border-b border-slate-100">
            <div class="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-violet-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="text-sm text-slate-600">第2章：几何证明突破</span>
          </div>
          <div class="flex items-center gap-3 py-2.5">
            <div class="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-violet-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span class="text-sm text-slate-600">第3章：压轴题解题技巧</span>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-slate-100 flex gap-3 bg-white">
        <button class="flex-1 py-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          购物车
        </button>
        <button class="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium shadow-lg shadow-slate-900/20 transition-all" data-to="search-5">
          立即购买
        </button>
      </div>
    </div>
  `
};

export const screen_search_5: ScreenData = {
  screenName: "确认订单",
  variant: 'mobile',
  plan: `# 确认订单页`,
  htmlContent: `
    <div class="h-full bg-slate-50 flex flex-col">
      <div class="bg-white px-4 py-3 flex items-center gap-3 border-b border-slate-100">
        <button class="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors">
          <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <span class="text-base font-medium text-slate-900">确认订单</span>
      </div>
      <div class="flex-1 p-4 overflow-auto">
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3">
          <div class="flex gap-3">
            <div class="w-16 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-lg shrink-0">📐</div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-slate-900">中考数学冲刺班</h4>
              <p class="text-xs text-slate-400 mt-0.5">王老师 · 12节课</p>
            </div>
            <span class="text-sm font-semibold text-slate-900">¥299</span>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 mb-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-slate-600">优惠券</span>
            <button class="flex items-center gap-1 text-sm text-violet-600 font-medium">
              -¥50
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
          <h3 class="text-sm font-medium text-slate-900 mb-3">支付方式</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">微</div>
              <span class="text-sm text-slate-700 flex-1">微信支付</span>
              <div class="w-5 h-5 rounded-full border-2 border-violet-500 flex items-center justify-center">
                <div class="w-2.5 h-2.5 bg-violet-500 rounded-full"></div>
              </div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">支</div>
              <span class="text-sm text-slate-700 flex-1">支付宝</span>
              <div class="w-5 h-5 rounded-full border-2 border-slate-200"></div>
            </label>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400">实付款</span>
          <span class="text-xl font-bold text-violet-600 ml-2">¥249</span>
        </div>
        <button class="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium shadow-lg shadow-slate-900/20 transition-all" data-to="search-6">
          立即支付
        </button>
      </div>
    </div>
  `
};

export const screen_search_6: ScreenData = {
  screenName: "支付成功",
  variant: 'mobile',
  plan: `# 支付成功页`,
  htmlContent: `
    <div class="h-full bg-gradient-to-b from-emerald-500 to-emerald-600 flex flex-col items-center justify-center p-6">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
          <svg class="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold text-white">支付成功</h1>
        <p class="text-sm text-emerald-100 mt-2">订单号：2024120500001</p>
        <p class="text-base text-white mt-1 mb-10">您已成功购买「中考数学冲刺班」</p>
        <button class="w-full bg-white hover:bg-slate-50 text-emerald-600 py-3.5 px-6 rounded-xl text-sm font-medium shadow-lg transition-all duration-200 mb-3">
          立即学习
        </button>
        <button class="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 px-6 rounded-xl text-sm font-medium transition-all duration-200">
          返回首页
        </button>
      </div>
    </div>
  `
};

// 导出
export const EDU_APP_SCREENS = {
  auth: [screen_auth_1, screen_auth_2, screen_auth_3, screen_auth_4, screen_auth_5, screen_auth_6],
  search: [screen_search_1, screen_search_2, screen_search_3, screen_search_4, screen_search_5, screen_search_6],
};
