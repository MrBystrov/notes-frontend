import dayjs from "dayjs";
import type { INote } from "~/stores/notes/types";

export class Note { 
    constructor(private userId: string, 
                private _id: string, 
                private createdAt: string,
                private updatedAt: string,
                private title: string,
                private text: string,
                private type: string,
                private  active: boolean
            ){}

    getTitle = () => {
        return this.title;
    }  
    
    getText = () => {
        return this.text;
    }

    getId = () => {
        return this._id
    }
    getCreated = () => {
        return dayjs(this.createdAt).format('DD.MM.YYYY')
    }

    updateText = (text: string) => {
         if (text.trim() === '') {
        throw new Error('Text cannot be empty');
    }
    this.text = text;
    } 
    changeStatus = () => {
        this.active = !this.active;
    }
}

class Task extends Note {}

