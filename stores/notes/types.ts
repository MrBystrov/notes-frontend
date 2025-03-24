import type { TSelectOption } from "~/components/v-select/types";

export interface INote {
    _id: string,
    userId: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    active: boolean;
    text: string;
    type: string;
}

export type ITaskItem = {
    id?: string;
    text: string;
    completed: boolean;
}


export type TNoteType = 'note' | 'task';


export type TNotesType = 'active' | 'archive'

export const SELECT_OPTIONS: TSelectOption[] = [
    {
        name: 'За все время',
        id: 4,
        range: 'unlimited'
    },
    {
        name: 'За последний год',
        id: 1,
        range: '12'
    },
    {
        name: 'За последний квартал',
        id: 2,
        range: '3'
    },
    {
        name: 'За последний месяц',
        id: 3,
        range: '1'

    },
]