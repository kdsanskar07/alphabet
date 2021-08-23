import { CHANGE_CURRENT_FILE_CODE,CHANGE_CURRENT_FILE, CREATE_NEW_FILE , REMOVE_FILE, SAVE_NEW_FILE, NIGHT_MODE, UPDATE_OUTPUT,SHOW_OUTPUT} from "./types"

export const createNewFile = ()=>{
    return{
        type:CREATE_NEW_FILE
    }
}
export const showOutput=()=>{
    return{
        type:SHOW_OUTPUT
    }
}
export const nightMode = ()=>{
    return{
        type:NIGHT_MODE
    }
}
export const saveNewFile = (data)=>{
    return{
        type:SAVE_NEW_FILE,
        payload:data //data = {fileName:string,language:string(cpp,js,c,py,java)}
    }
}
export const updateOutput = (data)=>{
    return{
        type:UPDATE_OUTPUT,
        payload:data // data = 
    }
}
export const changeCurrentFile=(data)=>{
    return{
        type:CHANGE_CURRENT_FILE,
        payload:data //data = {newCurrentFile:[fileName,language,code]}
    }
}
export const changeCurrentFileCode=(data)=>{
    return{
        type:CHANGE_CURRENT_FILE_CODE,
        payload:data //data = {code:string}
    }
}
export const removeFile=(data)=>{
    return{
        type:REMOVE_FILE,
        payload:data //data = {fileName:'string'}
    }
}