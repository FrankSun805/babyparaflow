import React, { useState, useMemo } from 'react';
import { ArrowLeft, Smartphone, AlertCircle, CheckCircle, AlertTriangle, Loader2, Plus } from 'lucide-react';
import { ScreenData, ScreenStatusVariant } from '../../types';
import { MOBILE_SCREEN_WIDTH, MOBILE_SCREEN_HEIGHT } from '../../constants';

interface StatusViewProps {
  screenData: ScreenData;
  nodeId: string;
  onClose: () => void;
}

// 状态图标映射
const getStatusIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('错误') || lowerName.includes('不合法') || lowerName.includes('失败')) {
    return <AlertCircle size={14} className="text-red-500" />;
  }
  if (lowerName.includes('成功') || lowerName.includes('完成')) {
    return <CheckCircle size={14} className="text-green-500" />;
  }
  if (lowerName.includes('警告') || lowerName.includes('过长') || lowerName.includes('超出')) {
    return <AlertTriangle size={14} className="text-amber-500" />;
  }
  if (lowerName.includes('加载') || lowerName.includes('loading')) {
    return <Loader2 size={14} className="text-blue-500 animate-spin" />;
  }
  return <Smartphone size={14} className="text-slate-400" />;
};

// 单个屏幕卡片组件
const ScreenCard: React.FC<{
  title: string;
  description?: string;
  htmlContent: string;
  isMain?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}> = ({ title, description, htmlContent, isMain, isSelected, onClick }) => {
  const scale = 0.4; // 缩放比例
  
  return (
    <div
      className={`flex flex-col cursor-pointer group transition-all duration-200
        ${isSelected ? 'scale-105' : 'hover:scale-102'}
      `}
      onClick={onClick}
    >
      {/* 屏幕标题 */}
      <div className={`flex items-center gap-2 mb-2 px-1
        ${isMain ? 'text-emerald-600' : 'text-slate-600'}
      `}>
        {isMain ? (
          <CheckCircle size={14} className="text-emerald-500" />
        ) : (
          getStatusIcon(title)
        )}
        <span className={`text-xs font-medium truncate ${isMain ? 'text-emerald-700' : 'text-slate-700'}`}>
          {title}
        </span>
      </div>
      
      {/* 手机屏幕 */}
      <div
        className={`relative rounded-2xl border-2 overflow-hidden shadow-lg transition-all duration-200
          ${isMain 
            ? 'border-emerald-400 ring-2 ring-emerald-200' 
            : isSelected 
              ? 'border-violet-400 ring-2 ring-violet-200' 
              : 'border-slate-300 group-hover:border-slate-400 group-hover:shadow-xl'
          }
        `}
        style={{
          width: MOBILE_SCREEN_WIDTH * scale,
          height: MOBILE_SCREEN_HEIGHT * scale,
          backgroundColor: '#fff'
        }}
      >
        {/* 缩放容器 */}
        <div
          className="absolute top-0 left-0 origin-top-left overflow-hidden"
          style={{
            width: MOBILE_SCREEN_WIDTH,
            height: MOBILE_SCREEN_HEIGHT,
            transform: `scale(${scale})`
          }}
        >
          {/* 状态栏 */}
          <div className="h-6 bg-white flex items-center justify-between px-4 border-b border-slate-100">
            <div className="text-[10px] font-mono text-slate-900 font-semibold">9:41</div>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
            </div>
          </div>
          
          {/* HTML 内容 */}
          <div
            className="w-full bg-white overflow-hidden"
            style={{
              height: MOBILE_SCREEN_HEIGHT - 24,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
        
        {/* 主状态标签 */}
        {isMain && (
          <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow">
            主状态
          </div>
        )}
      </div>
      
      {/* 描述 */}
      {description && (
        <p className="text-[10px] text-slate-500 mt-1.5 px-1 line-clamp-2">
          {description}
        </p>
      )}
    </div>
  );
};

export const StatusView: React.FC<StatusViewProps> = ({
  screenData,
  nodeId,
  onClose
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  
  // 合并主状态和变体状态
  const allVariants = useMemo(() => {
    const main: ScreenStatusVariant = {
      id: 'main',
      name: '默认状态',
      description: '屏幕的正常显示状态',
      htmlContent: screenData.htmlContent
    };
    return [main, ...(screenData.statusVariants || [])];
  }, [screenData]);
  
  // 选中的变体
  const selectedVariant = useMemo(() => {
    if (!selectedVariantId) return allVariants[0];
    return allVariants.find(v => v.id === selectedVariantId) || allVariants[0];
  }, [selectedVariantId, allVariants]);

  return (
    <div className="w-full h-full flex flex-col bg-moxt-theme-bg">
      {/* 顶部标题栏 */}
      <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <ArrowLeft size={16} className="text-slate-600" />
          </button>
          <div className="w-8 h-8 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center">
            <Smartphone size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{screenData.screenName}</h2>
            <p className="text-xs text-slate-500">屏幕状态管理 · {allVariants.length} 个状态</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">按 ESC 返回画布</span>
        </div>
      </div>
      
      {/* 画布区域 */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* 状态网格 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allVariants.map((variant, index) => (
              <ScreenCard
                key={variant.id}
                title={variant.name}
                description={variant.description}
                htmlContent={variant.htmlContent}
                isMain={index === 0}
                isSelected={selectedVariantId === variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
              />
            ))}
            
            {/* 添加新状态按钮 */}
            <div
              className="flex flex-col items-center justify-center cursor-pointer group"
              style={{
                width: MOBILE_SCREEN_WIDTH * 0.4,
                height: MOBILE_SCREEN_HEIGHT * 0.4 + 40
              }}
            >
              <div
                className="w-full flex-1 rounded-2xl border-2 border-dashed border-slate-300 
                  flex flex-col items-center justify-center gap-2
                  hover:border-violet-400 hover:bg-violet-50/50 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-violet-100 
                  flex items-center justify-center transition-colors">
                  <Plus size={20} className="text-slate-400 group-hover:text-violet-500" />
                </div>
                <span className="text-xs text-slate-500 group-hover:text-violet-600">添加状态</span>
              </div>
            </div>
          </div>
          
          {/* 状态说明 */}
          <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-2">状态说明</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-slate-600">默认/成功状态</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={14} className="text-red-500" />
                <span className="text-slate-600">错误/验证失败</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-slate-600">警告/边界情况</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="text-blue-500" />
                <span className="text-slate-600">加载/处理中</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

