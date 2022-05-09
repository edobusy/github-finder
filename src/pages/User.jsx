import { useEffect, useState, useContext } from 'react'
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import GitHubContext from '../context/github/GitHubContext'
import { useParams } from 'react-router-dom'
import { isCursorAtStart } from '@testing-library/user-event/dist/utils'

const User = () => {
  const { user, loading, getUser } = useContext(GitHubContext)

  const [starting, setStarting] = useState(true)

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
    setStarting(false)
  }, [])

  if (loading) {
    return <Spinner />
  } else if (starting) {
    return <Spinner />
  } else {
    return (
      <>
        <div className='w-full mx-auto lg:w-10/12'>
          <div className='mb-4'>
            <Link to='/' className='btn btn-ghost'>
              Back To Search
            </Link>
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
            <div className='custom-card-image mb-6 md:mb-0'>
              <div className='rounded-lg shadow-xl card image-full'>
                <figure>
                  <img src={avatar_url} alt='Profile Image' />
                </figure>
                <div className='card-body justify-end'>
                  <h2 className='card-title mb-0 text-white font-bold'>
                    {name}
                  </h2>
                  <p className='flex-grow-0 text-white font-bold'>{login}</p>
                </div>
              </div>
            </div>

            <div className='col-span-2'>
              <div className='mb-6'>
                <h1 className='text-3xl card-title'>
                  {name}
                  <div className='ml-2 mr-1 badge badge-success'>{type}</div>
                  {hireable && (
                    <div className='mx-1 badge badge-info'>Hireable</div>
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default User
