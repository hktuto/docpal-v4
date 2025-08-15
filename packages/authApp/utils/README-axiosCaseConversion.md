# Automatic Case Conversion in Axios Response Helper

The `axiosResponseHelper.ts` now includes automatic case conversion that normalizes all API responses from snake_case to camelCase. This happens transparently at the axios interceptor level, so all your existing API calls will automatically benefit from this feature.

## How It Works

The `responseSuccessHelper` function now automatically:
1. Detects if the response contains snake_case keys
2. Converts them to camelCase if found
3. Preserves camelCase keys as-is
4. Handles nested objects and arrays
5. Processes error responses as well

## Benefits

✅ **Zero Code Changes Required** - All existing API calls automatically work  
✅ **Automatic Detection** - Only converts when snake_case is detected  
✅ **Performance Optimized** - Minimal overhead for camelCase responses  
✅ **Nested Object Support** - Handles complex data structures  
✅ **Error Response Support** - Converts error messages too  
✅ **Optional Skip** - Can disable conversion when needed  

## Usage Examples

### Normal API Calls (Automatic Conversion)

```typescript
import { clientApi } from 'api'

// Before: API returns { user_id: 123, user_name: 'john' }
// After: You get { userId: 123, userName: 'john' }
const { data } = await clientApi.api.getUser(123)
console.log(data.userId) // Works! (was user_id)
console.log(data.userName) // Works! (was user_name)
```

### Nested Objects

```typescript
// API returns:
// {
//   user_id: 123,
//   profile_data: {
//     first_name: 'John',
//     contact_info: { email_address: 'john@example.com' }
//   }
// }

// You get:
// {
//   userId: 123,
//   profileData: {
//     firstName: 'John',
//     contactInfo: { emailAddress: 'john@example.com' }
//   }
// }

const { data } = await clientApi.api.getUserProfile(123)
console.log(data.profileData.firstName) // Works!
console.log(data.profileData.contactInfo.emailAddress) // Works!
```

### Arrays

```typescript
// API returns:
// {
//   user_list: [
//     { user_id: 1, user_name: 'john' },
//     { user_id: 2, user_name: 'jane' }
//   ]
// }

// You get:
// {
//   userList: [
//     { userId: 1, userName: 'john' },
//     { userId: 2, userName: 'jane' }
//   ]
// }

const { data } = await clientApi.api.getUserList()
data.userList.forEach(user => {
  console.log(user.userId, user.userName) // Works!
})
```

### Skip Case Conversion (When Needed)

```typescript
import { skipCaseConversion } from '~/utils/axiosResponseHelper'

// Get original format without conversion
const { data } = await clientApi.api.getRawData(123, skipCaseConversion())
console.log(data.user_id) // Original snake_case format
console.log(data.user_name) // Original snake_case format
```

## Real-World Integration

### With Your Existing Components

```typescript
// Your existing component - no changes needed!
export const useUserData = () => {
  const userData = ref(null)
  const loading = ref(false)
  
  const fetchUser = async (userId: number) => {
    loading.value = true
    try {
      // Automatic conversion happens here!
      const { data } = await clientApi.api.getUser(userId)
      userData.value = data
    } catch (error) {
      console.error('Failed to fetch user:', error)
    } finally {
      loading.value = false
    }
  }
  
  return { userData: readonly(userData), loading: readonly(loading), fetchUser }
}
```

### With Table Components

```typescript
// Your existing table logic - works automatically!
export const useTableData = () => {
  const tableData = ref([])
  const total = ref(0)
  
  const loadTableData = async (params: any) => {
    try {
      const { data } = await clientApi.api.getTableData(params)
      
      // Works with both formats automatically
      tableData.value = data.items || data.itemList || []
      total.value = data.total || data.totalCount || 0
    } catch (error) {
      console.error('Failed to load table data:', error)
    }
  }
  
  return { tableData: readonly(tableData), total: readonly(total), loadTableData }
}
```

## Error Handling

Error responses are also automatically converted:

```typescript
try {
  await clientApi.api.getNonExistentData()
} catch (error: any) {
  // Error response data is also converted
  console.log(error.response?.data?.errorMessage) // Works! (was error_message)
}
```

## Mixed Case Scenarios

The system handles mixed case responses intelligently:

```typescript
// API returns mixed case:
// {
//   user_id: 123,        // snake_case
//   userName: 'john',    // camelCase
//   created_at: '2024-01-01', // snake_case
//   updatedAt: '2024-01-02'   // camelCase
// }

// Result:
// {
//   userId: 123,         // converted from user_id
//   userName: 'john',    // kept as is
//   createdAt: '2024-01-01', // converted from created_at
//   updatedAt: '2024-01-02'  // kept as is
// }
```

## Performance Considerations

- **Minimal Overhead**: Only processes objects that contain snake_case keys
- **CamelCase Responses**: Pass through without any processing
- **Caching**: Consider caching normalized responses for frequently accessed data
- **Large Objects**: The conversion is optimized but consider the impact for very large responses

## Migration Guide

### For Existing Code

**No changes required!** All your existing API calls will automatically work with camelCase properties.

### For New Code

Write your code expecting camelCase properties:

```typescript
// ✅ Good - Write for camelCase
const { data } = await clientApi.api.getUser(123)
console.log(data.userId, data.userName, data.createdAt)

// ❌ Avoid - Don't write for snake_case
const { data } = await clientApi.api.getUser(123)
console.log(data.user_id, data.user_name, data.created_at)
```

### When You Need Original Format

Use the skip option:

```typescript
import { skipCaseConversion } from '~/utils/axiosResponseHelper'

const { data } = await clientApi.api.getRawData(123, skipCaseConversion())
// data will be in original format
```

## Troubleshooting

### If Case Conversion Isn't Working

1. **Check if the API is using the axios interceptor**: Make sure your API calls go through the configured axios instance
2. **Verify snake_case detection**: The conversion only happens when snake_case keys are detected
3. **Check for skipCaseConversion header**: Make sure you're not accidentally skipping conversion

### Debug Mode

You can temporarily add logging to see what's happening:

```typescript
// In axiosResponseHelper.ts, add this to responseSuccessHelper:
console.log('Original response:', response.data)
console.log('Converted response:', normalizeApiResponse(response.data))
```

## TypeScript Support

The conversion works with TypeScript, but you may need to update your type definitions to expect camelCase properties:

```typescript
interface User {
  userId: number      // instead of user_id
  userName: string    // instead of user_name
  createdAt: string   // instead of created_at
}

const { data } = await clientApi.api.getUser(123)
const user: User = data // TypeScript will work correctly
```
