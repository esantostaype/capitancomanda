import React, { forwardRef, Ref } from 'react'
import { TextField as OriginalTextField, TextFieldProps } from '@/components'

export const TextFieldWithRef = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => <OriginalTextField innerRef={ref} {...props} />
)

TextFieldWithRef.displayName = 'TextFieldWithRef'
