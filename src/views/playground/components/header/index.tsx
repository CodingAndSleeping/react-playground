import reactLogo from '@/assets/svg/react.svg'
import { useContext } from 'react'
import { PlaygroundContext } from '../../playgroundContext'
import SvgIcon from '@/components/svgIcon'
function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext)

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href) // 将文本写入剪贴板
      alert('Sharable URL has been copied to clipboard.')
    } catch (error) {
      console.error('复制失败:', error)
    }
  }

  const viewOnGithub = () => {
    window.open(
      'https://github.com/CodingAndSleeping/react-playground',
      '_blank'
    )
  }

  return (
    <div className='h-[50px] border-b-[1px] border-[var(--border-color)] flex justify-between items-center text-[var(--text)] bg-[var(--bg-color)]'>
      <div className='w-[15rem] flex items-center'>
        <img className='mx-[0.5rem]' src={reactLogo} alt='React Logo' />
        <span>React Playground</span>
      </div>

      <div className='flex items-center'>
        <div
          className='mr-[1rem] cursor-pointer'
          title={
            theme === 'light' ? 'Change to Dark Theme' : 'Change to Light Theme'
          }
          onClick={handleChangeTheme}
        >
          {theme === 'light' ? (
            <SvgIcon name='moon' size='1.5rem'></SvgIcon>
          ) : (
            <SvgIcon name='sun' size='1.5rem'></SvgIcon>
          )}
        </div>
        <div
          className='mr-[1rem] cursor-pointer'
          title='Copy Sharable URL'
          onClick={copyLink}
        >
          <SvgIcon name='share' size='1.5rem'></SvgIcon>
        </div>

        <div
          className='mr-[1rem] cursor-pointer'
          title='View on Github'
          onClick={viewOnGithub}
        >
          <SvgIcon name='github' size='1.5rem'></SvgIcon>
        </div>
      </div>
    </div>
  )
}

export default Header
