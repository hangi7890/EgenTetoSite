import { execSync } from 'child_process';
import { mkdirSync, writeFileSync, cpSync, rmSync } from 'fs';
import { join } from 'path';

console.log('Building for Netlify...');

// 1. 클라이언트 빌드
console.log('Building client...');
execSync('vite build', { stdio: 'inherit' });

// 2. Netlify Functions 디렉토리 생성
mkdirSync('netlify/functions', { recursive: true });

// 3. Storage 모듈을 Functions에서 사용할 수 있도록 복사
console.log('Copying server files...');
cpSync('server/storage.ts', 'netlify/functions/storage.js');
cpSync('shared/schema.ts', 'netlify/functions/schema.js');

// 4. personality-types Function 생성
const personalityTypesFunction = `
import { MemStorage } from './storage.js';

const storage = new MemStorage();

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
      const personalityTypes = await storage.getPersonalityTypes();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(personalityTypes),
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
`;

// 5. compatibility Function 생성  
const compatibilityFunction = `
import { MemStorage } from './storage.js';

const storage = new MemStorage();

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
      const compatibility = await storage.getCompatibilityAnalysis();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(compatibility),
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
`;

// Functions 파일 작성
writeFileSync('netlify/functions/personality-types.js', personalityTypesFunction);
writeFileSync('netlify/functions/compatibility.js', compatibilityFunction);

console.log('Netlify build completed!');