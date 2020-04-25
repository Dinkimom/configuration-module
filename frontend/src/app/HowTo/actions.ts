export const HOW_TO_OPEN = 'HOW_TO_OPEN'
export const HOW_TO_CLOSE = 'HOW_TO_CLOSE_MODAL'

export const howToActions = {
  open: () => ({
    type: HOW_TO_OPEN,
  }),

  close: () => ({
    type: HOW_TO_CLOSE,
  }),
}
