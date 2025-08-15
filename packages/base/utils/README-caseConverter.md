# Case Converter Utilities

This utility provides functions to handle API responses that may return objects in either snake_case or camelCase format. It automatically detects and converts between the two formats to ensure consistent data handling throughout your application.

## Quick Start

```typescript
import { normalizeApiResponse } from '~/utils/caseConverter'

// Your API response (could be snake_case or camelCase)
const apiResponse = {
  user_id: 123,
  user_name: 'john_doe',
  created_at: '2024-01-01'
}

// Automatically converts to camelCase
const normalized = normalizeApiResponse(apiResponse)
// Result: { userId: 123, userName: 'john_doe', createdAt: '2024-01-01' }
```

## Available Functions

### Basic String Conversion

- `toCamelCase(str: string)` - Converts snake_case to camelCase
- `toSnakeCase(str: string)` - Converts camelCase to snake_case

### Object Conversion

- `convertKeysToCamelCase(obj: any)` - Converts all object keys to camelCase
- `convertKeysToSnakeCase(obj: any)` - Converts all object keys to snake_case
- `normalizeApiResponse(obj: any)` - Automatically detects and converts to camelCase

### Type Guards

- `hasSnakeCaseKeys(obj: any)` - Checks if object has snake_case keys
- `hasCamelCaseKeys(obj: any)` - Checks if object has camelCase keys

### Advanced Utilities

- `handleApiResponse(response, options)` - Configurable response handler
- `withCamelCaseResponse(apiFunction)` - Wraps API function for automatic conversion
- `createCaseAwareApi(apiObject)` - Creates case-aware API wrapper

## Usage Examples

### 1. Basic API Response Normalization

```typescript
import { normalizeApiResponse } from '~/utils/caseConverter'

async function fetchUserData() {
  const response = await fetch('/api/users/123')
  const data = await response.json()
  
  // Automatically handles both snake_case and camelCase
  return normalizeApiResponse(data)
}
```

### 2. Integration with Existing API Structure

```typescript
import { clientApi } from 'api'
import { withCamelCaseResponse } from '~/utils/apiCaseConverter'

// Wrap specific API calls
const getUserData = withCamelCaseResponse(clientApi.api.getUserData)

// Use the wrapped function
const userData = await getUserData(123)
// Response is automatically normalized to camelCase
```

### 3. Full API Wrapper

```typescript
import { clientApi } from 'api'
import { createCaseAwareApi } from '~/utils/apiCaseConverter'

// Create a case-aware version of your entire API
const normalizedClientApi = createCaseAwareApi(clientApi.api)

// All API calls now automatically handle case conversion
const userData = await normalizedClientApi.getUserData(123)
const newUser = await normalizedClientApi.createUser({ firstName: 'John', lastName: 'Doe' })
```

### 4. Manual Conversion

```typescript
import { convertKeysToCamelCase, convertKeysToSnakeCase } from '~/utils/caseConverter'

// Convert to camelCase
const camelCaseData = convertKeysToCamelCase({
  user_id: 123,
  profile_data: { first_name: 'John' }
})

// Convert to snake_case
const snakeCaseData = convertKeysToSnakeCase({
  userId: 123,
  profileData: { firstName: 'John' }
})
```

### 5. Handling Nested Objects and Arrays

The utilities automatically handle:
- Nested objects
- Arrays of objects
- Mixed case scenarios

```typescript
const complexResponse = {
  user_list: [
    { user_id: 1, user_name: 'john' },
    { user_id: 2, user_name: 'jane' }
  ],
  meta_data: {
    total_count: 2,
    page_info: { current_page: 1, page_size: 10 }
  }
}

const normalized = normalizeApiResponse(complexResponse)
// Result:
// {
//   userList: [
//     { userId: 1, userName: 'john' },
//     { userId: 2, userName: 'jane' }
//   ],
//   metaData: {
//     totalCount: 2,
//     pageInfo: { currentPage: 1, pageSize: 10 }
//   }
// }
```

## Best Practices

### 1. Use Automatic Detection for Unknown APIs

When you're not sure about the API response format:

```typescript
const response = await someApiCall()
const normalized = normalizeApiResponse(response)
```

### 2. Wrap API Functions for Consistency

For APIs you control or frequently use:

```typescript
const normalizedApi = createCaseAwareApi(originalApi)
```

### 3. Handle Errors Gracefully

```typescript
try {
  const response = await apiCall()
  const normalized = normalizeApiResponse(response)
  return normalized
} catch (error) {
  console.error('API call failed:', error)
  throw error
}
```

### 4. Use Type Guards for Conditional Logic

```typescript
import { hasSnakeCaseKeys } from '~/utils/caseConverter'

if (hasSnakeCaseKeys(response)) {
  // Handle snake_case response
  return convertKeysToCamelCase(response)
} else {
  // Response is already in desired format
  return response
}
```

## Integration with Your Project

### Option 1: Manual Usage (Recommended for existing code)

Import and use the utilities where needed:

```typescript
import { normalizeApiResponse } from '~/utils/caseConverter'

// In your existing API calls
const { data } = await clientApi.api.someEndpoint()
const normalizedData = normalizeApiResponse(data)
```

### Option 2: API Wrapper (Recommended for new code)

Create a wrapper for your API:

```typescript
// utils/apiWrapper.ts
import { clientApi } from 'api'
import { createCaseAwareApi } from '~/utils/apiCaseConverter'

export const normalizedClientApi = createCaseAwareApi(clientApi.api)
```

### Option 3: Global Integration

Modify your API configuration to automatically handle case conversion:

```typescript
// In your API configuration
import { withCamelCaseResponse } from '~/utils/apiCaseConverter'

// Wrap your API client
const apiClient = withCamelCaseResponse(originalApiClient)
```

## Performance Considerations

- The utilities are optimized for common use cases
- For large objects, consider using the utilities only when needed
- The automatic detection adds minimal overhead
- Consider caching normalized responses for frequently accessed data

## TypeScript Support

All functions include TypeScript types and generics for better type safety:

```typescript
interface User {
  userId: number
  userName: string
  createdAt: string
}

const response: any = { user_id: 123, user_name: 'john', created_at: '2024-01-01' }
const normalized: User = normalizeApiResponse<User>(response)
```
