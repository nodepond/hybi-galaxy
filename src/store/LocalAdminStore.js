// This is used as connection store for connecting to the "stage cam"
import create from 'zustand'
// import produce, { current } from 'immer'

export const useLocalAdminStore = create((set, get) => {
  const toggleStageView = () => {
    set({ embeddedStageView: !get().embeddedStageView })
  }

  return {
    toggleStageView,
    embeddedStageView: true
  }
})
