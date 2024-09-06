/* eslint-disable import/no-cycle */
import SocketEvents from "@/json/events/socketEvents";
import {
  IEndPriceSocketPayload,
  IStartPriceSocketPayload,
  IUserChatInterface
} from "@/reduxtoolkit/interfaces/interfaces";

import { GameSocket, GlobalSocket } from "pages/_app";

export const sendChatMessage = (payload: IUserChatInterface) => {
  GlobalSocket.emit(SocketEvents.emit.EmitJoinChat, payload);
};

export const sendStartPrice = (payload: IStartPriceSocketPayload) => {
  GameSocket.emit(SocketEvents.emit.start_price, payload);
};

export const sendEndPrice = (payload: IEndPriceSocketPayload) => {
  GameSocket.emit(SocketEvents.emit.end_price, payload);
};

export const sendStartPrice15 = (payload: IStartPriceSocketPayload) => {
  GameSocket.emit(SocketEvents.emit.start_price15, payload);
};

export const sendEndPrice15 = (payload: IEndPriceSocketPayload) => {
  GameSocket.emit(SocketEvents.emit.end_price15, payload);
};

export const fetchGameActivity = (
  type: "15" | "30",
  page: number,
  recordsPerPage: number = 10
) => {
  GlobalSocket.emit(SocketEvents.emit.GameActivity, {
    type,
    limit: recordsPerPage,
    page
  });
};
