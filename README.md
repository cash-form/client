# 코딩 컨벤션

이 문서는 프로젝트의 코드 일관성과 가독성을 위한 코딩 규칙을 정의합니다.

## 공통 컨벤션

### 1. 절대 경로 import 사용

모든 모듈 import는 루트 경로로부터의 절대 경로를 사용합니다:

- tsconfig.json에 설정된 path alias를 활용하여 명확하고 일관된 import 경로를 유지합니다.
- 상대 경로보다 절대 경로를 우선적으로 사용합니다.

**나쁜 예:**

```typescript
// 상대 경로 사용 (지양)
import Button from "../../../components/common/Button";
import { fetchUsers } from "../../services/api/userApi";
```

**좋은 예:**

```typescript
// 절대 경로 사용
import Button from "components/common/Button";
import { fetchUsers } from "services/api/userApi";
```

### 2. React 메서드 및 타입 직접 import

React 네임스페이스를 통해 메서드나 타입을 사용하는 방식(React.xxx) 대신 필요한 메서드와 타입을 직접 import 합니다:

- 코드 가독성을 높이고 번들 크기를 최적화할 수 있습니다.
- tree-shaking을 통해 필요한 기능만 포함됩니다.

**나쁜 예:**

```typescript
import React from "react";

// React 네임스페이스를 통해 메서드 접근 (지양)
const Component = React.memo(() => {
  const inputRef = React.useRef(null);
  const [state, setState] = React.useState("");

  React.useEffect(() => {
    // 효과 로직
  }, []);

  return <div ref={inputRef}>{state}</div>;
});

// React 타입 사용 시 네임스페이스 사용 (지양)
const handleClick = (event: React.MouseEvent) => {
  // 이벤트 처리
};
```

**좋은 예:**

```typescript
import { memo, useRef, useState, useEffect } from "react";
import type { MouseEvent } from "react";

// 필요한 메서드 직접 호출
const Component = memo(() => {
  const inputRef = useRef(null);
  const [state, setState] = useState("");

  useEffect(() => {
    // 효과 로직
  }, []);

  return <div ref={inputRef}>{state}</div>;
});

// 필요한 타입 직접 import
const handleClick = (event: MouseEvent) => {
  // 이벤트 처리
};
```

### 3. 공통 상수 관리

애플리케이션 전반에서 사용되는 상수와 URL은 지정된 설정 파일에서 관리합니다:

- 반복되는 상수, 공통 데이터는 `config/constants.ts`에 정의합니다.
- 페이지 URL은 `config/pageUrl.config.ts`에 정의합니다.
- API URL은 `config/apiUrl.config.ts`에 정의합니다.

**나쁜 예:**

```typescript
// 컴포넌트 내에서 하드코딩된 상수와 URL (지양)
function Navigation() {
  const menuItems = [
    { id: 1, name: "홈", url: "/" },
    { id: 2, name: "프로필", url: "/profile" },
  ];

  const handleApiCall = async () => {
    // 하드코딩된 API URL
    const response = await fetch("/api/v1/users");
    // ...
  };

  return (
    <nav>
      {menuItems.map((item) => (
        <a href={item.url} key={item.id}>
          {item.name}
        </a>
      ))}
    </nav>
  );
}
```

**좋은 예:**

```typescript
// constants.ts
export const MenuItems = {
  HOME: { id: 1, name: "홈", url: pageUrlConfig.HOME },
  PROFILE: { id: 2, name: "프로필", url: pageUrlConfig.PROFILE },
} as const;

// pageUrl.config.ts
class PageUrlConfig {
  public HOME = "/";
  public PROFILE = "/profile";
}
export default new PageUrlConfig();

// apiUrl.config.ts
class ApiUrlConfig {
  public BASE = "/api/v1";
  public USERS = `${this.BASE}/users`;
}
export default new ApiUrlConfig();

// 컴포넌트에서 사용
import { MenuItems } from "config/constants";
import pageUrlConfig from "config/pageUrl.config";
import apiUrlConfig from "config/apiUrl.config";

function Navigation() {
  const menuItems = Object.values(MenuItems);

  const handleApiCall = async () => {
    const response = await fetch(apiUrlConfig.USERS);
    // ...
  };

  return (
    <nav>
      {menuItems.map((item) => (
        <a href={item.url} key={item.id}>
          {item.name}
        </a>
      ))}
    </nav>
  );
}
```

