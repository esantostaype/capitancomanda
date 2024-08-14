import { Button } from '@/components'
import { Color, Size, Variant } from '@/interfaces'

type Props = {
  buttonText: string
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement | HTMLAnchorElement>
  emptyText: string
  isAuthor: boolean
  empty: boolean
}

export const AddSection = ({ buttonText, onClick, emptyText, isAuthor, empty }: Props) => {

  return (
    <div className={`${ empty ? "" : "mt-8" }`}>
      {
        isAuthor &&
        <Button
          text={ buttonText }
          color={ Color.ACCENT }
          variant={ Variant.GHOST }
          size={ Size.SMALL }
          iconName='plus-small'
          onClick={ onClick }
        />
      }
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
