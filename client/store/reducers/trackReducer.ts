import {
  TrackAction,
  TrackActionTypes,
  TracksState,
} from "../../models/TrackType";

const initialState: TracksState = {
  tracks: [],
  error: "",
};

export const trackReducer = (state = initialState, action: TrackAction) => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return { ...state, tracks: action.payload };
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TrackActionTypes.SET_TRACKS:
      return { ...state, tracks: action.payload };
    default:
      return state;
  }
};
