import { OrderStatus, UserStatus } from '@/interfaces'

interface Props {
  label: string
  mode: OrderStatus | UserStatus
}

export const AdminStatus = ({ label, mode }: Props) => {

  let colorClass = ""

  switch ( mode ) {
    case OrderStatus.DONE:
    case UserStatus.ACTIVE:
      colorClass = "bg-success"
      break
    case OrderStatus.RECEIVED:
    case UserStatus.NOT_VERIFIED:
      colorClass = "bg-warning"
      break
    case OrderStatus.IN_PREPARATION:
    case UserStatus.VERIFIED:
      colorClass = "bg-info"
      break
    case OrderStatus.READY:
      colorClass = "bg-success"
      break
    case OrderStatus.CANCELED:
    case UserStatus.INACTIVE:
      colorClass = "bg-error"
      break
    default:
      colorClass = "bg-gray200"
      break
  }

  return (
    <div className="flex uppercase text-xs text-gray600">
      <div className="flex items-center gap-1 px-2 py-1 rounded border border-gray100">
        <div className={`rounded h-2 w-2 ${ colorClass }`}></div>
        <div>{ label }</div>
      </div>
    </div>
  )
}
