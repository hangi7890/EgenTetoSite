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
        description: '논리적이고 분석적인 성격',
        characteristics: [
          '체계적이고 논리적인 사고를 선호',
          '계획적이고 목표 지향적',
          '독립적이고 자율적인 성향',
          '효율성과 성과를 중시'
        ],
        advantages: '에겐 성격의 사람들은 객관적이고 논리적인 사고력을 바탕으로 문제를 체계적으로 해결할 수 있습니다. 목표 지향적인 성향으로 인해 계획을 세우고 실행하는 능력이 뛰어나며, 독립적이고 자율적인 특성으로 스스로를 관리하고 발전시켜 나갈 수 있습니다. 효율성을 중시하기 때문에 시간 관리와 우선순위 설정에 능숙하며, 감정에 휘둘리지 않고 합리적인 판단을 내릴 수 있습니다.',
        disadvantages: '지나치게 논리적이고 체계적인 접근으로 인해 유연성이 부족할 수 있으며, 감정적인 부분을 간과하거나 소홀히 할 수 있습니다. 효율성과 성과만을 중시하다 보면 인간관계에서 냉정하게 느껴질 수 있고, 타인의 감정을 이해하거나 공감하는 데 어려움을 겪을 수 있습니다. 완벽주의적 성향으로 인해 스트레스를 받을 수 있으며, 예상치 못한 변화에 대한 적응력이 떨어질 수 있습니다.'
      },
      {
        id: 2,
        type: 'teto',
        name: '테토 (Teto)',
        description: '감정적이고 관계 중심적인 성격',
        characteristics: [
          '감정적이고 직관적인 판단',
          '사람과의 관계를 중시',
          '공감능력이 뛰어남',
          '협력과 조화를 선호'
        ],
        advantages: '테토 성격의 사람들은 뛰어난 공감능력과 직관력을 바탕으로 타인의 감정을 잘 이해하고 배려할 수 있습니다. 관계 중심적인 사고로 인해 팀워크와 협력에 능숙하며, 조화로운 분위기를 만들어 나가는 데 탁월합니다. 감정적 지지와 위로를 제공하는 능력이 뛰어나 주변 사람들에게 큰 힘이 되며, 직관적인 판단력으로 상황을 빠르게 파악할 수 있습니다.',
        disadvantages: '감정에 의존한 판단으로 인해 객관성이 부족할 수 있으며, 논리적 분석보다는 감정적 반응을 우선시할 수 있습니다. 타인을 지나치게 배려하다 보면 자신의 의견을 명확히 표현하지 못하거나 자신의 욕구를 희생할 수 있습니다. 갈등 상황에서 감정적으로 대응하여 문제 해결이 지연될 수 있으며, 변화하는 상황에 대해 감정적 스트레스를 많이 받을 수 있습니다.'
      },
      {
        id: 3,
        type: 'egen-male',
        name: '에겐남',
        description: '논리적이고 목표 지향적인 남성 성격',
        characteristics: [
          '강한 리더십과 결단력',
          '경쟁을 통한 성장',
          '직접적인 소통 선호',
          '목표 달성에 집중',
          '독립적인 문제 해결'
        ],
        advantages: '에겐남은 강력한 리더십과 결단력으로 조직이나 팀을 이끌어 나가는 능력이 뛰어납니다. 경쟁적인 환경에서 동기부여를 받으며 지속적으로 성장하려는 의지가 강하고, 직접적이고 명확한 소통을 통해 오해의 소지를 줄입니다. 목표 달성에 대한 집중력이 높아 성과를 내는 데 탁월하며, 독립적으로 문제를 해결하는 능력이 뛰어나 자립심이 강합니다.',
        disadvantages: '지나치게 직접적인 소통 방식으로 인해 타인에게 무례하거나 냉정하게 느껴질 수 있으며, 경쟁에만 집중하다 보면 협력의 중요성을 간과할 수 있습니다. 목표 달성을 위해 다른 가치들을 희생할 수 있고, 감정적 표현이나 공감 능력이 부족하여 인간관계에서 어려움을 겪을 수 있습니다. 완벽주의적 성향으로 인해 스트레스를 많이 받을 수 있습니다.'
      },
      {
        id: 4,
        type: 'egen-female',
        name: '에겐녀',
        description: '체계적이고 완벽주의적인 여성 성격',
        characteristics: [
          '섬세한 분석력',
          '체계적인 계획 수립',
          '완벽주의 성향',
          '논리적 설득력',
          '신중한 의사결정'
        ],
        advantages: '에겐녀는 섬세하고 정확한 분석력으로 복잡한 문제를 체계적으로 해결할 수 있으며, 완벽주의적 성향으로 인해 높은 품질의 결과물을 만들어냅니다. 논리적인 설득력이 뛰어나 타인을 합리적으로 납득시킬 수 있고, 신중한 의사결정으로 실수를 최소화합니다. 계획 수립과 실행에 능숙하여 프로젝트 관리나 조직 운영에 탁월한 능력을 보입니다.',
        disadvantages: '완벽주의적 성향으로 인해 과도한 스트레스를 받을 수 있으며, 세부사항에 지나치게 집착하여 전체적인 흐름을 놓칠 수 있습니다. 신중함이 지나쳐 의사결정이 늦어질 수 있고, 논리적 접근만을 고집하여 감정적 측면을 간과할 수 있습니다. 자신의 기준이 높아 타인에게도 같은 수준을 요구하여 갈등이 생길 수 있습니다.'
      },
      {
        id: 5,
        type: 'teto-male',
        name: '테토남',
        description: '감정적이고 협력적인 남성 성격',
        characteristics: [
          '감정적 공감능력',
          '관계 중심적 사고',
          '협력적 문제 해결',
          '타인 배려 우선',
          '조화로운 분위기 추구'
        ],
        advantages: '테토남은 뛰어난 감정적 공감능력으로 타인의 마음을 깊이 이해하고 위로할 수 있으며, 관계 중심적 사고로 인해 팀워크와 협력에 능숙합니다. 갈등 상황에서 조화로운 해결책을 찾는 데 탁월하고, 타인을 배려하는 마음이 커서 주변 사람들에게 신뢰를 받습니다. 감정적 지지를 제공하는 능력이 뛰어나 리더십을 발휘할 때도 포용적이고 따뜻한 접근을 보입니다.',
        disadvantages: '감정에 의존한 판단으로 인해 객관적이고 논리적인 접근이 부족할 수 있으며, 타인을 지나치게 배려하다 보면 자신의 의견을 명확히 표현하지 못할 수 있습니다. 갈등을 회피하려는 성향으로 인해 필요한 결정을 미루거나 문제 해결이 지연될 수 있고, 감정적 스트레스에 취약하여 압박 상황에서 어려움을 겪을 수 있습니다.'
      },
      {
        id: 6,
        type: 'teto-female',
        name: '테토녀',
        description: '직관적이고 세심한 여성 성격',
        characteristics: [
          '뛰어난 직감력',
          '세심한 관찰력',
          '정서적 안정감 제공',
          '타인의 감정 이해',
          '따뜻한 소통 방식'
        ],
        advantages: '테토녀는 뛰어난 직감력과 세심한 관찰력으로 상황을 빠르게 파악하고 적절히 대응할 수 있습니다. 타인의 감정을 깊이 이해하고 정서적 안정감을 제공하는 능력이 뛰어나 주변 사람들에게 큰 위로가 됩니다. 따뜻하고 부드러운 소통 방식으로 갈등을 완화하고 조화로운 분위기를 만들어가며, 배려심이 깊어 인간관계에서 신뢰를 쌓는 데 탁월합니다.',
        disadvantages: '직관에 의존한 판단으로 인해 논리적 근거가 부족할 수 있으며, 감정적 접근을 우선시하여 객관적 분석이 어려울 수 있습니다. 타인의 감정에 지나치게 민감하여 본인도 감정적 스트레스를 많이 받을 수 있고, 갈등 상황에서 명확한 입장 표명을 어려워할 수 있습니다. 자신보다 타인을 우선시하는 경향으로 인해 자신의 욕구나 목표를 희생할 수 있습니다.'
      }
    ];

    this.compatibilityData = [
      {
        id: 1,
        type1: 'egen-male',
        type2: 'egen-female',
        friendshipTraits: [
          '논리적이고 체계적인 사고방식을 공유하여 깊이 있는 대화 가능',
          '목표 지향적인 성향으로 함께 프로젝트나 계획을 세우는 것을 즐김',
          '서로의 독립성을 존중하며 적절한 거리감을 유지',
          '효율성을 중시하여 불필요한 갈등을 피하고 해결책 중심으로 소통',
          '전문적인 주제나 지적 호기심을 함께 나누며 성장하는 관계'
        ],
        romanceTraits: [
          '서로의 논리적 사고를 이해하고 존중하여 안정적인 관계 형성',
          '계획적이고 체계적인 연애 스타일로 미래에 대한 구체적인 계획 수립',
          '감정 표현이 직접적이고 솔직하여 오해의 소지가 적음',
          '개인의 성장과 목표를 서로 지지하며 발전적인 관계 유지',
          '갈등 시 논리적 토론을 통해 해결하며 감정적 소모를 최소화'
        ]
      },
      {
        id: 2,
        type1: 'teto-male',
        type2: 'teto-female',
        friendshipTraits: [
          '뛰어난 공감능력으로 서로의 감정을 깊이 이해하고 위로',
          '관계 중심적 사고로 우정을 매우 소중히 여기며 오래 지속',
          '협력적이고 조화로운 분위기에서 함께 시간을 보내는 것을 선호',
          '타인에 대한 배려심이 강해 서로를 먼저 생각하는 아름다운 우정',
          '직관적 소통으로 말하지 않아도 서로의 마음을 이해하는 관계'
        ],
        romanceTraits: [
          '감정적 교감이 깊어 서로의 마음을 세심하게 이해하고 공감',
          '로맨틱하고 감성적인 연애 스타일로 특별한 순간들을 만들어감',
          '서로를 먼저 배려하며 희생적인 사랑을 실천하는 관계',
          '갈등 시 감정적 소통을 통해 해결하며 더욱 깊은 유대감 형성',
          '미래보다는 현재의 행복과 감정적 만족을 중시하는 연애관'
        ]
      },
      {
        id: 3,
        type1: 'teto-male',
        type2: 'egen-female',
        friendshipTraits: [
          '테토남의 감정적 지지와 에겐녀의 논리적 조언이 서로를 보완',
          '테토남의 관계 중심적 사고가 에겐녀의 독립성을 존중하며 균형',
          '서로 다른 관점을 통해 새로운 시각과 아이디어를 얻는 관계',
          '테토남의 협력적 성향과 에겐녀의 체계적 계획이 시너지 효과',
          '감정과 논리의 조화로 더욱 풍부하고 깊이 있는 우정 형성'
        ],
        romanceTraits: [
          '테토남의 감정적 표현과 에겐녀의 신중한 사랑이 조화롭게 어우러짐',
          '서로의 부족한 부분을 채워주며 성장하는 발전적인 관계',
          '테토남의 로맨틱함과 에겐녀의 실용적 사랑이 균형을 이룸',
          '갈등 시 감정과 논리 모두를 고려한 성숙한 해결 방식',
          '서로 다른 사랑의 언어를 이해하고 맞춰가는 배려심 깊은 연애'
        ]
      },
      {
        id: 4,
        type1: 'egen-male',
        type2: 'teto-female',
        friendshipTraits: [
          '에겐남의 리더십과 테토녀의 세심한 배려가 조화로운 우정',
          '서로 다른 관점을 통해 새로운 시각과 아이디어를 얻는 관계',
          '에겐남의 목표 지향성과 테토녀의 따뜻한 소통이 균형',
          '테토녀의 직관력이 에겐남의 논리적 사고를 보완',
          '서로의 강점을 인정하고 존중하는 상호 보완적 우정'
        ],
        romanceTraits: [
          '에겐남의 결단력과 테토녀의 감성적 표현이 완벽한 조화',
          '서로 다른 사랑의 언어를 이해하고 맞춰가는 배려심 깊은 연애',
          '에겐남의 계획적 연애와 테토녀의 로맨틱한 사랑이 균형',
          '갈등 시 논리와 감정을 모두 고려한 성숙한 해결 방식',
          '서로의 부족한 면을 채워주며 더 완전한 사람으로 성장하는 관계'
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
