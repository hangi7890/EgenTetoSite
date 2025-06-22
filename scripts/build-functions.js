import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Netlify Functions용 API 핸들러 생성
const createNetlifyFunction = (route, handler) => `
import { storage } from '../../../server/storage.js';

export const handler = async (event, context) => {
  const { httpMethod, path, body, queryStringParameters } = event;
  
  try {
    // CORS 헤더 설정
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Content-Type': 'application/json',
    };

    // OPTIONS 요청 처리 (CORS preflight)
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: '',
      };
    }

    ${handler}
    
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
`;

// personality-types 함수
const personalityTypesHandler = `
    if (httpMethod === 'GET') {
      const personalityTypes = await storage.getPersonalityTypes();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(personalityTypes),
      };
    }
    
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
`;

// compatibility 함수
const compatibilityHandler = `
    if (httpMethod === 'GET') {
      const compatibility = await storage.getCompatibilityAnalysis();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(compatibility),
      };
    }
    
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
`;

// 함수 파일들 생성
mkdirSync('netlify/functions', { recursive: true });

writeFileSync(
  'netlify/functions/personality-types.js',
  createNetlifyFunction('personality-types', personalityTypesHandler)
);

writeFileSync(
  'netlify/functions/compatibility.js',
  createNetlifyFunction('compatibility', compatibilityHandler)
);

console.log('Netlify Functions 생성 완료');