## 변수 선언 규칙

### 1. `var` 키워드 사용 금지

`var` 키워드는 호이스팅(hoisting)과 함수 스코프(function scope)로 인해 예상치 못한 버그를 발생시킬 수 있습니다. 따라서:

- `var` 키워드 대신 항상 `let`과 `const`를 사용합니다.
- 변경되지 않는 변수는 `const`를 사용합니다.
- 변경이 필요한 변수만 `let`을 사용합니다.

**나쁜 예:**

```javascript
var count = 1;
var name = "John";
```

**좋은 예:**

```javascript
const count = 1;
let name = "John";
```

### 2. 불리언(Boolean) 타입 변수 명명 규칙

불리언 타입의 변수는 그 값이 참/거짓(true/false)임을 명확히 하기 위해:

- `is` 또는 `has` 접두사로 시작하는 이름을 사용합니다.
- 변수 이름만으로 해당 변수가 불리언 타입임을 알 수 있어야 합니다.

**나쁜 예:**

```javascript
const active = true;
const userLogin = false;
const visible = true;
```

**좋은 예:**

```javascript
const isActive = true;
const isUserLoggedIn = false;
const hasPermission = true;
const isVisible = true;
```

### 3. 줄임말 사용 금지

변수명이나 상태 이름에 줄임말을 사용하면 코드 이해에 어려움을 줄 수 있습니다:

- 변수명은 그 목적과 의미를 명확히 전달할 수 있도록 완전한 단어를 사용합니다.
- 다른 개발자도 쉽게 이해할 수 있는 명확한 이름을 사용합니다.

**나쁜 예:**

```javascript
const usr = { name: "John" };
const btn = document.getElementById("submit");
const addr = "서울시 강남구";
const idx = 0;
```

**좋은 예:**

```javascript
const user = { name: "John" };
const button = document.getElementById("submit");
const address = "서울시 강남구";
const index = 0;
```

## 이벤트 및 함수 규칙

### 1. 이벤트 선언 방식

이벤트는 항상 화살표 함수 형태로 선언합니다:

- `const` 키워드를 사용하여 이벤트 함수를 선언합니다.
- 화살표 함수(`=>`) 문법을 사용합니다.

**좋은 예:**

```typescript
import type { MouseEvent } from "react";

const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  // 이벤트 처리 로직
};
```

### 2. 함수 선언 방식

일반 함수는 `function` 키워드를 사용하여 선언합니다:

**좋은 예:**

```typescript
function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}
```

### 3. 타입 명시

모든 함수와 이벤트의 매개변수와 반환 값에 타입을 명시합니다:

- 매개변수는 interface, type, dto 또는 model을 사용하여 타입을 지정합니다.
- 함수의 반환 타입을 명확히 지정합니다.

**나쁜 예:**

```typescript
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};
```

**좋은 예:**

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url);
  return {
    data: await response.json(),
    status: response.status,
  };
};
```

### 4. useCallback 최적화

React 컴포넌트 내에서는 가능한 경우 `useCallback`을 사용하여 함수를 최적화합니다:

**좋은 예:**

```typescript
import { useCallback } from "react";

// 컴포넌트 내부
const handleSubmit = useCallback(
  (formData: FormData) => {
    // 제출 처리 로직
  },
  [
    /* 의존성 배열 */
  ]
);
```

### 5. 모듈화 및 커스텀 훅 사용

반복되는 로직은 별도의 모듈이나 커스텀 훅으로 분리합니다:

**좋은 예 (커스텀 훅):**

```typescript
// hooks/useForm.ts
import { useState } from "react";
import type { ChangeEvent } from "react";

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange };
}

