import React, { useEffect, useState } from 'react'
import { Image, Segment } from 'semantic-ui-react'
import { sizes } from '../../shared/constants/sizes'
import { ConfigurationElements } from '../../shared/enums/ConfigurationElements'
import { useFieldValue } from '../../shared/hooks/useFieldValue'
import { IBaseElementProps } from '../../shared/types/IBaseElementProps'
import { IOption } from '../../shared/types/IOption'
import { ConnectedElement } from './ConnectedElement'

interface ISelectableImageProps extends IBaseElementProps {
  options: IOption[]
}

export const SelectableImage = ({
  name,
  options,
  common,
  optional,
  size,
  ...other
}: ISelectableImageProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [src, setSrc] = useState<string>('')

  const initialParams = {
    Image: {
      type: ConfigurationElements.select,
      options: options.map(item => ({
        ...item,
        image: { src: item.value },
      })),
    },
  }

  const params = useFieldValue(name, initialParams, common)

  const newSrc = params['Image'].value

  useEffect(() => {
    if (newSrc !== src) {
      setLoading(true)
      setSrc(newSrc)
    }
  }, [newSrc, src])

  return (
    <ConnectedElement
      name={name}
      optional={optional}
      params={initialParams}
      common={common}
      size={size}
    >
      <Segment
        className='selectable-image-container'
        loading={loading}
        basic={true}
        compact={true}
      >
        {src && (
          <Image
            src={src}
            {...other}
            size={
              size === 'editable'
                ? (params['Size'] || {}).value || sizes[0].value
                : size
            }
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            style={{ opacity: loading ? '0' : '1' }}
          />
        )}
      </Segment>
    </ConnectedElement>
  )
}
