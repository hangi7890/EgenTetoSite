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
  private personalityTypesData: PersonalityType[];
  private compatibilityData: CompatibilityAnalysis[];
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        type2: 'teto-male',
        friendshipTraits: [
          '에겐남의 리더십과 테토남의 협력적 성향이 좋은 팀워크 형성',
          '서로 다른 문제 해결 방식을 통해 더 창의적인 해결책 도출',
          '에겐남의 목표 지향성과 테토남의 관계 중심 사고가 균형',
          '테토남의 감정적 지지가 에겐남의 스트레스 해소에 도움',
          '서로의 강점을 인정하고 존중하는 상호 보완적 우정'
        ],
        romanceTraits: [
          '에겐남의 결단력과 테토남의 감정적 표현이 조화로운 관계',
          '서로 다른 사랑의 방식을 이해하고 받아들이는 성숙한 연애',
          '에겐남의 계획적 연애와 테토남의 감성적 연애가 균형',
          '갈등 시 논리와 감정을 모두 고려한 원만한 해결',
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