// 사용 예시
const { values, handleChange } = useForm({ name: "", email: "" });
```

### 6. 단일 책임 원칙

각 함수와 이벤트는 하나의 목적과 기능만 가져야 합니다:

- 여러 작업을 수행해야 하는 경우, 작업별로 함수를 분리합니다.
- 함수 이름은 수행하는 작업을 명확히 표현해야 합니다.

**나쁜 예:**

```typescript
const handleFormSubmit = () => {
  validateForm();
  saveToDatabase();
  showSuccessMessage();
  redirectToHomePage();
};
```

**좋은 예:**

```typescript
const handleFormSubmit = () => {
  if (validateForm()) {
    saveToDatabase();
  }
};

const validateForm = (): boolean => {
  // 유효성 검사 로직
  return isValid;
};

const saveToDatabase = async (): Promise<void> => {
  await api.save(formData);
  showSuccessMessage();
  redirectToHomePage();
};
```

### 7. 주석 사용

복잡하거나 긴 함수의 경우 주석을 사용하여 목적, 매개변수, 로직을 설명합니다:

**좋은 예:**

```typescript
/**
 * 사용자 프로필을 업데이트하고 결과를 반환합니다.
 *
 * @param userId - 업데이트할 사용자의 ID
 * @param profileData - 업데이트할 프로필 데이터
 * @returns 업데이트된 사용자 정보와 상태 코드
 *
 * 1. 사용자 존재 여부 확인
 * 2. 프로필 데이터 유효성 검사
 * 3. 데이터베이스 업데이트 수행
 * 4. 업데이트된 사용자 정보 반환
 */
async function updateUserProfile(
  userId: string,
  profileData: ProfileUpdateDto
): Promise<ApiResponse<User>> {
  // 함수 구현 로직
}
```

## API 규칙

### 1. React Query 사용

모든 데이터 페칭에는 React Query를 사용합니다:

- 캐싱, 자동 갱신, 로딩/에러 상태 관리를 위해 React Query를 사용합니다.
- 데이터 변이(mutations)에도 React Query를 활용합니다.

**좋은 예:**

```typescript
// hooks/api/useUsers.ts
import { useQuery, useMutation } from "tanstack/react-query";
import { fetchUsers, createUser } from "services/api/userApi";

export function useUsers() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // 캐시 무효화 등 처리
    },
  });

  return {
    users: usersQuery.data,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    createUser: createUserMutation.mutate,
  };
}
```

### 2. 요청 모델 분리

API 요청 바디, 파라미터는 별도의 model 파일을 생성하여 명시합니다:

- 모델 파일은 `models` 디렉토리에 위치시킵니다.
- 각 모델은 그 용도와 구조를 명확히 표현해야 합니다.

**좋은 예:**

```typescript
// models/user/UserCreateModel.ts
export class UserCreateModel {
  name: string;
  email: string;
  role: "admin" | "user";
  department?: string;
}

// services/api/userApi.ts
import { UserCreateModel } from "models/user/UserCreateModel";

export const createUser = async (user: UserCreateModel): Promise<User> => {
  const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
  return response.json();
};
```

### 3. 응답 DTO 분리

API 응답에 대한 객체는 반드시 DTO(Data Transfer Object) 파일을 생성하여 명시합니다:

- DTO 파일은 `dto` 디렉토리에 위치시킵니다.
- 백엔드에서 전달되는 데이터 구조를 정확히 반영합니다.

**좋은 예:**

```typescript
// dto/user/UserResponseDto.ts
export class UserResponseDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly role: "admin" | "user";
  public readonly department?: string;
  public readonly createdAt: string;
  public readonly updatedAt: string;
}

// services/api/userApi.ts
import { UserResponseDto } from "dto/user/UserResponseDto";

export const fetchUser = async (id: string): Promise<UserResponseDto> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

### 4. API 함수 순수성

API 함수는 오직 API 요청을 담당하고 다른 로직은 포함하지 않습니다:

- 각 API 함수는 반드시 API 호출 결과를 반환해야 합니다.
- 데이터 변환, 유효성 검사 등의 로직은 API 함수 외부에서 처리합니다.

**나쁜 예:**

