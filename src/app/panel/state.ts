export interface IPanelState {
    currentPage: null | string
    pages: {
        [key: string]: {
            [key: string]: {
                value: string
                type: string
            }
        }
    }
}
