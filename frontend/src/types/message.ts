import { TRoom } from "../stores/rooms";
import { TUser } from "./user";

export type TMessage = {
    author: TUser;
    message: string;
    timestamp: Date;
};

export type TConversation = {
    room: TRoom;
    messages: TMessage[];
};
