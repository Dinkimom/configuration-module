import React from 'react'
import { Image, ImageProps } from 'semantic-ui-react'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { IOption } from '../../shared/types/IOption'
import { ConnectedElement } from './ConnectedElement'

interface ISelectableImageProps extends IBaseElementProps, ImageProps {
  options: IOption[]
}

export const SelectableImage = ({
  name,
  options,
  common,
  ...other
}: ISelectableImageProps) => (
  <ConnectedElement
    name={name}
    common={common}
    type={ConfigurationElements.select}
    options={options}
  >
    <Image src={useFieldValue(name, common)} {...other} />
  </ConnectedElement>
)
