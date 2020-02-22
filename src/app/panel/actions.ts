export const PANEL_INIT_COMPONENT = 'PANEL_INIT_COMPONENT';

export const panelActions = {
    initComponent: (payload: { name: string, type: string }) => ({
        type: PANEL_INIT_COMPONENT,
        payload
    })
}