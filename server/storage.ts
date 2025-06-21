import { personalityTypes, compatibilityAnalysis, type PersonalityType, type CompatibilityAnalysis, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPersonalityTypes(): Promise<PersonalityType[]>;
  getCompatibilityAnalysis(): Promise<CompatibilityAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private personalityTypesData: PersonalityType[] = [];
  private compatibilityData: CompatibilityAnalysis[] = [];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    this.personalityTypesData = [
      {
        id: 1,
        type: 'egen',
        name: '에겐 (Egen)',
        description: '에스트로겐 호르몬 특성을 가진 성격 유형',
        characteristics: [
          '감성적이고 섬세한 성향',
          '관계 지향적이고 협력적',
          '안정성과 조화를 추구',
          '배려심이 깊고 공감능력이 뛰어남',
          '감정적 안정감을 중시'
        ],
        advantages: '에겐은 뛰어난 공감능력과 섬세함으로 타인의 감정을 잘 이해하고 배려할 수 있습니다. 관계 지향적인 성향으로 인해 팀워크와 협력에 능숙하며, 조화로운 분위기를 만들어 나가는 데 탁월합니다. 안정성을 추구하여 지속적이고 신뢰할 수 있는 관계를 형성하며, 감정적 지지와 위로를 제공하는 능력이 뛰어나 주변 사람들에게 큰 힘이 됩니다.',
        disadvantages: '지나치게 감정에 의존하여 객관적인 판단이 어려울 수 있으며, 갈등 상황을 회피하려는 경향이 있어 문제 해결이 지연될 수 있습니다. 타인을 배려하느라 자신의 의견을 명확히 표현하지 못하거나 자신의 욕구를 희생할 수 있습니다. 변화에 대한 적응력이 떨어질 수 있고, 감정적 스트레스에 취약하여 압박 상황에서 어려움을 겪을 수 있습니다.'
      },
      {
        id: 2,
        type: 'teto',
        name: '테토 (Teto)',
        description: '테스토스테론 호르몬 특성을 가진 성격 유형',
        characteristics: [
          '적극적이고 도전적인 성향',
          '목표 지향적이고 경쟁적',
          '논리적이고 합리적 사고',
          '독립적이고 자기주도적',
          '리더십과 결단력을 중시'
        ],
        advantages: '테토는 강한 추진력과 목표 지향적인 성격으로 어려운 도전도 포기하지 않고 끝까지 해내는 능력이 뛰어납니다. 논리적이고 합리적인 사고로 문제를 체계적으로 해결할 수 있으며, 독립적인 성향으로 자기주도적인 삶을 살아갑니다. 리더십이 뛰어나 조직이나 팀을 이끌어 나가는 능력이 있고, 결단력 있는 의사결정으로 빠른 성과를 낼 수 있습니다.',
        disadvantages: '지나치게 경쟁적이고 공격적인 성향으로 인해 타인과의 관계에서 갈등이 생길 수 있습니다. 목표 달성에만 집중하다 보면 과정에서의 인간관계나 감정적 측면을 간과할 수 있고, 독립적인 성향이 지나쳐 협력을 어려워할 수 있습니다. 감정 표현이 서툴러 주변 사람들에게 차갑게 느껴질 수 있으며, 스트레스 상황에서 공격적으로 변할 수 있습니다.'
      },
      {
        id: 3,
        type: 'egen-male',
        name: '에겐남',
        description: '에스트로겐 특성을 가진 남성형 성격',
        characteristics: [
          '섬세하고 감성적인 남성성',
          '관계 중심적 사고와 배려심',
          '조화롭고 평화로운 성향',
          '예술적 감성과 창의력',
          '타인의 감정에 민감하게 반응'
        ],
        advantages: '에겐남은 전통적인 남성성과 차별화된 섬세함과 감성을 가지고 있어 타인의 감정을 깊이 이해하고 공감할 수 있습니다. 관계 중심적인 사고로 인해 갈등을 조화롭게 해결하며, 예술적 감성과 창의력이 뛰어나 독창적인 아이디어를 제시할 수 있습니다. 평화로운 성향으로 주변에 안정감을 주며, 배려심이 깊어 신뢰받는 친구나 동료가 됩니다.',
        disadvantages: '전통적인 남성 역할에 대한 사회적 기대와 충돌할 수 있어 정체성 혼란을 겪을 수 있습니다. 감정적으로 민감하여 비판이나 거절에 쉽게 상처받을 수 있고, 결단력이나 추진력이 부족하다고 평가받을 수 있습니다. 갈등 상황에서 회피하려는 경향이 있어 문제 해결이 미뤄질 수 있으며, 자신의 의견을 강하게 주장하지 못할 수 있습니다.'
      },
      {
        id: 4,
        type: 'egen-female',
        name: '에겐녀',
        description: '에스트로겐 특성이 강화된 여성형 성격',
        characteristics: [
          '극도로 섬세하고 감성적',
          '강한 모성애와 보호본능',
          '완벽한 조화와 평화 추구',
          '뛰어난 직감력과 감수성',
          '타인 우선의 희생적 사랑'
        ],
        advantages: '에겐녀는 극도로 섬세한 감성과 뛰어난 공감능력으로 타인의 마음을 깊이 이해하고 위로할 수 있습니다. 강한 모성애와 보호본능으로 주변 사람들을 따뜻하게 돌보며, 뛰어난 직감력으로 상황을 빠르게 파악합니다. 완벽한 조화를 추구하여 평화롭고 안정적인 환경을 만들어가며, 희생적인 사랑으로 깊은 유대감을 형성합니다.',
        disadvantages: '지나치게 감정적이어서 객관적인 판단이 어려울 수 있으며, 타인을 위해 자신을 희생하는 경향이 강해 번아웃을 경험할 수 있습니다. 완벽주의적 성향으로 인해 스트레스를 많이 받고, 비판에 극도로 민감하여 쉽게 상처받습니다. 의존적인 성향이 강할 수 있고, 갈등 상황에서 감정적으로 대응하여 문제가 복잡해질 수 있습니다.'
      },
      {
        id: 5,
        type: 'teto-male',
        name: '테토남',
        description: '테스토스테론 특성이 강화된 남성형 성격',
        characteristics: [
          '강력한 남성성과 지배욕',
          '극도의 경쟁심과 승부욕',
          '냉철한 논리와 합리성',
          '독립적이고 개인주의적',
          '권위와 성취를 중시'
        ],
        advantages: '테토남은 강력한 리더십과 추진력으로 어떤 목표든 달성해내는 능력이 뛰어납니다. 극도의 경쟁심으로 지속적인 성장과 발전을 이루며, 냉철한 논리와 합리성으로 복잡한 문제를 체계적으로 해결합니다. 독립적이고 자기주도적인 성향으로 자신만의 길을 개척하며, 권위와 성취를 통해 사회적 지위를 확립합니다.',
        disadvantages: '지나치게 경쟁적이고 공격적인 성향으로 인해 인간관계에서 갈등이 빈번할 수 있습니다. 감정 표현이 서툴러 주변 사람들에게 차갑고 무정하게 느껴질 수 있고, 지배욕이 강해 타인을 통제하려는 경향이 있습니다. 개인주의적 성향으로 팀워크가 어려울 수 있으며, 실패나 좌절에 대한 두려움으로 스트레스를 받을 수 있습니다.'
      },
      {
        id: 6,
        type: 'teto-female',
        name: '테토녀',
        description: '테스토스테론 특성을 가진 여성형 성격',
        characteristics: [
          '강인한 여성성과 독립심',
          '목표 지향적이고 야심적',
          '논리적이고 합리적 사고',
          '리더십과 카리스마',
          '전통적 여성 역할에 도전'
        ],
        advantages: '테토녀는 강인한 정신력과 독립심으로 어떤 상황에서도 굴복하지 않는 강인함을 보입니다. 목표 지향적이고 야심적인 성격으로 높은 성취를 이루며, 논리적이고 합리적인 사고로 문제를 체계적으로 해결합니다. 리더십과 카리스마가 뛰어나 조직에서 영향력을 발휘하며, 전통적인 여성 역할에 얽매이지 않고 자신만의 길을 개척합니다.',
        disadvantages: '전통적인 여성성에 대한 사회적 기대와 충돌하여 오해받을 수 있으며, 지나치게 강인한 모습으로 인해 접근하기 어려워 보일 수 있습니다. 감정 표현이 서툴러 친밀한 관계 형성에 어려움을 겪을 수 있고, 경쟁적인 성향으로 인해 동성 친구들과 갈등이 생길 수 있습니다. 완벽주의적 성향으로 스트레스를 많이 받을 수 있습니다.'
      }
    ];

    this.compatibilityData = [
      {
        id: 1,
        type1: 'egen-male',
        type2: 'egen-female',
        friendshipTraits: [
          '같은 에스트로겐 특성으로 서로의 감성적 성향을 깊이 이해',
          '조화롭고 평화로운 분위기에서 편안한 우정을 나눔',
          '관계 중심적 사고로 서로를 배려하며 깊은 유대감 형성',
          '갈등을 회피하고 평화로운 해결책을 함께 모색',
          '예술적 감성과 창의적 아이디어를 공유하며 영감을 주고받음'
        ],
        romanceTraits: [
          '극도로 로맨틱하고 감성적인 연애로 깊은 감정적 교감',
          '서로의 섬세함을 이해하고 배려하는 따뜻한 사랑',
          '갈등 상황에서도 서로를 이해하려 노력하는 성숙한 관계',
          '감정적 안정감을 중시하여 안전하고 편안한 연애',
          '하지만 둘 다 결단력이 부족해 관계 발전이 더딜 수 있음'
        ]
      },
      {
        id: 2,
        type1: 'teto-male',
        type2: 'teto-female',
        friendshipTraits: [
          '같은 테스토스테론 특성으로 목표 지향적이고 경쟁적인 성향 공유',
          '서로의 야심과 도전 정신을 이해하고 격려하는 관계',
          '논리적이고 합리적인 대화로 문제를 효율적으로 해결',
          '독립적인 성향을 존중하며 적절한 거리감을 유지',
          '하지만 경쟁 상황에서는 갈등이 격화될 가능성'
        ],
        romanceTraits: [
          '강렬하고 열정적인 연애로 서로에게 강한 끌림',
          '목표 지향적인 커플로 함께 성취를 이루어가는 관계',
          '논리적이고 합리적인 소통으로 명확한 관계 설정',
          '서로의 독립성을 존중하며 개인적 성장도 추구',
          '하지만 둘 다 지배욕이 강해 주도권 다툼이 발생할 수 있음'
        ]
      },
      {
        id: 3,
        type1: 'teto-male',
        type2: 'egen-female',
        friendshipTraits: [
          '테토남의 추진력과 에겐녀의 섬세함이 서로를 보완',
          '테토남이 리더십을 발휘하고 에겐녀가 따뜻하게 지원하는 구조',
          '서로 다른 관점으로 균형 잡힌 조언과 아이디어 교환',
          '테토남의 논리적 해결책과 에겐녀의 감정적 배려가 조화',
          '전통적인 남녀 역할에 부합하는 자연스러운 관계 형성'
        ],
        romanceTraits: [
          '테토남의 강한 남성성과 에겐녀의 극도의 여성성이 완벽한 조화',
          '보호본능과 의존성이 만나 깊은 유대감과 안정감 형성',
          '테토남이 주도하고 에겐녀가 따르는 전통적 연애 패턴',
          '서로의 부족한 면을 완벽하게 보완하는 이상적인 관계',
          '강한 호르몬적 끌림으로 지속적이고 안정적인 사랑 유지'
        ]
      },
      {
        id: 4,
        type1: 'egen-male',
        type2: 'teto-female',
        friendshipTraits: [
          '에겐남의 섬세함과 테토녀의 강인함이 독특한 조합을 이룸',
          '서로 다른 성격으로 새로운 관점과 자극을 주고받음',
          '에겐남의 예술적 감성과 테토녀의 현실적 추진력이 균형',
          '갈등 시 에겐남의 조화 추구와 테토녀의 해결 의지가 충돌 가능',
          '서로를 이해하기까지 시간이 필요하지만 성장할 수 있는 관계'
        ],
        romanceTraits: [
          '전통적 성 역할과 반대되는 독특하고 현대적인 연애 관계',
          '에겐남의 감성과 테토녀의 강인함이 새로운 역학을 만듦',
          '서로에게 부족한 특성을 배우며 성장하는 발전적 관계',
          '사회적 편견을 극복하며 진정한 이해와 사랑을 추구',
          '초기에는 어색하지만 깊이 알아갈수록 특별한 유대감 형성'
        ]
      }
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPersonalityTypes(): Promise<PersonalityType[]> {
    return this.personalityTypesData;
  }

  async getCompatibilityAnalysis(): Promise<CompatibilityAnalysis[]> {
    return this.compatibilityData;
  }
}

export const storage = new MemStorage();
