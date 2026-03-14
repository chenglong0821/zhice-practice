import { useState } from 'react';
import type { ModuleType, KnowledgePoint } from '../../types/question';

const knowledgePoints: KnowledgePoint[] = [
  // 判断推理
  {
    id: 'pd-kp-001',
    module: '判断',
    title: '图形推理规律',
    category: '图形',
    content: `【位置规律】
• 平移：方向、步数
• 旋转：角度、方向
• 翻转：方向

【样式规律】
• 遍历：每行/列包含所有元素
• 加减同异：去同存异、去异存同
• 黑白运算

【数量规律】
• 点：交点、端点、切点
• 线：直线数、曲线数
• 角：直角、锐角、钝角
• 面：封闭区域数
• 素：元素种类数、元素数量

【属性规律】
• 对称性：轴对称、中心对称
• 曲直性：曲线、直线
• 封闭性：开放、封闭`,
  },
  {
    id: 'pd-kp-002',
    module: '判断',
    title: '逻辑判断公式',
    category: '逻辑',
    content: `【翻译推理】
• 如果A，则B：A→B
• 只有A，才B：B→A
• 除非A，否则B：¬A→B

【加强/削弱】
• 加强：补充论据、建立联系、重复论点
• 削弱：否定论点、拆桥、否定论据

【组合排列】
• 排除法、代入法、图表法`,
  },
  {
    id: 'pd-kp-003',
    module: '判断',
    title: '定义判断技巧',
    category: '定义',
    content: `【解题步骤】
1. 看清提问方式（符合/不符合）
2. 找准关键词（主体、客体、条件、结果）
3. 对比选项

【常见关键词】
• 主体：实施行为的人或组织
• 客体：行为指向的对象
• 条件：必要前提
• 结果：导致的状态`,
  },
  // 数量关系
  {
    id: 'sl-kp-001',
    module: '数量',
    title: '工程问题公式',
    category: '数学运算',
    content: `【基本公式】
工作总量 = 工作效率 × 工作时间

【常用方法】
1. 赋值法：赋工作总量为时间的最小公倍数
2. 比例法：效率比等于时间反比

【常见题型】
• 合作问题：效率相加
• 轮流工作：周期计算
• 排水问题：注水-排水=净效率`,
  },
  {
    id: 'sl-kp-002',
    module: '数量',
    title: '行程问题公式',
    category: '数学运算',
    content: `【基本公式】
路程 = 速度 × 时间

【常见题型】
1. 相遇问题：路程和 = 速度和 × 时间
2. 追及问题：路程差 = 速度差 × 时间
3. 环形跑道：同向减，反向加
4. 流水行船：
   顺水速度 = 船速 + 水速
   逆水速度 = 船速 - 水速`,
  },
  {
    id: 'sl-kp-003',
    module: '数量',
    title: '容斥问题公式',
    category: '数学运算',
    content: `【两集合容斥】
总数 - 都不 = A + B - AB

【三集合容斥】
总数 - 都不 = A + B + C - AB - AC - BC + ABC

【公式变形】
• A∪B = A + B - A∩B
• A∪B∪C = A + B + C - AB - AC - BC + ABC`,
  },
  {
    id: 'sl-kp-004',
    module: '数量',
    title: '经济利润公式',
    category: '数学运算',
    content: `【基本公式】
• 利润 = 售价 - 进价
• 利润率 = 利润 ÷ 进价 × 100%
• 售价 = 进价 × (1 + 利润率)

【折扣问题】
• 折扣 = 折后价 ÷ 原价
• 实际售价 = 原价 × 折扣

【多次打折】
总折扣 = 各次折扣相乘`,
  },
  // 资料分析
  {
    id: 'zl-kp-001',
    module: '资料',
    title: '增长量公式',
    category: '增长率',
    content: `【增长量】
增长量 = 现期量 - 基期量
       = 基期量 × 增长率

【年均增长量】
年均增长量 = (现期量 - 基期量) / 年份差

【增长量大小比较】
• 现期量大、增长率大 → 增长量大
• 大大则大`,
  },
  {
    id: 'zl-kp-002',
    module: '资料',
    title: '增长率公式',
    category: '增长率',
    content: `【增长率】
增长率 = 增长量 ÷ 基期量 × 100%
       = (现期量 - 基期量) ÷ 基期量 × 100%

【同比/环比】
• 同比：与去年同期相比
• 环比：与上一个周期相比

【年均增长率】
年均增长率 ≈ (现期量/基期量)^(1/n) - 1`,
  },
  {
    id: 'zl-kp-003',
    module: '资料',
    title: '比重公式',
    category: '比重',
    content: `【比重】
比重 = 部分 ÷ 整体 × 100%

【基期比重】
基期比重 = (A/B) × (1+b)/(1+a)
A: 部分现期量, B: 整体现期量
a: 部分增长率, b: 整体增长率

【比重变化】
比重变化 = 现期比重 - 基期比重
         = (A/B) × (a-b)/(1+a)`,
  },
  {
    id: 'zl-kp-004',
    module: '资料',
    title: '平均数公式',
    category: '平均数',
    content: `【平均数】
平均数 = 总数 ÷ 个数

【基期平均数】
基期平均数 = (A/B) × (1+b)/(1+a)

【平均数变化】
平均数变化率 = (a-b)/(1+b)
a: 总数增长率, b: 个数增长率`,
  },
  // 言语理解
  {
    id: 'yy-kp-001',
    module: '言语',
    title: '行文脉络法',
    category: '阅读理解',
    content: `【常见结构】
1. 总分总：提出观点→举例论证→总结升华
2. 总分：提出观点→解释说明
3. 分总：列举现象→得出结论
4. 转折：先说现象→重点在后
5. 递进：程度加深→重点在后

【关键句】
• 中心句：首句、尾句、过渡句
• 主题词：高频词、核心词`,
  },
  {
    id: 'yy-kp-002',
    module: '言语',
    title: '逻辑填空技巧',
    category: '逻辑填空',
    content: `【词语辨析】
• 词义轻重：程度差异
• 词义侧重：重点不同
• 感情色彩：褒贬中性
• 搭配对象：习惯用法

【语境分析】
• 解释对应：空前后有解释说明
• 转折对应：空前或空后有转折
• 递进对应：空前或空后有递进
• 并列对应：空前或空后有并列`,
  },
  // 常识判断
  {
    id: 'cs-kp-001',
    module: '常识',
    title: '宪法重点知识',
    category: '法律',
    content: `【国家性质】
• 国体：工人阶级领导的、以工农联盟为基础的人民民主专政
• 政体：人民代表大会制度

【公民权利】
• 平等权、政治权利、宗教信仰自由
• 人身自由、批评建议权

【国家机构】
• 全国人民代表大会
• 国家主席
• 国务院
• 最高人民法院、最高人民检察院`,
  },
  {
    id: 'cs-kp-002',
    module: '常识',
    title: '民法典亮点',
    category: '法律',
    content: `【基本原则】
• 平等原则、自愿原则、公平原则
• 诚信原则、守法原则、绿色原则

【亮点内容】
• 胎儿有继承、接受赠与权利
• 离婚冷静期
• 见义勇为免责
• 居住权制度
• 个人信息保护`,
  },
];

