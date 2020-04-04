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
  ...other
}: ISelectableImageProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [src, setSrc] = useState<string>('')
  const newSrc = useFieldValue(name, common)
  useEffect(() => {
    if (newSrc !== src) {
      setLoading(true)
      setSrc(newSrc)
    }
  }, [newSrc, src])

  return (
    <ConnectedElement
      name={name}
      common={common}
      type={ConfigurationElements.select}
      options={options}
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