```typescript
export const fetchAndProcessUsers = async () => {
  const response = await fetch("/api/users");
  const users = await response.json();

  // API 함수에 데이터 가공 로직이 포함됨 (지양)
  return users
    .filter((user) => user.isActive)
    .map((user) => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
    }));
};
```

**좋은 예:**

```typescript
// services/api/userApi.ts - API 함수
export const fetchUsers = async (): Promise<UserResponseDto[]> => {
  const response = await fetch("/api/users");
  return response.json();
};

// hooks/useUsers.ts - 데이터 가공 로직 분리
import { useMemo } from "react";

export const useUsers = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // 데이터 가공 로직을 별도로 처리
  const activeUsers = useMemo(() => {
    return users
      ?.filter((user) => user.isActive)
      .map((user) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      }));
  }, [users]);

  return { users, activeUsers };
};
```

### 5. API 주석 문서화

API 함수는 깊은 주석을 사용하여 인자값, 응답 객체, API 목적을 상세히 기술합니다:

**좋은 예:**

```typescript
/**
 * 사용자 목록을 페이지네이션 형태로 조회합니다.
 *
 * @param params - 조회 파라미터
 * @param params.page - 조회할 페이지 번호 (1부터 시작)
 * @param params.limit - 페이지당 조회할 항목 수
 * @param params.role - 사용자 역할 필터 (선택)
 * @returns 사용자 목록 및 페이지네이션 정보
 *
 * 응답 형식:
 * - items: 사용자 객체 배열
 * - totalCount: 전체 사용자 수
 * - totalPages: 전체 페이지 수
 * - currentPage: 현재 페이지 번호
 */
export const fetchUsers = async (
  params: UserListRequestModel
): Promise<PaginatedResponseDto<UserResponseDto>> => {
  const query = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });

  if (params.role) {
    query.append("role", params.role);
  }

  const response = await fetch(`/api/users?${query}`);
  return response.json();
};
```

### 6. API 중복 확인

새로운 API 함수를 작성하기 전에 이미 동일한 기능의 API가 존재하는지 확인합니다:

- `services/api` 디렉토리를 검색하여 유사한 기능의 API가 있는지 확인합니다.
- 기존 API에 필요한 기능을 추가하는 것이 중복 생성보다 우선시됩니다.
- 팀원들과 API 작성 전 공유하고 확인합니다.

**나쁜 예:**

```typescript
// userApi.ts에 이미 fetchUser 함수가 있는데 또 작성
export const getUserById = async (id: string): Promise<UserResponseDto> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};
```

**좋은 예:**

```typescript
// 기존 함수를 확인하고 재사용
import { fetchUser } from "services/api/userApi";

// fetchUser 함수를 재사용하여 사용자 정보 조회
const user = await fetchUser(userId);
```

## 뷰 및 컴포넌트 규칙

### 1. 컴포넌트 선언 방식

컴포넌트는 function 키워드로 선언하고, 이름은 파일명과 동일하게 설정합니다:

- 파스칼 케이스(PascalCase)로 컴포넌트 이름을 지정합니다.
- 파일명과 컴포넌트 이름이 일치해야 합니다.

**좋은 예:**

```typescript
// header.tsx
function Header() {
  return <header className="main-header">{/* 헤더 내용 */}</header>;
}

export default Header;
```

### 2. 단일 컴포넌트 원칙

하나의 파일에는 하나의 컴포넌트만 작성합니다:

- 여러 컴포넌트가 필요한 경우 각각 별도의 파일로 분리합니다.
- 단, 해당 컴포넌트에서만 사용하는 작은 헬퍼 컴포넌트는 같은 파일에 둘 수 있습니다.

**나쁜 예:**

```typescript
// 여러 컴포넌트를 한 파일에 정의 (지양)
function Header() {
  return <header>{/* 헤더 내용 */}</header>;
}

function Footer() {
  return <footer>{/* 푸터 내용 */}</footer>;
}

export { Header, Footer };
```

**좋은 예:**

```typescript
// header.tsx
function Header() {
  // 헤더에서만 사용하는 작은 컴포넌트는 예외적으로 같은 파일에 위치 가능
  function HeaderLogo() {
    return <img src="/logo.svg" alt="로고" />;
  }

  return (
    <header>
      <HeaderLogo />
      {/* 나머지 헤더 내용 */}
    </header>
  );
}

export default Header;
```

