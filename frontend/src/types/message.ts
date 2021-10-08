import { TUser } from "./user";

export type TMessage = {
    author: TUser;
    text: string;
    timestamp: Date;
};
