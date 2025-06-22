// Netlify Function for compatibility analysis API
const compatibilityData = [
  {
    id: 1,
    type1: "egen-male",
    type2: "egen-female",
    compatibility: 85,
    description: "매우 조화로운 관계",
    details: "둘 다 감정적이고 배려심이 많아 서로를 잘 이해합니다. 갈등이 적고 평화로운 관계를 유지할 수 있습니다.",
    strengths: ["높은 감정적 유대감", "서로에 대한 깊은 이해", "평화로운 관계", "공감대 형성"],
    challenges: ["결정력 부족", "현실적 문제 해결 어려움", "감정에 치우친 판단"]
  },
  {
    id: 2,
    type1: "teto-male",
    type2: "teto-female", 
    compatibility: 70,
    description: "경쟁적이지만 발전적인 관계",
    details: "둘 다 목표 지향적이고 독립적이어서 서로를 존중하며 함께 성장할 수 있습니다.",
    strengths: ["명확한 목표 설정", "서로의 독립성 존중", "논리적 문제 해결", "성취 지향"],
    challenges: ["감정 표현 부족", "경쟁 심화", "완고함", "관계보다 성과 우선"]
  },
  {
    id: 3,
    type1: "egen-male",
    type2: "teto-female",
    compatibility: 90,
    description: "완벽한 상호 보완 관계",
    details: "에겐남의 감성과 테토녀의 이성이 만나 이상적인 균형을 이룹니다. 서로의 부족한 부분을 채워주는 관계입니다.",
    strengths: ["완벽한 상호 보완", "균형잡힌 관계", "서로의 성장 도움", "다양한 관점 제공"],
    challenges: ["의사소통 방식 차이", "우선순위 차이", "갈등 해결 방식 상이"]
  },
  {
    id: 4,
    type1: "teto-male",
    type2: "egen-female",
    compatibility: 75,
    description: "전통적이지만 안정적인 관계",
    details: "테토남의 리더십과 에겐녀의 지지가 만나 안정적인 관계를 형성합니다. 서로의 역할이 명확합니다.",
    strengths: ["명확한 역할 분담", "안정적 관계", "상호 지지", "전통적 조화"],
    challenges: ["역할 고정화", "에겐녀의 의견 묻힘", "변화 적응 어려움", "일방적 관계"]
  },
  {
    id: 5,
    type1: "egen-male",
    type2: "teto-male",
    compatibility: 60,
    description: "도전적이지만 성장 가능한 관계",
    details: "서로 다른 접근 방식으로 인해 갈등이 있을 수 있지만, 이를 통해 서로 배우고 성장할 수 있습니다.",
    strengths: ["서로 다른 관점 학습", "성장 기회", "균형 찾기", "새로운 시각"],
    challenges: ["의사소통 어려움", "가치관 차이", "갈등 빈발", "이해 부족"]
  },
  {
    id: 6,
    type1: "egen-female",
    type2: "teto-female",
    compatibility: 65,
    description: "서로 배울 점이 많은 관계",
    details: "에겐녀의 감성과 테토녀의 이성이 만나 서로에게 새로운 관점을 제공합니다.",
    strengths: ["상호 학습", "다양성", "새로운 경험", "관점 확장"],
    challenges: ["소통 방식 차이", "우선순위 갈등", "이해 시간 필요", "조화 어려움"]
  }
];

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    try {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(compatibilityData),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch compatibility data' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};