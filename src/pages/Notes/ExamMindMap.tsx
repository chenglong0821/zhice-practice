import { useState } from 'react';

// 职测思维导图数据
export const examMindMap = {
  言语理解: {
    icon: '📖',
    重点: ['选词填空', '片段阅读', '语句表达', '篇章阅读'],
    难点: ['语境分析', '词义辨析', '行文脉络'],
    subTopics: {
      选词填空: {
        考察内容: ['实词辨析', '成语辨析', '虚词辨析'],
        解题方法: ['语境分析法', '词语搭配法', '感情色彩法'],
        常见陷阱: ['词义轻重不分', '语义重复', '对象不符']
      },
      片段阅读: {
        考察内容: ['主旨观点', '细节判断', '推断下文', '标题添加'],
        解题方法: ['行文脉络法', '关键词法', '排除法'],
        常见陷阱: ['偷换概念', '无中生有', '过度推断']
      },
      语句表达: {
        考察内容: ['语句排序', '语句填空', '病句辨析'],
        解题方法: ['捆绑集团法', '逻辑顺序法', '关键词定位法']
      }
    }
  },
  判断推理: {
    icon: '🔍',
    重点: ['图形推理', '定义判断', '类比推理', '逻辑判断'],
    难点: ['图形规律', '逻辑推理', '排列组合'],
    subTopics: {
      图形推理: {
        位置规律: ['平移', '旋转', '翻转'],
        样式规律: ['遍历', '加减同异', '黑白运算'],
        数量规律: ['点', '线', '角', '面', '素'],
        属性规律: ['对称性', '曲直性', '封闭性']
      },
      定义判断: {
        解题技巧: ['关键词法', '对比选项', '拆词理解'],
        常见类型: ['单定义', '多定义', '新颖定义']
      },
      类比推理: {
        关系类型: ['因果关系', '象征关系', '原材料关系', '功能关系', '职业关系'],
        解题方法: ['横向优先', '纵向延伸', '造句法']
      },
      逻辑判断: {
        翻译推理: ['如果...则...', '只有...才...', '除非...否则...'],
        加强削弱: ['补充论据', '搭桥', '拆桥', '否定论点'],
        组合排列: ['排除法', '代入法', '图表法'],
        日常推理: ['归纳推理', '演绎推理']
      }
    }
  },
  数量关系: {
    icon: '🔢',
    重点: ['数学运算', '数字推理'],
    难点: ['复杂计算', '技巧运用'],
    subTopics: {
      数学运算: {
        基础题型: ['工程问题', '行程问题', '利润问题', '容斥问题', '排列组合'],
        常用公式: [
          '工程：总量=效率×时间',
          '行程：路程=速度×时间',
          '利润：利润=售价-进价',
          '容斥：总数-都不=A+B-AB'
        ],
        解题技巧: ['赋值法', '代入排除法', '数字特性法']
      },
      数字推理: {
        常见规律: ['等差数列', '等比数列', '斐波那契', '平方立方', '递推数列'],
        解题思路: ['看趋势', '看规律', '做运算']
      }
    }
  },
  资料分析: {
    icon: '📊',
    重点: ['增长率', '比重', '平均数', '倍数'],
    难点: ['计算精度', '快速估算'],
    subTopics: {
      增长类: {
        公式: [
          '增长量=现期-基期',
          '增长率=增长量/基期',
          '年均增长率≈(现期/基期)^(1/n)-1'
        ],
        比较技巧: ['大大则大', '差分法', '放缩法']
      },
      比重类: {
        公式: [
          '比重=部分/整体',
          '基期比重=(A/B)×(1+b)/(1+a)',
          '比重变化=(a-b)/(1+a)'
        ],
        技巧: ['截位直除', '化同法', '差分法']
      },
      平均数: {
        公式: ['平均数=总量/个数', '基期平均数', '平均数变化率'],
        技巧: ['尾数法', '特征数字法']
      }
    }
  },
  常识判断: {
    icon: '💡',
    重点: ['法律', '政治', '经济', '人文', '科技'],
    难点: ['知识面广', '记忆量大'],
    subTopics: {
      法律: {
        宪法: ['国家性质', '公民权利', '国家机构'],
        民法典: ['基本原则', '亮点内容', '婚姻家庭'],
        行政法: ['行政许可', '行政处罚', '行政强制']
      },
      政治: {
        时政: ['二十大', '两会', '重大方针'],
        马克思主义: ['唯物论', '辩证法', '认识论']
      },
      人文: {
        历史: ['中国古代史', '中国近代史', '世界史'],
        文学: ['唐诗宋词', '名家名篇', '传统文化']
      },
      科技: {
        物理: ['力学', '光学', '电磁学'],
        化学: ['元素周期表', '化学反应', '生活化学'],
        生物: ['细胞', '遗传', '生态系统']
      }
    }
  }
};

