# Challkathon La Voz (React)
> 자폐가 있는 환자들을 추적 관찰하여 보다 편안한 삶을 영위할 수 있도록 돕는 서비스입니다.
>

## 📜 프로젝트 개요
> 자폐 스펙트럼 장애 행동 기록 및 분석 서비스
자폐 스펙트럼 장애 아동을 키우는 것은 보호자 혼자서는 감당하기 어려운 일입니다. 의료진의 전문적 진단과 치료, 보육교사의 교육적 지원, 가족의 지속적인 돌봄이 유기적으로 연결되어야 비로소 아이의 건강한 성장을 도울 수 있습니다. 

하지만 현실에서는 각각의 케어 제공자들이 파편적으로 아이를 관찰하고 대응하다 보니, 중요한 행동 패턴을 놓치거나 효과적인 대처 방안을 공유하지 못하는 경우가 많습니다. 

본 서비스는 이러한 문제를 해결하기 위해, 자폐 아동의 행동을 체계적으로 기록하고 분석하여 모든 케어 제공자가 협력할 수 있는 디지털 플랫폼을 제공합니다.

## 주요 기능

**공유 기록 시스템**
- 의사, 보호자, 보육교사 등 다중 사용자 **협업 노트** 기록
- **행동, 감정, 대처방안** 통합 기록
- 댓글 소통 기능

**AI기반 행동 패턴 분석**
- **트리거별** 분류 (소리, 촉감, 빛, 음식, 사람/군중)
- **시간대별** 패턴 분석
- 데이터 기반 대시보드 제공

**이상 행동 공유**
- 행동 패턴 기반 질문 공유
- 사용자 간 경험 및 정보 교환

**기대효과**
- 자폐 아동 개별 맞춤 케어 향상
- 케어팀 간 정보 공유 효율성 증대
- 데이터 기반 행동 예측 및 대응 전략 수립
- 자폐 가족 커뮤니티 지원 강화

ERD: https://www.erdcloud.com/d/Q6yHxqwakM7C7x23v

Github: 
- (FE) https://github.com/CHALLKATHON-Official/2025_CHALLKATHON_LaVoz_FE
- (BE) https://github.com/CHALLKATHON-Official/2025_CHALLKATHON_LaVoz_BE/issues/10

----

## 🛠️ 기술 스택
프로젝트에서 사용된 주요 기술 스택은 다음과 같습니다.

구분	기술
| 분류              | 사용 기술                            |
|-------------------|--------------------------------------|
| Core              | React, TypeScript, Vite              |
| State Management  | Zustand, React Query                 |
| Routing           | React Router DOM                     |
| Styling           | Tailwind CSS, shadcn/ui              |
| Form              | React Hook Form                      |
| Animation         | GSAP                                 |
| Charts            | Recharts                             |
| Linting           | ESLint                               |
| Package Manager   | yarn                                 |

----

## 📁 폴더구조
```
src/
├── api/          # API 요청 함수 (axios 인스턴스 등)
├── Assets/       # 이미지, 폰트 등 정적 에셋
├── components/   # 재사용 가능한 UI 컴포넌트
├── hooks/        # 커스텀 React Hooks
├── Layout/       # 페이지 레이아웃 컴포넌트 (Header, Footer 등)
├── lib/          # 유틸리티 함수 (cn, date-fns 포맷터 등)
├── Routes/       # 라우팅 설정 및 페이지 컴포넌트
├── types/        # 전역적으로 사용되는 TypeScript 타입 정의
├── Utils/        # 기타 유틸리티 함수
├── App.tsx       # 메인 애플리케이션 컴포넌트
└── main.tsx      # 애플리케이션 진입점
```
**컴포넌트 기반 아키텍처 (Component-Based Architecture)**
- components/: 재사용 가능한 UI 조각들 (버튼, 인풋, 카드 등)을 모아두는 곳입니다.
- Layout/: Header, Footer, Sidebar 등 페이지의 전체적인 틀을 담당하는 컴포넌트를 분리하여 관리합니다.
- Routes/: 각 페이지를 하나의 컴포넌트 단위로 만들어 관리합니다. 이 페이지 컴포넌트들은 components/와 Layout/의 컴포넌트들을 조합하여 구성됩니다.

**관심사 분리 (Separation of Concerns)**
- api/: 서버와 통신하는 데이터 로직(API 호출)을 다른 UI 로직과 완전히 분리했습니다.
- hooks/: 상태 관리 로직이나 반복되는 로직을 커스텀 훅으로 분리하여 재사용성을 높이고 컴포넌트의 복잡도를 낮춥니다.
- types/: TypeScript 타입을 별도로 관리하여 프로젝트 전반의 데이터 구조를 명확하게 하고 예측 가능성을 높입니다.
- lib/, Utils/: 특정 도메인에 종속되지 않는 순수 유틸리티 함수들을 분리하여 재사용성을 극대화합니다.

> 두 가지의 디자인 패턴을 적절히 융합하여 기능/역할별로 코드를 분리, 유지보수성과 재사용성을 높이고 또한 현대적인 컴포넌트 기반의 React 아키텍처를 만들기 위해 노력했습니다.
- **Atomic Design (아토믹 디자인)**: 비록 atoms, molecules 같은 폴더명은 없지만, 작은 components를 만들어 조합하여 Layout이나 Routes의 페이지를 만드는 방식은 아토믹 디자인의 핵심 철학을 따랐습니다.
- **Container/Presentational Pattern (컨테이너/프레젠테이셔널 패턴)**: 과거에는 데이터를 처리하는 로직을 가진 '컨테이너' 컴포넌트와 데이터(props)를 받아 그리기만 하는 '프레젠테이셔널' 컴포넌트를 분리했습니다. 지금은 hooks/와 api/ 가 '컨테이너'의 역할을 대신하고, components/가 '프레젠테이셔널' 역할을 수행하는 형태로 발전했습니다. 페이지 컴포넌트(Routes/)가 훅을 이용해 데이터를 가져와 프리젠테이셔널 컴포넌트로 내려주는 구조로 구현했습니다.

----

## ⚙️ 환경 변수
프로젝트에서 사용하는 환경 변수는 루트 디렉토리에 .env.local 파일을 생성하여 관리합니다.

## 🌐 배포
Vercel을 통한 배포가 설정되어 있습니다. Vercel을 통해 CI/CD를 구현했습니다.

----

