export function formatCurrency( amount: number ) {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedNumber = numberFormat.format( amount );
  return `S/ ${ formattedNumber }`;
}

export function formatCategoryName( slug: string ) {
  const words = slug.split('-').map( word => word.charAt(0).toUpperCase() + word.slice(1) );
  return words.join(' ');
}

export const getSpicyLevelText = ( spicyLevelNumber: number ): string => {
  switch ( spicyLevelNumber ) {
    case 0:
      return 'Sin Picante'
    case 1:
      return 'Picante Bajo'
    case 2:
      return 'Picante Normal'
    case 3:
      return 'Picante Alto'
    default:
      return ''
  }
}


export const createNotificationSound = () => {
  return new Audio('/assets/notification.mp3')
}