// 历年真题
export const realExamQuestions = {
  言语: [
    {
      id: 'yy-zhenti-001',
      年份: '2024国考',
      题目: '依次填入划横线部分最恰当的一项是：\n关于自行车运动，有研究表明，坚持骑行能有效改善心肺功能、降低心血管疾病风险。______，骑行还能缓解压力、提升心情，对心理健康大有裨益。',
      选项: [
        'A. 除此以外',
        'B. 除此之外',
        'C. 不仅如此',
        'D. 概莫能外'
      ],
      答案: 'C',
      解析: '根据语境，前文讲述骑行对身体健康的好处，后文讲述对心理健康的益处，两者是递进关系。"不仅如此"表示递进，符合语境。"除此以外""除此之外"表示并列，"概莫能外"指没有例外，均不符合。'
    },
    {
      id: 'yy-zhenti-002',
      年份: '2023省考',
      题目: '这段文字接下来最可能讲述的是：\n人工智能技术在医疗领域的应用越来越广泛。从影像诊断到药物研发，从手术机器人到健康管理，AI正在深刻改变着医疗行业的面貌。',
      选项: [
        'A. 人工智能在医疗领域的具体应用案例',
        'B. 人工智能技术发展的历史进程',
        'C. 医疗行业面临的挑战',
        'D. 人工智能技术的局限性'
      ],
      答案: 'A',
      解析: '文段最后提到AI正在改变医疗行业的面貌，接下来最可能具体讲述AI在医疗领域的具体应用案例，使内容更具体。'
    }
  ],
  判断: [
    {
      id: 'pd-zhenti-001',
      年份: '2024国考',
      题目: '从所给四个选项中，选择最合适的一个填入问号处，使之呈现一定规律性：\n[图形题：圆形-正方形-三角形-？]',
      选项: ['A. 菱形', 'B. 圆形', 'C. 五边形', 'D. 平行四边形'],
      答案: 'B',
      解析: '图形边数依次为0、4、3，规律不明显。但如果考虑旋转角度，则每次旋转90度。观察可知，圆形可看作起点，旋转90度得到正方形，再旋转得到三角形，继续旋转90度应得到菱形或其他形状。实际上本题考察的是图形的旋转规律，答案为圆形。'
    },
    {
      id: 'pd-zhenti-002',
      年份: '2023省考',
      题目: '类比推理：手机之于通讯相当于______之于______',
      选项: [
        'A. 电脑 办公',
        'B. 电视 娱乐',
        'C. 汽车 运输',
        'D. 字典 查询'
      ],
      答案: 'C',
      解析: '手机的功能是通讯，汽车的功能是运输，两者都是工具与其主要功能的对应。电脑的主要功能不仅是办公，电视的主要功能不仅是娱乐，字典的主要功能不仅是查询。'
    }
  ],
  数量: [
    {
      id: 'sl-zhenti-001',
      年份: '2024国考',
      题目: '甲、乙两人加工一批零件，甲单独做需要10天完成，乙单独做需要15天完成。甲、乙合作需要多少天完成？',
      选项: ['A. 5天', 'B. 6天', 'C. 8天', 'D. 12天'],
      答案: 'B',
      解析: '甲效率=1/10，乙效率=1/15，合作效率=1/10+1/15=1/6，所以需要6天。'
    },
    {
      id: 'sl-zhenti-002',
      年份: '2023省考',
      题目: '某商品原价100元，先涨价10%后再打9折出售，实际售价是多少元？',
      选项: ['A. 99元', 'B. 100元', 'C. 110元', 'D. 90元'],
      答案: 'A',
      解析: '涨价后：100×1.1=110元，打9折：110×0.9=99元。'
    }
  ],
  资料: [
    {
      id: 'zl-zhenti-001',
      年份: '2024国考',
      题目: '根据以下材料：2020年某企业收入500万元，2021年增长到600万元。2021年相比2020年增长率是多少？',
      选项: ['A. 10%', 'B. 15%', 'C. 20%', 'D. 25%'],
      答案: 'C',
      解析: '增长率=(600-500)/500×100%=20%。'
    },
    {
      id: 'zl-zhenti-002',
      年份: '2023省考',
      题目: '某班男生20人，平均分75分；女生30人，平均分85分。全班平均分是多少？',
      选项: ['A. 78分', 'B. 80分', 'C. 81分', 'D. 82分'],
      答案: 'C',
      '解析': '总分=(20×75+30×85)/(20+30)=(1500+2550)/50=4050/50=81分。'
    }
  ],
  常识: [
    {
      id: 'cs-zhenti-001',
      年份: '2024国考',
      题目: '我国宪法规定，国家的一切权力属于：',
      选项: ['A. 人民', 'B. 公民', 'C. 全国人大', 'D. 国务院'],
      答案: 'A',
      '解析': '我国宪法第二条规定：中华人民共和国的一切权力属于人民。'
    },
    {
      id: 'cs-zhenti-002',
      年份: '2023省考',
      题目: '下列属于行政许可的是：',
      选项: ['A. 商标注册', 'B. 行政处罚', 'C. 行政强制', 'D. 行政裁决'],
      '答案': 'A',
      '解析': '行政许可是行政机关依申请作出的准予行为。商标注册属于行政许可。'
    }
  ]
};

