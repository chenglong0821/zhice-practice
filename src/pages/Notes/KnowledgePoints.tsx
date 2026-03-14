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
  // ==================== 综应部分 ====================
  // 综应写作模板
  {
    id: 'zy-tmpl-001',
    module: '综应',
    title: '归纳概括题模板',
    category: '写作模板',
    content: `【题型识别】
材料中出现"概括"、"归纳"、"提炼"、"总结"等关键词

【答题结构】
1. 开头：简述材料主题
2. 主体：分点概括（3-5点）
   - 要点1：核心词+具体说明
   - 要点2：核心词+具体说明
   - 要点3：核心词+具体说明
3. 结尾：适度升华或省略

【字数要求】
一般不超过300字，条理清晰要点突出`,
  },
  {
    id: 'zy-tmpl-002',
    module: '综应',
    title: '对策建议题模板',
    category: '写作模板',
    content: `【题型识别】
材料中出现"对策"、"建议"、"措施"、"解决办法"等

【答题结构】
1. 问题归纳：简要概括存在的问题
2. 对策要点：分条列举解决措施
   - 对策1：主体+具体做法+预期效果
   - 对策2：主体+具体做法+预期效果
   - 对策3：主体+具体做法+预期效果
3. 总结：强调重要意义或展望

【常用开头】
针对上述问题，建议从以下几个方面着手解决：`,
  },
  {
    id: 'zy-tmpl-003',
    module: '综应',
    title: '应急处理题模板',
    category: '写作模板',
    content: `【题型识别】
材料描述突发情况、紧急事件，询问"如何处理"、"如何应对"

【答题结构】
1. 迅速响应：立即启动应急预案
2. 现场处置：
   - 第一步：...(如：控制现场、安抚情绪)
   - 第二步：...(如：调查原因、收集信息)
   - 第三步：...(如：采取措施、解决问题)
3. 后续跟进：总结教训、完善机制

【时间优先原则】
紧急情况要体现时间意识和优先级`,
  },
  {
    id: 'zy-tmpl-004',
    module: '综应',
    title: '公文写作模板',
    category: '写作模板',
    content: `【常见文种】
通知、报告、函、倡议书、公开信、整改方案等

【通用结构】
1. 标题：关于+事项+文种
2. 主送机关：
3. 正文：
   - 背景/起因：简要说明
   - 事项/内容：具体说明（分点）
   - 结尾：特此XX、以上意见请参考等
4. 落款：单位+日期

【语言风格】
正式、简洁、条理清晰`,
  },
  {
    id: 'zy-tmpl-005',
    module: '综应',
    title: '材料作文模板',
    category: '写作模板',
    content: `【题型识别】
给定材料+话题/主题，要求写一篇议论文

【文章结构】
1. 开头（150字）：
   - 引用材料+提出论点
   - 亮明观点

2. 主体（450字）：
   - 分论点1：观点+论证+例证
   - 分论点2：观点+论证+例证
   - 分论点3：观点+论证+例证

3. 结尾（100字）：
   - 总结升华
   - 呼吁倡议

【字数要求】
一般800-1000字`,
  },
  // 综应常用话语逻辑
  {
    id: 'zy-logic-001',
    module: '综应',
    title: '问题分析逻辑',
    category: '话语逻辑',
    content: `【问题呈现式】
当前，...存在以下问题：一是...；二是...；三是...

【原因分析式】
产生上述问题的原因有：
1. 思想认识不到位...
2. 制度机制不健全...
3. 落实力度不够...

【影响分析式】
...问题的存在，将带来以下危害：
- 不利于...
- 影响...
- 阻碍...

【辩证分析式】
一方面，...体现了...；另一方面，也暴露出...问题。因此，我们要...`,
  },
  {
    id: 'zy-logic-002',
    module: '综应',
    title: '对策提出逻辑',
    category: '话语逻辑',
    content: `【宏观对策式】
1. 提高认识：加强宣传教育...
2. 完善制度：建立健全...机制
3. 强化落实：加大执行力度...
4. 加强监督：完善...监督体系

【微观对策式】
针对...问题，建议采取以下措施：
一是政府要加强...二是企业要履行...
三是个人要增强...

【主体分析法】
从政府角度：...
从社会角度：...
从个人角度：...`,
  },
  {
    id: 'zy-logic-003',
    module: '综应',
    title: '过渡衔接语',
    category: '话语逻辑',
    content: `【开头过渡】
• 综上所述...
• 基于上述分析...
• 对此，我认为...

【原因到对策】
• 造成上述问题的原因是多方面的，具体包括...
• 针对上述问题，我们应当...

• 问题的根源在于...，因此...

【对策到效果】
• 通过上述措施，可以有效...
• 此举有利于...
• 这将推动...

【举例到观点】
• 以...为例，说明...
• 可见...`,
  },
  // 综应常用词汇
  {
    id: 'zy-vocab-001',
    module: '综应',
    title: '对策类高频词汇',
    category: '常用词汇',
    content: `【政府类】
• 统筹协调 • 牵头落实 • 监督管理
• 完善机制 • 健全制度 • 加强宣传
• 加大投入 • 强化责任 • 严格执法
• 优化服务 • 提升效能 • 便民利民

【企业类】
• 履行责任 • 诚信经营 • 创新发展
• 转型升级 • 提质增效 • 绿色发展
• 安全生产 • 依法纳税 • 保障权益

【个人类】
• 提高认识 • 增强意识 • 自觉遵守
• 积极参与 • 主动作为 • 提升能力
• 遵纪守法 • 文明礼貌 • 志愿服务`,
  },
  {
    id: 'zy-vocab-002',
    module: '综应',
    title: '分析类高频词汇',
    category: '常用词汇',
    content: `【积极正面】
• 成效显著 • 成果丰硕 • 稳步推进
• 全面提升 • 持续改善 • 不断优化
• 有力保障 • 有效缓解 • 显著改善

【问题不足】
• 亟待解决 • 存在短板 • 面临挑战
• 结构性问题 • 体制机制障碍 • 历史遗留问题

【重要性】
• 事关...全局 • 关系到...
• 意义重大 • 影响深远
• 是...的重要举措

【紧迫性】
• 刻不容缓 • 势在必行 • 当务之急
• 迫在眉睫 • 急需解决`,
  },
  {
    id: 'zy-vocab-003',
    module: '综应',
    title: '规范化表述词汇',
    category: '常用词汇',
    content: `【制度机制】
• 长效机制 • 制度保障 • 体系支撑
• 制度创新 • 完善机制 • 健全体系

【工作方法】
• 统筹推进 • 分类指导 • 精准施策
• 试点先行 • 以点带面 • 典型示范

【监督考核】
• 督查督办 • 考核评估 • 问责追责
• 动态管理 • 跟踪问效 • 闭环管理

【理念思维】
• 系统思维 • 底线思维 • 创新思维
• 用户思维 • 数字化思维 • 绿色发展`,
  },
  {
    id: 'zy-vocab-004',
    module: '综应',
    title: '常用开头结尾',
    category: '常用词汇',
    content: `【万能开头】
• 近年来，...工作取得了显著成效
• 在各级部门的共同努力下，...
• 随着...的发展，...问题日益凸显

【问题引入】
• 然而，在实际工作中仍然存在...
• 当前，...面临诸多挑战
• 调研发现，...问题仍然比较突出

【对策引入】
• 为有效解决上述问题，建议：
• 对此，我们提出以下建议：
• 针对以上情况，应当采取以下措施：

【总结结尾】
• 总之，...需要各方共同努力
• 只要我们...，就一定能够...
• 让我们携手共进，为...贡献力量`,
  },
];

export default function KnowledgePoints() {
  const [selectedModule, setSelectedModule] = useState<ModuleType | '全部'>('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const modules: (ModuleType | '全部')[] = ['全部', '判断', '数量', '资料', '言语', '常识', '综应'];

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
