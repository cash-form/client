# Next.js 개발 환경을 위한 Dockerfile

# Node.js 이미지 사용 - 로컬 환경과 동일한 버전 적용
FROM node:22-alpine

# Yarn 설치
RUN apk add --no-cache yarn

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치 전에 package.json과 yarn.lock을 복사
COPY package.json yarn.lock* ./

# 패키지 설치
RUN yarn install

# 소스 코드 복사
COPY . .

# 개발 서버 포트 노출
EXPOSE 3000

# 개발 모드 실행
CMD ["yarn", "dev"]
