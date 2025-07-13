import create from "zustand";

const initialState = {
  showNavbar: true,
  userData: {},
  Token: "",
  RazorPayOrder: "",
  dropdown: "",
  shouldAnimate: false,
  prevItemName: null,
  NoOfRecords: 20,
  showAccessDenied: false,
  ActiveTab: "",
  NotificationCount: 0,
  Notifications_store: { expiry: null, data: [] },
};
const useStore = create((set) => ({
  ...initialState,
  setshowNavbar: (auth) =>
    set((state) => ({ ...state, showNavbar: !state.showNavbar })),
  setNotificationCount: (Count) =>
    set((state) => ({ ...state, NotificationCount: Count })),
  setShowAccessDenied: (status) =>
    set((state) => ({ ...state, showAccessDenied: status })),
  setActiveTab: (Active) => set((state) => ({ ...state, ActiveTab: Active })),
  setNotifications: (Active) =>
    set((state) => ({ ...state, Notifications_store: Active })),

  setUserData: (data) => set((state) => ({ ...state, userData: data })),
  setDropdown: (data) => set((state) => ({ ...state, dropdown: data })),
  setToken: (data) => set((state) => ({ ...state, Token: data })),
  setShouldAnimate: (data) =>
    set((state) => ({ ...state, shouldAnimate: data })),
  setPrevItemName: (data) =>
    set((state) => ({ ...state, setPrevItemName: data })),
}));
export default useStore;
