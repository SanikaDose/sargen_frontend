import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageName: '',
  SideBarListItem: [],
  personDetails: {},
  InfoBoxToShow: false,
  organizationId: '',
  sideBarDrawerList: [],
  showAssessmentListSideBar: false,
  sideBarListItemsForAssessment: [],
  extraListItems: [],
  pageNameHeader: 'Page heading',
  userFullName: '',
  userDesignation: '',
  userLogoUrl: '',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSideBarListItem: (state, action) => {
      state.SideBarListItem = action.payload;
    },

    setSideBarListItemsForAssessment: (state, action) => {
      state.sideBarListItemsForAssessment = action.payload;
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
    setShowAssessmentListSideBar: (state, action) => {
      state.showAssessmentListSideBar = action.payload;
    },
    setExtraListItems: (state, action) => {
      state.extraListItems = action.payload;
    },

    setUserFullName: (state, action) => {
      state.userFullName = action.payload;
    },
    setUserDesignation: (state, action) => {
      state.userDesignation = action.payload;
    },
    setUserLogoUrl: (state, action) => {
      state.userLogoUrl = action.payload;
    },

    resetGlobalState: () => initialState,
  },
});

export const {
  setUserFullName,
  setUserDesignation,
  setUserLogoUrl,
  setSideBarListItem,
  setPersonDetails,
  setInfoBoxToShow,
  setOrganizationId,
  resetGlobalState,
  setPageNameHeader,
  setShowAssessmentListSideBar,
  setSideBarListItemsForAssessment,
  setExtraListItems,
} = globalSlice.actions;

export default globalSlice.reducer;
