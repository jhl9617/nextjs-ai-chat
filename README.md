# Next.js AI Chat Application

OpenAI API를 활용한 ChatGPT 스타일의 AI 채팅 애플리케이션입니다.

## 주요 기능

- 💬 AI와의 실시간 채팅
- 🌓 다크모드 지원
- ✏️ 메시지 편집/삭제
- 💾 대화 내용 로컬 저장 및 다운로드
- ⚙️ 시스템 프롬프트 커스터마이징
- 📝 마크다운 및 코드 하이라이팅 지원

## 기술 스택

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API

## 설치 및 실행 방법

1. 레포지토리 클론:
```bash
git clone https://github.com/[YOUR_USERNAME]/nextjs-ai-chat.git
cd nextjs-ai-chat
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
   - `.env.sample` 파일을 `.env.local`로 복사
   - OpenAI API 키 입력
```bash
cp .env.sample .env.local
```

4. 개발 서버 실행:
```bash
npm run dev
```

5. 브라우저에서 확인:
   - http://localhost:3000 접속

## 환경 변수 설정

`.env.sample` 파일을 `.env.local`로 복사한 후, 필요한 값을 입력하세요:

- `OPENAI_API_KEY`: OpenAI API 키 ([OpenAI 웹사이트](https://platform.openai.com/account/api-keys)에서 발급 가능)

## 프로젝트 구조

```
nextjs-ai-chat/
├── src/
│   ├── app/              # Next.js 앱 라우터
│   ├── components/       # 리액트 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── types/           # TypeScript 타입 정의
│   └── utils/           # 유틸리티 함수
├── public/              # 정적 파일
└── ...설정 파일들
```

## 기능 설명

- **실시간 채팅**: OpenAI API를 사용한 자연스러운 대화
- **다크모드**: 시스템 설정 연동 및 수동 전환 가능
- **메시지 관리**: 
  - 메시지 편집/삭제
  - 대화 내용 JSON 형식으로 다운로드
- **시스템 프롬프트**: AI의 역할과 행동 방식을 자유롭게 설정
- **로컬 저장**: 브라우저 로컬 스토리지를 활용한 대화 내용 자동 저장