### 3. 컴포넌트 문서화

공통 컴포넌트 또는 복잡한 컴포넌트는 깊은 주석으로 사용 목적 및 방법을 기재합니다:

**좋은 예:**

```typescript
/**
 * 공통 버튼 컴포넌트
 *
 * 프로젝트 전반에서 사용되는 표준 버튼 컴포넌트입니다.
 *
 * @param variant - 버튼 스타일 변형 ('primary', 'secondary', 'outline')
 * @param size - 버튼 크기 ('sm', 'md', 'lg')
 * @param isDisabled - 버튼 비활성화 여부
 * @param onClick - 클릭 이벤트 핸들러
 * @param children - 버튼 내부 콘텐츠
 *
 * @example
 * <Button variant="primary" size="md" onClick={handleSubmit}>
 *   제출하기
 * </Button>
 */
function Button({
  variant = "primary",
  size = "md",
  isDisabled = false,
  onClick,
  children,
}: ButtonProps) {
  // 컴포넌트 구현
}
```

### 4. 컴포넌트 중복 확인

새 컴포넌트 생성 전 유사한 컴포넌트가 이미 존재하는지 확인합니다:

- `components` 디렉토리를 검색하여 중복 여부를 확인합니다.
- 유사한 기능의 컴포넌트가 있다면 확장하거나 재사용합니다.
- 팀원들과 협의하여 새 컴포넌트의 필요성을 확인합니다.

### 5. 타입 명시

컴포넌트와 props에 대한 타입을 명확하게 정의합니다:

**나쁜 예:**

```typescript
// 타입 정의 없이 컴포넌트 작성 (지양)
function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
```

**좋은 예:**

```typescript
// 명확한 타입 정의
interface UserCardProps {
  name: string;
  role: "admin" | "user" | "guest";
  avatar: string;
  isActive?: boolean;
}

function UserCard({ name, role, avatar, isActive = true }: UserCardProps) {
  return (
    <div className={`user-card ${isActive ? "active" : "inactive"}`}>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      {isActive && <span className="status">활성</span>}
    </div>
  );
}
```

### 6. 성능 최적화

컴포넌트 내부에서 불필요한 재선언과 재연산을 방지합니다:

- 컴포넌트 외부에서 상수를 선언합니다.
- 복잡한 계산은 `useMemo`로 메모이제이션합니다.
- 이벤트 핸들러는 `useCallback`으로 메모이제이션합니다.

**나쁜 예:**

```typescript
// 매 렌더링 시마다 객체와 함수가 재생성됨 (지양)
function ProductList({ products }) {
  const options = { sortBy: "price" }; // 렌더링마다 새 객체 생성

  const sortProducts = () => {
    return [...products].sort((a, b) => a.price - b.price);
  };

  const handleItemClick = (id) => {
    console.log(`제품 선택: ${id}`);
  };

  return (
    <div>
      {sortProducts().map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={handleItemClick}
          options={options}
        />
      ))}
    </div>
  );
}
```

**좋은 예:**

```typescript
// 필요한 훅 직접 import
import { useMemo, useCallback, memo } from "react";

// 컴포넌트 외부에 상수 선언
const DEFAULT_OPTIONS = { sortBy: "price" };

function ProductList({ products }) {
  // 복잡한 계산 메모이제이션
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);

  // 이벤트 핸들러 메모이제이션
  const handleItemClick = useCallback((id: string) => {
    console.log(`제품 선택: ${id}`);
  }, []);

  return (
    <div>
      {sortedProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onClick={handleItemClick}
          options={DEFAULT_OPTIONS}
        />
      ))}
    </div>
  );
}
```

## 비동기 문법 규칙

### 1. Promise 처리 방식

비동기 코드는 then/catch 체인 대신 async/await와 try/catch 문을 사용합니다:

- 코드 가독성과 디버깅 용이성을 높입니다.
- 중첩된 콜백을 방지하고 평평한 코드 구조를 유지합니다.

