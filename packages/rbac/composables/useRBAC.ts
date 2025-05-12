
type User = {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
}

export const useUserList = () => useState<User[]>('userList', () => ([
]))

type Role = {
  label: string,
  category?: string,
  child: Role[]
}


export const useRoleList = () => useState<Role[]>('userRole', () => ([]))


export const useRBAC = () => {

  const roles = useRoleList()
  const users = useUserList()

  const flatRole = useState<string[]>('flatRole', () => ([]))

  function init(){
    const localRole = localStorage.getItem('demo_role')
    if(localRole){
      roles.value = JSON.parse(localRole)
    }else{
      seedRole()
    }
    const localUser = localStorage.getItem('demo_user')
    if(localUser){
      users.value = JSON.parse(localUser)
    }else{
      seedUser()
    }
    flatRole.value = flatMap(roles.value)
    save();
  }

  

  function save(){
    localStorage.setItem('demo_role', JSON.stringify(roles.value))
    localStorage.setItem('demo_user', JSON.stringify(users.value))
  }

  return {
    save,
    init,
    flatRole
  }

}

function flatMap (arr: any[])  {
  return arr.reduce((acc, item) => {
    acc.push(item.label)
    if (item.child) {
      acc = acc.concat(flatMap(item.child))
    }
    return acc
  }, [])
}


export const seedUser = async () => {
  const roles = useRoleList()
  const users = useUserList()
  // create flat roles
  const roleList = flatMap(roles.value)
  // get user from fake api
  const userList = await fetch('https://jsonplaceholder.typicode.com/users',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  
  const roleLength = roleList.length
  users.value = userList.map((user) =>{
    const role = roleList[Math.floor(Math.random() * roleLength)]
    return {
      username: user.username,
      firstName : user.name.split(' ')[0],
      lastName : user.name.split(' ')[1],
      email: user.email,
      role: role,
    }
  }) as User[]
}


export const seedRole = () => {
  const roles = useRoleList()
  const roleList: Role[] = [
    {
      label: "CEO",
      child: [
        {
          label: "Managing Director",
          child:[
            {
              label: "Advisor",
              child:[]
            },
            {
              label: "Assistant MD",
              child:[
                {
                  label:"Marketing Director",
                  child:[
                    {
                      label: "Marketing Manager",
                      child:[
                        {
                          label: "Marketing Analyst",
                          child:[]
                        },
                        {
                          label: "Marketing Planner",
                          child:[]
                        },
                        {
                          label: 'clerk',
                          child:[]
                        }
                      ]
                    }
                  ]
                },
                {
                  label:"Finance Director",
                  child:[
                    {
                      label: "Manager",
                      child:[
                        {
                          label: "Analyst",
                          child:[]
                        },
                        {
                          label: "Planner",
                          child:[]
                        },
                        {
                          label:'clerk',
                          child:[]
                        }
                      ]
                    }
                  ]
                },
                {
                  label:"HR Director",
                  child:[
                    {
                      label: "Manager",
                      child:[
                        {
                          label: "Talent Acquisitio",
                          child:[]
                        },
                        {
                          label: "Compensation & Benefits",
                          child:[]
                        },
                        {
                          label:'Operatior',
                          child:[]
                        }
                      ]
                    }
                  ]
                },
              ]
            }
          ]
        }
      ]
    }
  ]
  roles.value = roleList
}
