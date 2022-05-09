import { createContext, useReducer } from 'react'
import githubReducer from './GitHubReducer'

const GitHubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get initial users (testing purposes)
  const fetchUsers = async () => {
    /* If you want to use authorization token
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    */
    /* Another way to fetch data
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()
    */
    setLoading()

    const data = await (await fetch(`${GITHUB_URL}/users`)).json()
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  // Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const data = await (
      await fetch(`${GITHUB_URL}/search/users?${params}`)
    ).json()

    const { items } = data

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  // Get single selected user
  const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`)

    if (response.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
