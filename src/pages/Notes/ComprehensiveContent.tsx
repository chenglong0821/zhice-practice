import { useState } from 'react';

// 综应A写作模板
export const writingTemplates = {
  // 归纳概括题
 归纳概括题: {
    识别特征: ['概括', '归纳', '提炼', '总结', '概述'],
    答题结构: {
      开头: '简要说明材料主题/背景',
      主体: '分点概括（3-5点），每点：核心词+具体说明',
      结尾: '适度升华或省略'
    },
    字数要求: '不超过300字',
    示例模板: `根据给定材料，...主要包含以下几个方面：

一、...
二、...
三、...

（具体内容根据材料提炼）`
  },

  // 对策建议题
  对策建议题: {
    识别特征: ['对策', '建议', '措施', '解决办法', '如何做'],
    答题结构: {
      问题: '简要概括存在的问题',
      对策: '分条列举（3-5条），每条：主体+具体做法+预期效果',
      结尾: '强调意义或展望'
    },
    常用主体: ['政府', '企业', '社会组织', '个人'],
    示例模板: `针对上述问题，建议从以下方面着手解决：

一、政府层面：...（加强监管/完善制度/加大投入）
二、企业层面：...（履行责任/创新发展/诚信经营）
三、社会层面：...（宣传教育/志愿服务/舆论监督）
四、个人层面：...（提高意识/积极参与/遵纪守法）`
  },

  // 应急处理题
  应急处理题: {
    识别特征: ['如何处理', '如何应对', '紧急情况', '突发事件'],
    答题原则: ['时间优先', '生命至上', '快速响应', '有序处置'],
    答题结构: {
      响应: '立即启动应急预案',
      处置: '按优先级处理（3-5步）',
      跟进: '总结教训、完善机制'
    },
    步骤模板: `1. 迅速响应：立即赶赴现场，启动应急预案
2. 控制局面：安抚情绪、维护秩序
3. 调查原因：收集信息、查明真相
4. 采取措施：针对性解决实际问题
5. 后续跟进：总结经验、长效机制`
  },

  // 公文写作
  公文写作: {
    常见文种: ['通知', '报告', '函', '倡议书', '公开信', '整改方案', '工作简报'],
    通用结构: {
      标题: '关于+事项+文种',
      主送: '主送机关名称',
      正文: {
        开头: '背景/起因/依据',
        主体: '具体事项（分点）',
        结尾: '特此XX/以上意见请参考'
      },
      落款: '单位名称+日期'
    },
    语言风格: '正式、简洁、准确、条理清晰'
  },

  // 材料作文
  材料作文: {
    字数要求: '800-1000字（具体看题目）',
    文章结构: {
      开头: {
        字数: '150字左右',
        内容: ['引用材料', '引出话题', '亮明观点']
      },
      主体: {
        字数: '450字左右',
        内容: ['分论点1：观点+论证+例证', '分论点2：观点+论证+例证', '分论点3：观点+论证+例证']
      },
      结尾: {
        字数: '100字左右',
        内容: ['总结升华', '呼吁倡议']
      }
    },
    论证方法: ['举例论证', '道理论证', '对比论证', '比喻论证']
  }
};

// 常用话术逻辑
export const commonPhrases = {
  过渡衔接: {
    原因到对策: [
      '造成上述问题的原因是多方面的，具体包括：',
      '针对上述问题，我们应当：',
      '问题的根源在于...，因此...'
    ],
    对策到效果: [
      '通过上述措施，可以有效...',
      '此举有利于...',
      '这将推动...'
    ],
    举例到观点: [
      '以...为例，说明...',
      '可见...',
      '综上所述...'
    ]
  },

  问题分析: {
    呈现式: [
      '当前，...存在以下问题：一是...；二是...；三是...',
      '调研发现，...问题仍然比较突出'
    ],
    原因式: [
      '产生上述问题的原因有：1. 思想认识不到位...2. 制度机制不健全...3. 落实力度不够...'
    ],
    影响式: [
      '...问题的存在，将带来以下危害：- 不利于... - 影响... - 阻碍...'
    ],
    辩证式: [
      '一方面，...体现了...；另一方面，也暴露出...问题。因此，我们要...'
    ]
  },

  对策提出: {
    宏观: [
      '提高认识：加强宣传教育...',
      '完善制度：建立健全...机制',
      '强化落实：加大执行力度...',
      '加强监督：完善...监督体系'
    ],
    微观: [
      '政府要加强...',
      '企业要履行...',
      '个人要增强...'
    ]
  }
};

// 高频词汇
export const highFrequencyWords = {
  对策类: {
    政府: ['统筹协调', '牵头落实', '监督管理', '完善机制', '健全制度', '加强宣传', '加大投入', '强化责任', '严格执法', '优化服务'],
    企业: ['履行责任', '诚信经营', '创新发展', '转型升级', '提质增效', '绿色发展', '安全生产', '依法纳税'],
    个人: ['提高认识', '增强意识', '自觉遵守', '积极参与', '主动作为', '提升能力', '遵纪守法', '志愿服务']
  },
  分析类: {
    积极: ['成效显著', '成果丰硕', '稳步推进', '全面提升', '持续改善', '不断优化', '有力保障', '有效缓解'],
    问题: ['亟待解决', '存在短板', '面临挑战', '结构性问题', '体制机制障碍', '历史遗留问题'],
    重要性: ['事关全局', '关系到', '意义重大', '影响深远', '重要举措'],
    紧迫性: ['刻不容缓', '势在必行', '当务之急', '迫在眉睫', '急需解决']
  }
};

