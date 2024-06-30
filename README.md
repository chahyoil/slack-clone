# Slack 클론 프로젝트

인프런 강좌 "Slack 클론 코딩[실시간 채팅 with React]"를 따라하면서 만든 클론 어플리케이션

## 프로젝트 구조

    slack-clone/
    ├── components/ # 재사용 가능한 React 컴포넌트
    ├── docker/ # Docker 관련 파일
    ├── hooks/ # 커스텀 React 훅
    ├── layouts/ # 레이아웃 컴포넌트
    ├── pages/ # 라우트별 페이지 컴포넌트
    ├── resources/ # 정적 리소스 파일
    ├── typings/ # TypeScript 타입 정의
    ├── utils/ # 유틸리티 함수

## 기술 스택

- React 17
- TypeScript
- Webpack 5
- Emotion (CSS-in-JS)
- Socket.io (실시간 통신)
- SWR (데이터 페칭)
- React Router
- Docker (백엔드 및 DB)

## 주요 기능

- 로그인 및 회원가입
- 실시간 채팅
- 채널 및 다이렉트 메시지 (DM)
- 워크스페이스 관리
- 사용자 초대 및 멘션(@)
- 이미지 드래그 & 드롭 업로드
- 안 읽은 메시지 개수 표시

## 시작하기

### 프론트엔드

1. 의존성 설치:
   npm install

2. 개발 서버 실행:
   npm run dev

애플리케이션은 `http://localhost:3090`에서 실행됩니다.

3. 프로덕션 빌드:
   npm run build


### 백엔드 (Docker)

1. docker 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다:
   - MYSQL_PASSWORD=your_mysql_password
   - COOKIE_SECRET=your_cookie_secret

2. Docker 컨테이너 실행:
   docker-compose up -d

백엔드 서버는 `http://localhost:3095`에서 실행됩니다.

## 개발 환경

- Node.js
- npm 또는 yarn
- Docker 및 Docker Compose

## 주요 개발 사항

- Webpack 설정 최적화 및 분석 (webpack-bundle-analyzer 사용)
- Socket.io를 이용한 실시간 메시지 업데이트
- 커스텀 훅을 통한 로직 재사용 (useInput, useSocket 등)
- 메모이제이션을 통한 성능 최적화 (React.memo 사용)
- 정규표현식을 이용한 메시지 파싱 (멘션, 링크 등)
- LocalStorage를 활용한 상태 관리
- SWR을 이용한 데이터 캐싱 및 전역 상태 관리

## 참고 사항

- 이 프로젝트는 학습 목적 및 포트폴리오 용도
- 백엔드는 Docker를 통해 제공되며, MySQL 데이터베이스를 사용
- 프론트엔드 개발 시 프록시 설정을 통해(webpack.config.js) 백엔드 API와 통신