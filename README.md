This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Todo App

이 프로젝트는 Next.js와 Tailwind CSS를 활용하여 제작된 간단한 Todo 애플리케이션입니다. 사용자는 할 일을 추가, 수정, 삭제할 수 있으며, 완료 상태를 관리할 수 있습니다. 또한 메모 기능과 이미지 업로드 기능을 지원합니다.

## 주요 기능

할 일 관리: 할 일 추가, 수정, 삭제 및 완료 상태 관리

메모 기능: 각 할 일에 메모를 추가 가능

반응형 UI: 다양한 화면 크기에서 최적화된 사용자 경험 제공

## 기술 스택

프론트엔드: Next.js, React

스타일링: Tailwind CSS

API: Fetch를 사용한 RESTful API 통신

타이핑: TypeScript

# 폴더 구조
/src

├── app

│   ├── items

│   │   ├── [itemId]

│   │   │   └── page.tsx  // 특정 할 일의 상세 페이지

│   └── layout.tsx        // 전역 레이아웃 설정

├── components

│   └── ui

│       ├── Button.tsx    // 버튼 컴포넌트

│       ├── EmptyState.tsx // 빈 상태 UI 컴포넌트

│       ├── Input.tsx     // 입력 필드 컴포넌트

│       └── TodoItem.tsx  // 단일 할 일 항목 컴포넌트

├── lib

│   ├── api.ts            // API 함수 정의

│   └── types.ts          // TypeScript 타입 정의

├── styles

│   └── globals.css       // 전역 스타일


## 주요 파일 설명

/src/app/items/[itemId]/page.tsx

특정 할 일의 상세 정보를 가져오고, 수정 및 삭제를 수행하는 페이지입니다. 이미지 업로드와 메모 기능도 포함되어 있습니다.

/src/app/layout.tsx

앱의 전역 레이아웃을 정의합니다. 헤더와 컨테이너 스타일이 포함되어 있습니다.

/src/components/ui/Button.tsx

다양한 스타일의 버튼을 제공하는 재사용 가능한 컴포넌트입니다. primary, secondary, danger의 세 가지 변형을 지원합니다.

/src/components/ui/EmptyState.tsx

할 일이 없거나 완료된 할 일이 없을 때 표시되는 빈 상태 컴포넌트입니다.

/src/components/ui/Input.tsx

사용자 입력 필드를 위한 재사용 가능한 컴포넌트입니다.

/src/components/ui/TodoItem.tsx

단일 할 일을 표시하는 컴포넌트로, 클릭 시 상세 페이지로 이동합니다.

/src/lib/api.ts

할 일 목록 가져오기, 생성, 수정, 삭제 및 이미지 업로드를 처리하는 API 함수들이 정의되어 있습니다.

/src/lib/types.ts

## 실패
이미지 업로드

ui그대로의 이미지 이용 및 레이어 만들기



애플리케이션에서 사용되는 TypeScript 타입이 정의되어 있습니다. 예: Item, CreateItemDto, UpdateItemDto.
