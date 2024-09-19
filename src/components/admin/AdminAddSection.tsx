import { Button } from '@/components'
import { Color, Size, Variant } from '@/interfaces'

interface Props {
  buttonText: string
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
  emptyText: string
  empty: boolean
}

export const AdminAddSection = ({ buttonText, onClick, emptyText, empty }: Props) => {

  return (
    <div className={`${ empty ? "" : "mt-8" }`}>
      <Button
        text={ buttonText }
        color={ Color.ACCENT }
        variant={ Variant.GHOST }
        size={ Size.SM }
        iconName='plus-small'
        onClick={ onClick }
      />
      {
        empty && (
          <div className='mt-4 flex items-center gap-2 text-gray500'>
            <i className="fi fi-rr-empty-set"></i>
            <span>{ emptyText }</span>
          </div>
        )
      }
    </div>
  )
}
