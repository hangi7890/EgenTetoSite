# 에겐-테토 성격 분석 웹사이트

호르몬 기반 성격 유형 분석 및 궁합 테스트 웹사이트입니다.

## 🌟 주요 기능

- **성격 유형 분석**: 에겐(에스트로겐)과 테토(테스토스테론) 기반 성격 유형
- **궁합 분석**: 6가지 조합의 상세한 궁합 분석
- **연애 먹이사슬**: 호르몬 기반 관계 역학 시각화
- **소셜 공유**: 페이스북, 트위터, 인스타그램 공유 기능

## 🚀 Netlify 배포 가이드

### 1. GitHub 레포지토리 연결
1. GitHub에 새 레포지토리 생성
2. 프로젝트 파일들을 레포지토리에 업로드

### 2. Netlify 사이트 생성
1. [Netlify](https://netlify.com) 접속 및 로그인
2. "New site from Git" 클릭
3. GitHub 레포지토리 선택
4. 빌드 설정은 자동으로 `netlify.toml` 파일에서 읽어옵니다:
   - Build command: `vite build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

### 3. 환경 변수 설정 (선택사항)
사이트 설정 > Environment variables에서 필요한 환경 변수 추가

### 4. 배포 확인
배포가 완료되면 Netlify에서 제공하는 URL로 사이트 접속 가능

## 🛠️ 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
├── client/                 # 프론트엔드 코드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   └── lib/            # 유틸리티 및 설정
├── server/                 # 백엔드 코드
├── netlify/                # Netlify Functions
│   └── functions/          # API 엔드포인트
├── shared/                 # 공유 타입 및 스키마
└── netlify.toml           # Netlify 설정
```

## 🎨 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js (로컬), Netlify Functions (배포)
- **UI Components**: Radix UI, shadcn/ui
- **Icons**: Lucide React
- **Routing**: Wouter

## 📱 반응형 디자인

모든 화면 크기에서 최적화된 사용자 경험을 제공합니다.

## 🔗 API 엔드포인트

- `GET /api/personality-types` - 성격 유형 데이터
- `GET /api/compatibility` - 궁합 분석 데이터

## 📄 라이선스

MIT License