**나쁜 예:**

```typescript
// then/catch 체인 사용 (지양)
const fetchUserData = (userId: string) => {
  return fetchUser(userId)
    .then((user) => {
      return fetchUserPosts(user.id)
        .then((posts) => {
          return { user, posts };
        })
        .catch((error) => {
          console.error("포스트를 불러오는데 실패했습니다:", error);
          return { user, posts: [] };
        });
    })
    .catch((error) => {
      console.error("사용자를 불러오는데 실패했습니다:", error);
      throw error;
    });
};
```

**좋은 예:**

```typescript
const fetchUserData = async (userId: string) => {
  try {
    const user = await fetchUser(userId);
    let posts = [];

    try {
      posts = await fetchUserPosts(user.id);
    } catch (error) {
      console.error("포스트를 불러오는데 실패했습니다:", error);
      // 포스트 에러는 빈 배열로 처리하고 계속 진행
    }

    return { user, posts };
  } catch (error) {
    console.error("사용자를 불러오는데 실패했습니다:", error);
    throw error; // 사용자 정보 에러는 상위로 전파
  }
};
```

### 2. 에러 처리

비동기 작업은 항상 에러 처리를 포함해야 합니다:

- 모든 비동기 요청에 try/catch 블록을 사용합니다.
- 에러 유형에 따라 적절한 처리 로직을 구현합니다.
- 필요한 경우 에러를 상위 컴포넌트나 에러 핸들링 시스템으로 전파합니다.

**나쁜 예:**

```typescript
// 에러 처리가 없는 비동기 함수 (지양)
const fetchData = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data;
};
```

**좋은 예:**

```typescript
// 적절한 에러 처리가 포함된 비동기 함수
const fetchData = async (): Promise<Data | null> => {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    // 에러 타입에 따른 처리
    if (error instanceof TypeError) {
      // 네트워크 에러 처리
      showNetworkErrorToast();
    } else {
      // 기타 에러 처리
      showGenericErrorToast();
    }
    return null;
  }
};
```

## 파일 관리 규칙

### 1. 파일 중복 방지

새로운 파일을 생성하기 전에 중복 여부를 확인합니다:

- 이미지, 아이콘, 컴포넌트, 모듈 등의 중복 파일을 방지합니다.
- 프로젝트 디렉토리 구조를 정기적으로 검토하고 중복 파일을 정리합니다.

**나쁜 예:**

```
components/
  Button.tsx        // 공통 버튼 컴포넌트
  common/
    Button.tsx      // 위와 중복되는 컴포넌트

public/
  images/
    logo.svg        // 로고 이미지
    brand/
      logo.svg      // 동일한 로고 이미지의 중복
```

**좋은 예:**

```
components/
  common/
    button.tsx      // 한 곳에만 정의된 공통 버튼 컴포넌트

public/
  images/
    brand/
      logo.svg      // 명확한 경로에 한 번만 저장된 로고 이미지
```

### 2. 미사용 파일 관리

사용이 중단된 파일은 프로젝트에서 제거합니다:

- 코드 변경으로 더 이상 사용하지 않는 파일은 확인 후 삭제합니다.
- 정기적인 코드 검토 시 사용하지 않는 파일을 식별하고 제거합니다.
- 삭제하기 전에 해당 파일을 import하거나 참조하는 코드가 없는지 확인합니다.

**프로세스:**

1. 파일 사용 여부 확인: 코드 검색 도구를 사용하여 파일이 참조되는 곳이 있는지 확인
2. 임시 주석 처리: 확실하지 않은 경우, 일정 기간 동안 파일을 주석 처리하여 영향 확인
3. 삭제 결정: 참조가 없으며 사용하지 않는다고 확인된 파일은 삭제

## 명명 규칙

### 1. 케이스 스타일 규칙

프로젝트 전체에서 일관된 케이스 스타일을 사용합니다:

- **상수**: 스크리밍 스네이크 케이스 (SCREAMING_SNAKE_CASE)

  ```typescript
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = "https://api.example.com";
  const AUTH_TYPES = { SIGN_IN: "signIn", SIGN_UP: "signUp" } as const;
  ```

