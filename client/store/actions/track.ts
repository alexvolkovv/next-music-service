import { Dispatch } from "redux";
import {
  TrackAction,
  TrackActionTypes,
  TrackType,
} from "../../models/TrackType";
import { TrackService } from "../../api/TrackService";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await TrackService.getTracks();

      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Не удалось загрузить треки",
      });
    }
  };
};

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await TrackService.searchTracks(query);

      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Не удалось загрузить треки",
      });
    }
  };
};

export const setTracks = (tracks: TrackType[]): TrackAction => {
  return { type: TrackActionTypes.SET_TRACKS, payload: tracks };
};