export default function KnowledgePoints() {
  const [selectedModule, setSelectedModule] = useState<ModuleType | '全部'>('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const modules: (ModuleType | '全部')[] = ['全部', '判断', '数量', '资料', '言语', '常识'];

  const filteredPoints = selectedModule === '全部'
    ? knowledgePoints
    : knowledgePoints.filter(kp => kp.module === selectedModule);

  const groupedPoints = filteredPoints.reduce((acc, kp) => {
    if (!acc[kp.category]) {
      acc[kp.category] = [];
    }
    acc[kp.category].push(kp);
    return acc;
  }, {} as Record<string, KnowledgePoint[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">知识点背诵</h2>
        <div className="flex gap-2 flex-wrap">
          {modules.map(module => (
            <button
              key={module}
              onClick={() => setSelectedModule(module)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedModule === module
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {module}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(groupedPoints).map(([category, points]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 font-medium text-gray-700">
              {category}
            </div>
            <div className="divide-y">
              {points.map(point => (
                <div key={point.id}>
                  <button
                    onClick={() => setExpandedId(expandedId === point.id ? null : point.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="font-medium">{point.title}</span>
                    <span className="text-gray-400 text-sm">
                      {expandedId === point.id ? '收起' : '展开'}
                    </span>
                  </button>
                  {expandedId === point.id && (
                    <div className="px-4 pb-4">
                      <div className="text-gray-600 whitespace-pre-line text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
                        {point.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
