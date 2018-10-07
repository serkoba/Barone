import { DBOperation } from "../../core/enum/enum.enum";

export interface ModelComponents {
    msg: string;
    indLoading: boolean;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
}
