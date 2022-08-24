import { CommentType } from "./CommentType";

export type TrackType = {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: CommentType[];
};

export type TracksState = {
  tracks: TrackType[];
  error: string;
};

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
  SET_TRACKS = "SET_TRACKS",
}

type SetTracksAction = {
  type: TrackActionTypes.SET_TRACKS;
  payload: TrackType[];
};

type FetchTracksAction = {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: TrackType[];
};

type FetchTracksErrorAction = {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
};

export type TrackAction =
  | FetchTracksAction
  | FetchTracksErrorAction
  | SetTracksAction;
