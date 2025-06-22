// Netlify Function for personality types API
const personalityTypesData = [
  {
    id: 1,
    type: "egen",
    name: "에겐 (Egen)",
    description: "에스트로겐 기반 성격 유형",
    characteristics: [
      "감정적이고 공감 능력이 뛰어남",
      "관계 중심적 사고",
      "섬세하고 배려심이 많음",
      "협력을 중시함"
    ],
    advantages: [
      "뛰어난 공감 능력과 정서적 지능",
      "갈등 상황에서의 중재 능력",
      "타인의 감정을 잘 이해하고 배려",
      "팀워크와 협력에 능숙"
    ],
    disadvantages: [
      "감정에 휘둘리기 쉬움",
      "결정을 내리는 데 시간이 오래 걸림",
      "스트레스에 민감하게 반응",
      "자신의 의견을 강하게 주장하지 못함"
    ],
    variants: {
      male: {
        name: "에겐 남성",
        traits: ["감성적", "예술적", "섬세함", "배려심"]
      },
      female: {
        name: "에겐 여성", 
        traits: ["온화함", "모성적", "협조적", "직관적"]
      }
    }
  },
  {
    id: 2,
    type: "teto",
    name: "테토 (Teto)",
    description: "테스토스테론 기반 성격 유형",
    characteristics: [
      "논리적이고 분석적 사고",
      "목표 지향적",
      "독립적이고 자주적",
      "경쟁을 즐김"
    ],
    advantages: [
      "명확하고 논리적인 사고력",
      "목표 달성을 위한 강한 추진력",
      "스트레스 상황에서의 냉정함",
      "리더십과 결단력"
    ],
    disadvantages: [
      "감정 표현이 서툴거나 부족",
      "타인의 감정을 이해하기 어려움",
      "고집이 세고 융통성 부족",
      "관계보다 성과를 우선시"
    ],
    variants: {
      male: {
        name: "테토 남성",
        traits: ["강인함", "리더십", "논리적", "목표지향적"]
      },
      female: {
        name: "테토 여성",
        traits: ["독립적", "진취적", "분석적", "결단력"]
      }
    }
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
        body: JSON.stringify(personalityTypesData),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch personality types' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};