import {InferActionsTypes} from "./redux-store";
import stiv from "../assets/images/dialogs/stiv.jpg";
import strange from "../assets/images/dialogs/Doctor_Strange.jpg";
import panther from "../assets/images/dialogs/Black_Panther.jpg";
import thor from "../assets/images/dialogs/thor.jpg";

export type DialogType = {
    id: number,
    name: string,
    messageText: string,
    src: string,
}

export type MessageType = {
    id: number,
    message: string,
}

let initialState = {
    dialogs: [
        {id: 1, messageText: 'Hi, friend!', name: 'Captain America', src: stiv},
        {id: 2, messageText: 'What do you doing?', name: 'Doctor Strange', src: strange},
        {id: 3, messageText: 'I will be there.', name: 'Black Panther', src: panther},
        {id: 4, messageText: 'I am a god of thunder!', name: 'Thor', src: thor}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi, friend!'},
        {id: 2, message: 'I want to give one mission to you'},
        {id: 3, message: 'Are you ready for it?'}
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SEND_MESSAGE', newMessageBody} as const),
}

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            let body = action.newMessageBody;
            return  {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, message: body}]
            };
        default:
            return state;
    }
}

export default dialogsReducer;
