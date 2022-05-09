const About = () => {
  return (
    <div>
      <h1 className='text-6xl mb-4'>GitHub Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details.
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Made By:&nbsp;
        <a
          className='text-white'
          target='_blank'
          rel='noreferrer'
          href='https://github.com/edobusy'
        >
          Edoardo Busano
        </a>
      </p>
    </div>
  )
}

export default About
