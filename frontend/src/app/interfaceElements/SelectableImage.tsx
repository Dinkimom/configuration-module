import React, { useState, useEffect } from 'react'
import { Image, ImageProps, Segment } from 'semantic-ui-react'
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
  optional,
  ...other
}: ISelectableImageProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [src, setSrc] = useState<string>('')

  const initialParams = {
    Image: {
      type: ConfigurationElements.select,
      options: options.map((item) => ({
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
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            style={{ opacity: loading ? '0' : '1' }}
          />
        )}
      </Segment>
    </ConnectedElement>
  )
}
