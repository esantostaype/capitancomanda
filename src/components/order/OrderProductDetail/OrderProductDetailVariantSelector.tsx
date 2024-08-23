import { ProductVariation } from '@/interfaces'
import { OrderProductDetailVariant } from './OrderProductDetailVariant'

type VariantSelectorProps = {
  variations: ProductVariation[]
  selectedVariants: Record<string, string>
  handleVariantChange: ( variationName: string, option: string ) => void
}

export const OrderProductDetailVariantSelector = ({ variations, selectedVariants, handleVariantChange }: VariantSelectorProps) => {
  return (
    <>
      { variations.map((variation, index) => {
        const selectedOption = selectedVariants[variation.name]
        return (
          <OrderProductDetailVariant
            key={index}
            variation={variation}
            onClick={(option) => handleVariantChange( variation.name, option )}
            selectedOption={ selectedOption }
          />
        )
      })}
    </>
  )
}
