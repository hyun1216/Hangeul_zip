# ☀️ 집에서한글 (Hangeul_zip)

> **"비싼 학습지 대신, 집에서 하루 15분 놀이하듯 배워요!"**  
> 유아·초등 아이를 둔 부모님들이 집에서 직접 한글을 가르칠 수 있도록, 수준별 무료 학습지(PDF)와 부모 전용 모바일 1:1 해설 가이드를 제공하는 홈스쿨링 웹 서비스입니다.

---

## 🌟 프로젝트 개요

- **서비스명**: 집에서한글 (`Hangeul_zip`)
- **목표**: 비싼 방문 학습지나 학원 대신, 부모와 아이가 정서적으로 교감하며 하루 15분씩 놀이처럼 배우는 한글 홈스쿨링 환경 구축
- **서비스 모델**: 현재 전 단계 무료 배포 버전이며, 추후 교구재 및 심화 콘텐츠와 연계된 정기결제 구독형 모델로 확장 예정
- **저장소**: [https://github.com/hyun1216/Hangeul_zip.git](https://github.com/hyun1216/Hangeul_zip.git)

---

## ✨ 3대 핵심 특징 (Key Features)

| 아이콘 | 특징 | 설명 |
| :---: | :--- | :--- |
| 📖 | **소릿값 중심 파닉스** | 문자의 명칭(기역, 니은) 주입이 아닌 `ㄱ(그) + ㅏ(아) = 가(그아)` 소릿값 결합 원리로 한글 습득 속도 극대화 |
| 🖨️ | **고화질 A4 프린트 학습지** | 언제 어디서든 집에서 즉시 인쇄하여 아이와 손으로 직접 연필 쥐고 그리는 활동지(PDF) 제공 |
| 📱 | **모바일 1:1 부모 해설 가이드** | 한 손에 스마트폰을 켜두고 아이를 지도할 수 있는 반응형 바텀시트(Bottom Sheet) 해설지 제공 (대화 예시, 칭찬 팁, 주의사항) |

---

## 🚀 4단계 학습 커리큘럼 로드맵

아이의 발달 수준과 인지 속도에 맞춘 단계별 테마 커리큘럼을 제공합니다.

1. **☀️ 해님반 (입문) - 소릿값 알기**
   - 문자 이름 대신 소릿값(그, 느, 드, 아, 오)으로 시작하는 입문 파닉스
   - 입모양 관찰 및 소리 합치기(블렌딩) 원리 지도
2. **🌙 달님반 (기초) - 글자 조립하기**
   - 자음과 모음이 만나 탄생하는 받침 없는 쉬운 낱말 (과일, 동물 이름)
   - 소리의 리듬을 타며 스스로 단어를 완성하는 성취감 형성
3. **⭐ 별님반 (심화) - 받침과 친해지기**
   - 아이들이 가장 헷갈려하는 기본 받침(ㅇ, ㄱ, ㄴ, ㄹ)과 이중모음 정복
   - 코맹맹이 소리(비음), 소리 브레이크 원리 등을 활용한 재미있는 지도법
4. **🚀 우주반 (완성) - 문장 술술 읽기**
   - 띄어쓰기 징검다리 규칙 및 문장 부호(마침표) 호흡법
   - 상상력을 키워주는 3~4문장 짧은 그림책 동화 스스로 읽기

---

## 🎨 디자인 시스템 & UI/UX 원칙

- **테마 & 감성**: 해, 달, 별, 우주 모티브의 따뜻하고 포근한 유아 맞춤형 감성
- **컬러 팔레트**: 
  - 눈이 편안한 파스텔 웜 크림 옐로우 (`#FFFDF5`, `bg-amber-50`, `bg-amber-100`)
  - 선명하고 부드러운 고대비 텍스트 (`text-gray-900`, `text-amber-950`)
  - 과도한 네온, 블러, 다중 그라데이션을 배제한 깔끔한 솔리드 카드 UI
- **형태**: 모나지 않고 둥글둥글한 라운드 모서리 (`rounded-2xl`, `rounded-3xl`, `rounded-full`)
- **반응형 모바일 최적화**: 부모들이 스마트폰으로 해설지를 보며 지도하는 상황을 고려한 Bottom Sheet 모달 UX 구현

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend & Database
- **Platform**: [Supabase](https://supabase.com/)
  - **Auth**: 카카오 / Google 간편 소셜 로그인 연동
  - **Database (PostgreSQL)**: 학습지 및 부모 해설지 메타데이터 관리
  - **Storage**: 아이용 학습지 고화질 PDF 및 썸네일 자산 서빙

---

## 📁 프로젝트 디렉토리 구조

```
Hangeul_zip/
├── .env.example                     # Supabase 환경변수 템플릿
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root Layout (포근한 옐로우 베이스 & 모바일 메타데이터)
│   │   ├── globals.css              # 테마 컬러 및 부드러운 스크롤·모달 애니메이션
│   │   └── page.tsx                 # 메인 페이지 (히어로 섹션, 탭 네비게이션, 3열 카드 그리드)
│   ├── components/
│   │   ├── Header.tsx               # 상단 네비게이션 & 간편 로그인 트리거
│   │   ├── CategoryTabs.tsx         # 해·달·별·우주 4단계 전환 탭 (스케일 인터랙션)
│   │   ├── WorksheetCard.tsx        # 썸네일·주차·PDF 다운로드 & 부모 해설지 버튼 카드
│   │   ├── ParentGuideModal.tsx     # 모바일 친화형 1:1 부모 해설 가이드 (Bottom Sheet)
│   │   ├── AuthModal.tsx            # 비회원 이용 시 소셜 로그인 유도 모달
│   │   └── Footer.tsx               # 서비스 철학 및 저작권 안내 푸터
│   ├── data/
│   │   └── worksheets.ts            # 파닉스 교육 팁이 포함된 고품질 더미 데이터셋
│   ├── lib/
│   │   └── supabase.ts              # Supabase 클라이언트 유틸리티 (Safe Fallback 내장)
│   └── types/
│       └── worksheet.ts             # 학습지 및 가이드 TypeScript 타입 정의
├── tailwind.config.ts               # Tailwind CSS 환경 설정
└── package.json
```

---

## 💻 로컬 개발 환경 실행 방법

1. **저장소 클론**
   ```bash
   git clone https://github.com/hyun1216/Hangeul_zip.git
   cd Hangeul_zip
   ```

2. **패키지 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정 (선택 사항)**
   - Supabase 연동 시 `.env.local` 파일을 생성하여 키를 입력합니다. (미설정 시에도 내장 더미 데이터로 모든 기능이 정상 동작합니다.)
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **로컬 개발 서버 실행**
   ```bash
   npm run dev
   ```
   - 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

5. **프로덕션 빌드**
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 라이선스 & 저작권 안내
© 2026 Hangeul_zip. All rights reserved.  
모든 학습지 디자인과 해설 가이드 콘텐츠의 저작권은 `집에서한글 (Hangeul_zip)`에 있습니다.
