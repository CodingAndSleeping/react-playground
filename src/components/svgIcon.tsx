interface SvgIconProps {
  name: string
  color?: string
  size?: number | string
}

function SvgIcon(props: SvgIconProps) {
  const { name, color = '#000', size = '1rem' } = props

  return (
    <svg
      style={{
        fill: color,
        width: size,
        height: size,
        position: 'relative',
      }}
      aria-hidden='true'
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  )
}

export default SvgIcon
