import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageName: '',
  SideBarListItem: [],
  personDetails: {},
  InfoBoxToShow: false,
  organizationId: '',
  sideBarDrawerList: [],
  pageNameHeader: 'Page heading',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setSideBarListItem: (state, action) => {
      state.SideBarListItem = action.payload;
    },
    setPersonDetails: (state, action) => {
      state.personDetails = action.payload;
    },
    setInfoBoxToShow: (state, action) => {
      state.InfoBoxToShow = action.payload;
    },
    setOrganizationId: (state, action) => {
      state.organizationId = action.payload;
    },
    setPageNameHeader: (state, action) => {
      state.pageNameHeader = action.payload;
    },
    resetGlobalState: () => initialState,
  },
});

export const {
  setPageName,
  setSideBarListItem,
  setPersonDetails,
  setInfoBoxToShow,
  setOrganizationId,
  resetGlobalState,
  setPageNameHeader,
} = globalSlice.actions;

export default globalSlice.reducer;