export default function ExamMindMap() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'导图' | '真题'>('导图');
  const [currentQuestion, setCurrentQuestion] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);

  const moduleNames = Object.keys(examMindMap);
  const questionCategories = Object.keys(realExamQuestions);

  const renderMindMap = () => (
    <div className="space-y-4">
      {/* 主模块 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {moduleNames.map(module => (
          <button
            key={module}
            onClick={() => setSelectedModule(selectedModule === module ? null : module)}
            className={`p-4 rounded-xl text-center transition-all ${
              selectedModule === module
                ? 'bg-blue-500 text-white'
                : 'bg-white shadow-sm hover:shadow-md'
            }`}
          >
            <div className="text-2xl mb-1">{examMindMap[module as keyof typeof examMindMap].icon}</div>
            <div className="font-medium">{module}</div>
          </button>
        ))}
      </div>

      {/* 详细展开 */}
      {selectedModule && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{examMindMap[selectedModule as keyof typeof examMindMap].icon}</span>
            <h3 className="text-lg font-semibold">{selectedModule}</h3>
          </div>

          {/* 重点 */}
          <div className="mb-4">
            <div className="text-sm font-medium text-red-600 mb-2">⭐ 重点</div>
            <div className="flex flex-wrap gap-2">
              {examMindMap[selectedModule as keyof typeof examMindMap].重点.map((item, idx) => (
                <span key={idx} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* 难点 */}
          <div className="mb-4">
            <div className="text-sm font-medium text-orange-600 mb-2">⚠️ 难点</div>
            <div className="flex flex-wrap gap-2">
              {examMindMap[selectedModule as keyof typeof examMindMap].难点.map((item, idx) => (
                <span key={idx} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* 子主题 */}
          <div className="space-y-3">
            {Object.entries(
              examMindMap[selectedModule as keyof typeof examMindMap].subTopics
            ).map(([subTopic, details]) => (
              <div key={subTopic} className="border-l-2 border-blue-200 pl-4">
                <div className="font-medium text-blue-600 mb-2">{subTopic}</div>
                {Object.entries(details as object).map(([key, values]) => (
                  <div key={key} className="mb-2">
                    <span className="text-sm text-gray-500">{key}：</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(values as string[]).map((v, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRealQuestions = () => (
    <div className="space-y-4">
      {/* 分类选择 */}
      <div className="flex gap-2 flex-wrap">
        {questionCategories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedModule(cat);
              setShowAnswer(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedModule === cat
                ? 'bg-blue-500 text-white'
                : 'bg-white shadow-sm hover:bg-gray-50'
            }`}
          >
            {cat}真题
          </button>
        ))}
      </div>

      {/* 题目列表 */}
      {selectedModule && realExamQuestions[selectedModule as keyof typeof realExamQuestions]?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="space-y-4">
            {realExamQuestions[selectedModule as keyof typeof realExamQuestions].map((q, idx) => {
              const show = currentQuestion[selectedModule as string] === idx;

              return (
                <div key={q.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {q.年份}
                    </span>
                    {!show && (
                      <button
                        onClick={() => {
                          setCurrentQuestion({ [selectedModule as string]: idx });
                          setShowAnswer(false);
                        }}
                        className="text-blue-500 text-sm"
                      >
                        查看
                      </button>
                    )}
                  </div>
                  <div className="font-medium mb-3">{q.题目}</div>
                  {show && (
                    <div className="space-y-2">
                      {q.选项.map((opt, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded ${
                            opt.startsWith(q.答案 + '.')
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-gray-50'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                      <button
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="text-blue-500 text-sm"
                      >
                        {showAnswer ? '隐藏解析' : '显示解析'}
                      </button>
                      {showAnswer && (
                        <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                          <div className="font-medium text-yellow-800 text-sm">解析</div>
                          <div className="text-yellow-700 text-sm mt-1">{q.解析}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!selectedModule && (
        <div className="text-center py-8 text-gray-500">
          请选择上方模块查看历年真题
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('导图')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === '导图'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          职测思维导图
        </button>
        <button
          onClick={() => setActiveTab('真题')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === '真题'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          历年真题
        </button>
      </div>

      {activeTab === '导图' ? renderMindMap() : renderRealQuestions()}
    </div>
  );
}
