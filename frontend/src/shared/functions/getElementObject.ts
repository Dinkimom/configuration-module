import { IConfigurationElement } from '../types/IConfigurationElement'

export const getElementObject = (
  type: IConfigurationElement,
): {
  defaultValue: any
  options?: { text: string; value: string; icon?: string }[]
  getValue?: (fieldValue: any, ...args: any) => any
} => {
  switch (type) {
    case 'arrowButton':
      return {
        defaultValue: '0',
        options: [
          { text: 'Simple arrow', value: '0', icon: 'arrow left' },
          { text: 'Circle arrow', value: '1', icon: 'arrow circle left' },
          { text: 'Angle arrow', value: '2', icon: 'angle left' },
        ],
        getValue: (fieldValue: string, direction: 'left' | 'right') => {
          switch (fieldValue) {
            case '0':
              return `arrow ${direction}`

            case '1':
              return `arrow circle ${direction}`

            case '2':
              return `angle ${direction}`
          }

          return null
        },
      }
    case 'retryButton':
      return {
        defaultValue: '0',
        options: [
          { text: 'Simple retry', value: '0', icon: 'undo' },
          { text: 'Alternate retry', value: '1', icon: 'undo alternate' },
          { text: 'Circled retry', value: '2', icon: 'sync' },
          {
            text: 'Alternate circled retry',
            value: '3',
            icon: 'sync alternate',
          },
        ],
        getValue: fieldValue => {
          switch (fieldValue) {
            case '0':
              return `undo`

            case '1':
              return `undo alternate`

            case '2':
              return `sync`

            case '3':
              return `sync alternate`
          }
        },
      }
    case 'optional':
      return {
        defaultValue: false,
      }
  }
}
