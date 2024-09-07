type RestaurantTableProps = {
  fill?: string
  className?: string
  width?: string
  height?: string
}

export const RestaurantTable = ({ fill, className, width, height }: RestaurantTableProps ) => {
  return (
    <svg aria-hidden="true" className={ className } viewBox="0 0 96 96" fill={ fill } width={ width } height={ height }>
      <path d="M77,19c16,16,16,42,0,58s-42,16-58,0S3,35,19,19S61,3,77,19z M26.5,2.9l-2.3-2.3c-0.6-0.6-1.6-0.6-2.3,0L0.6,21.9 c-0.6,0.6-0.6,1.6,0,2.3l2.3,2.3c0.6,0.6,1.6,0.6,2.3,0L26.5,5.2C27.1,4.5,27.1,3.5,26.5,2.9z M95.4,71.8l-2.3-2.3 c-0.6-0.6-1.6-0.6-2.3,0L69.5,90.8c-0.6,0.6-0.6,1.6,0,2.3l2.3,2.3c0.6,0.6,1.6,0.6,2.3,0l21.3-21.3C96,73.4,96,72.4,95.4,71.8z M2.9,69.5l-2.3,2.3c-0.6,0.6-0.6,1.6,0,2.3l21.3,21.3c0.6,0.6,1.6,0.6,2.3,0l2.3-2.3c0.6-0.6,0.6-1.6,0-2.3L5.2,69.5 C4.5,68.9,3.5,68.9,2.9,69.5z M71.8,0.6l-2.3,2.3c-0.6,0.6-0.6,1.6,0,2.3l21.3,21.3c0.6,0.6,1.6,0.6,2.3,0l2.3-2.3 c0.6-0.6,0.6-1.6,0-2.3L74.1,0.6C73.4,0,72.4,0,71.8,0.6z"/>
    </svg>
  )
}