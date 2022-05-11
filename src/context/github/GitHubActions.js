const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const data = await (
    await fetch(`${GITHUB_URL}/search/users?${params}`)
  ).json()

  const { items } = data

  return items
}

export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const [user, repos] = await Promise.all([
    fetch(`${GITHUB_URL}/users/${login}`),
    fetch(`${GITHUB_URL}/users/${login}/repos?${params}`),
  ])

  if (user.status === 404) {
    window.location = '/notfound'
  } else {
    const userData = await user.json()
    const reposData = await repos.json()

    return { user: userData, repos: reposData }
  }
}

// Get initial users (testing purposes)
/*const fetchUsers = async () => {
    If you want to use authorization token
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    
    Another way to fetch data
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()
    
    setLoading()

    const data = await (await fetch(`${GITHUB_URL}/users`)).json()
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }
  
// Get single selected user
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`)

  if (response.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await response.json()

    return data
  }
}

// Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const data = await (
    await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)
  ).json()

  console.log(data)

  return data
}
*/
