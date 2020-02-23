import { useContext } from 'react'
import { PageContext } from '../../app/interfaceComponents/Page'

export const usePageContext = (): string => {
    const { page } = useContext(PageContext)

    return page
}
