1. 基础读权限（用户）
{
    "resourceId": "doc123",
    "resourceType": 1,
    "targetType": 1,
    "targetId": "user123",
    "permissionLevel": 1
}
2. 读写权限（角色）
{
    "resourceId": "doc456",
    "resourceType": 1,
    "targetType": 2,
    "targetId": "role789",
    "permissionLevel": 2
}
3. 自定义权限
{
    "resourceId": "doc999",
    "resourceType": 1,
    "targetType": 1,
    "targetId": "user888",
    "permissionLevel": 4,
    "permissionIds": [1, 2, 3]
}
4. 配置集权限
{
    "resourceId": "doc777",
    "resourceType": 1,
    "targetType": 4,
    "permissionLevel": 5,
    "permissionIds": [1, 2, 3],
    "configurationRuleName": "Finance Department Access Rule",
    "members": [
        {
            "memberType": 1,        // 1=User, 2=Group, 3=Role
            "memberId": "user001",
            "operator": 1           // 1=Allow, 2=Deny
        },
        {
            "memberType": 2,
            "memberId": "group002",
            "operator": 1
        }
    ],
    "rules": [
        {
            "operator": "AND",
            "rules": [
                {
                    "attributeType": 1,     // 1=Department
                    "attributeName": "department",
                    "operator": "=",
                    "attributeValue": "Finance"
                },
                {
                    "attributeType": 2,     // 2=Position
                    "attributeName": "position",
                    "operator": "IN",
                    "attributeValue": "['Manager', 'Supervisor']"
                }
            ]
        }
    ]
}