// 练习题目
export const practiceQuestions = [
  {
    id: 'zy-001',
    类型: '归纳概括',
    题目: '根据给定材料，概括当前社区养老服务存在的主要问题。',
    材料: '某市社区养老服务调研显示：部分社区养老设施简陋，服务项目单一；专业护理人员缺乏，服务质量参差不齐；资金投入不足，运营困难；老年人数字鸿沟问题突出...',
    答题要点: ['设施简陋、项目单一', '专业人才缺乏', '资金投入不足', '数字化障碍']
  },
  {
    id: 'zy-002',
    类型: '对策建议',
    题目: '针对材料中反映的食品安全问题，提出解决建议。',
    材料: '近期，多地出现食品安全事件，反映出：监管部门检测能力不足；企业主体责任落实不到位；消费者维权意识淡薄；社会监督机制不完善...',
    答题要点: ['加强监管检测', '落实企业责任', '提高维权意识', '完善社会监督']
  },
  {
    id: 'zy-003',
    类型: '应急处理',
    题目: '某小区发生电动车充电引发火灾，作为社区负责人，如何处理？',
    答题要点: ['立即报警、疏散居民', '切断电源、控制火势', '安抚情绪、救治伤员', '调查原因、善后处理', '排查隐患、长效机制']
  },
  {
    id: 'zy-004',
    类型: '公文写作',
    题目: '以某街道办名义起草一份关于开展爱国卫生运动的通知。',
    答题要点: ['标题规范', '主送单位', '活动目的', '活动时间内容', '工作要求', '落款日期']
  },
  {
    id: 'zy-005',
    类型: '材料作文',
    题目: '给定材料围绕"基层治理创新"主题，自拟题目，写一篇800字议论文。',
    材料: '某社区推行"居民议事会"制度，通过居民自治解决身边问题；某镇运用"数字乡村"技术提升治理效能...',
    写作方向: ['创新基层治理方式', '调动居民参与积极性', '科技赋能基层治理', '共建共治共享']
  }
];

export default function ComprehensiveContent() {
  const [activeTab, setActiveTab] = useState<'模板' | '话术' | '词汇' | '练习'>('模板');
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const renderTemplateContent = (template: any) => {
    return Object.entries(template).map(([key, value]: [string, any]) => (
      <div key={key} className="mb-4">
        <div className="font-semibold text-blue-600 mb-2">{key}</div>
        {typeof value === 'string' ? (
          <pre className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{value}</pre>
        ) : Array.isArray(value) ? (
          <ul className="list-disc list-inside space-y-1 text-sm">
            {value.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="pl-4 space-y-2">
            {Object.entries(value as object).map(([k, v]) => (
              <div key={k}>
                <span className="font-medium">{k}：</span>
                {Array.isArray(v) ? (
                  <span>{v.join('、')}</span>
                ) : (
                  <span>{String(v)}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap">
        {['模板', '话术', '词汇', '练习'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Template Tab */}
      {activeTab === '模板' && (
        <div className="space-y-3">
          {Object.entries(writingTemplates).map(([name, template]) => (
            <div key={name} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedTemplate(expandedTemplate === name ? null : name)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <span className="font-semibold">{name}</span>
                <span className="text-gray-400">
                  {expandedTemplate === name ? '收起' : '展开'}
                </span>
              </button>
              {expandedTemplate === name && (
                <div className="px-4 pb-4 border-t">
                  {renderTemplateContent(template)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Phrases Tab */}
      {activeTab === '话术' && (
        <div className="space-y-4">
          {Object.entries(commonPhrases).map(([category, phrases]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-3">{category}</h3>
              {Object.entries(phrases as object).map(([type, list]) => (
                <div key={type} className="mb-3">
                  <div className="font-medium text-blue-600 text-sm mb-2">{type}</div>
                  <ul className="space-y-1">
                    {(list as string[]).map((phrase, idx) => (
                      <li key={idx} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                        {phrase}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Vocabulary Tab */}
      {activeTab === '词汇' && (
        <div className="space-y-4">
          {Object.entries(highFrequencyWords).map(([category, words]) => (
            <div key={category} className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-3">{category}</h3>
              {Object.entries(words as object).map(([type, wordList]) => (
                <div key={type} className="mb-3">
                  <div className="font-medium text-blue-600 text-sm mb-2">{type}</div>
                  <div className="flex flex-wrap gap-2">
                    {(wordList as string[]).map((word, idx) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Practice Tab */}
      {activeTab === '练习' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                练习 {currentQuestion + 1} / {practiceQuestions.length}
              </span>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                {practiceQuestions[currentQuestion].类型}
              </span>
            </div>

            <div className="mb-4">
              <div className="font-semibold mb-2">题目：</div>
              <p className="text-gray-700">{practiceQuestions[currentQuestion].题目}</p>
            </div>

            {'材料' in practiceQuestions[currentQuestion] && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                <div className="text-sm font-medium text-yellow-800 mb-1">给定材料：</div>
                <p className="text-sm text-yellow-700">{(practiceQuestions[currentQuestion] as any).材料}</p>
              </div>
            )}

            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                查看答题要点
              </button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800 mb-2">答题要点：</div>
                  <ul className="list-disc list-inside space-y-1 text-green-700">
                    {(practiceQuestions[currentQuestion].答题要点 as string[]).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowAnswer(false);
                      setCurrentQuestion((currentQuestion + 1) % practiceQuestions.length);
                    }}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    下一题
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