- **변수, 이벤트, 함수**: 카멜 케이스 (camelCase)

  ```typescript
  const isUserLoggedIn = true;
  const handleLoginSubmit = () => {
    /* ... */
  };
  function calculateTotalPrice(items) {
    /* ... */
  }
  ```

- **컴포넌트**: 파스칼 케이스 (PascalCase)

  ```typescript
  function UserProfile() {
    /* ... */
  }
  function NavigationMenu() {
    /* ... */
  }
  ```

- **파일명**: 카멜 케이스 (camelCase) 또는 용도에 맞는 케이스

  ```
  userService.ts       // 일반 모듈 파일
  pageUrl.config.ts    // 설정 파일
  LoginForm.tsx        // 컴포넌트 파일은 파스칼 케이스도 가능
  ```

- **HTML 요소 ID, 클래스명**: 케밥 케이스 (kebab-case)
  ```html
  <div id="user-profile-container" class="user-profile-card">
    <section class="profile-details-section">
      <!-- 내용 -->
    </section>
  </div>
  ```

### 2. 일관성 있는 명명 규칙

명명 규칙을 일관되게 적용합니다:

- 동일한 데이터나 기능에 대해 일관된 용어를 사용합니다.
- 복수형과 단수형을 적절하게 사용합니다 (배열은 복수형, 단일 항목은 단수형).
- 함수명은 동사로 시작하여 수행하는 작업을 명확히 표현합니다.

**나쁜 예:**

```typescript
// 일관성 없는 명명 (지양)
const getUsers = () => {
  /* ... */
};
const fetchPosts = () => {
  /* ... */
};
const retrieveData = () => {
  /* ... */
};

function UserItem({ user }) {
  /* ... */
}
function PostElement({ post }) {
  /* ... */
}
```

**좋은 예:**

```typescript
// 일관된 명명
const fetchUsers = () => {
  /* ... */
};
const fetchPosts = () => {
  /* ... */
};
const fetchData = () => {
  /* ... */
};

function UserItem({ user }) {
  /* ... */
}
function PostItem({ post }) {
  /* ... */
}
```

### 3. 데이터 구조 명명 규칙

데이터 구조에 대한 명명 규칙을 일관되게 적용합니다:

- **인터페이스**: 'I' 접두사 없이 명사나 형용사로 시작

  ```typescript
  // 나쁜 예
  interface IUser {
    /* ... */
  }

  // 좋은 예
  interface User {
    /* ... */
  }
  interface ApiResponse<T> {
    /* ... */
  }
  ```

- **타입**: 명확한 의미를 가진 이름 사용

  ```typescript
  type ButtonSize = "sm" | "md" | "lg";
  type ThemeMode = "light" | "dark" | "system";
  ```

- **제네릭**: 일관된 타입 파라미터 명명 사용

  ```typescript
  // 일반적인 타입 파라미터
  function identity<T>(value: T): T {
    return value;
  }

  // 데이터 타입이 명확한 경우 구체적인 이름 사용
  function fetchData<ResponseData>(): Promise<ResponseData> {
    /* ... */
  }
  ```

## 상태 관리 컨벤션

### 불변성 유지

상태 업데이트 시 불변성을 유지합니다:

- 객체나 배열을 직접 수정하지 않고 새 객체를 생성하여 업데이트
- 스프레드 연산자나 불변 라이브러리(Immer 등) 활용

```typescript
// 나쁜 예 - 상태 직접 수정
const handleUpdate = () => {
  const newItems = items;
  newItems.push({ id: Date.now(), text: "New Item" });
  setItems(newItems); // 참조가 변하지 않아 리렌더링이 발생하지 않을 수 있음
};

// 좋은 예 - 불변성 유지
const handleUpdate = () => {
  setItems([...items, { id: Date.now(), text: "New Item" }]);
};

// 좋은 예 - 복잡한 객체의 경우
const handleUpdateUser = () => {
  setUser({
    ...user,
    profile: {
      ...user.profile,
      avatar: newAvatarUrl,
    },
  });
};
```

```

```
