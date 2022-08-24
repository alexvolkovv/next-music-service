import { TrackType } from "./TrackType";

export type PlayerState = {
  active: null | TrackType;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
};

export enum PlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
}

export type PlayAction = {
  type: PlayerActionTypes.PLAY;
};

export type PauseAction = {
  type: PlayerActionTypes.PAUSE;
};

export type SetActiveAction = {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: TrackType;
};

export type SetDurationAction = {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
};

export type SetCurrentTimeAction = {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
};

export type SetVolumeAction = {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
};

export type PlayerAction =
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetCurrentTimeAction
  | SetVolumeAction;