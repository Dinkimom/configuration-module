export interface IPanelState {
    [key: string]: {
        [key: string]: {
            value: string;
            type: string;
        }
    }
}