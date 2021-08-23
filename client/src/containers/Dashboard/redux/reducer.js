import {CHANGE_CURRENT_FILE, CHANGE_CURRENT_FILE_CODE, CREATE_NEW_FILE, NIGHT_MODE, REMOVE_FILE, SAVE_NEW_FILE, SHOW_OUTPUT, UPDATE_OUTPUT} from './types';


const defaultFile ={
    cpp:['main.cpp','cpp',`#include<bits/stdc++.h>
using namespace std;
        
int main(){
    cout<<"Hello world"<<endl;
    return 0;
}`],
    js:['main.js','js',''],
    c:['main.c','c',''],
    py:['main.py','py',''],
    java:['main.java','java','']
}

const dashBoardState = {
    createNewFile:false,
    showOutput:false,
    fileList:[],
    currentFile:defaultFile.cpp,
    defaultMainFile:defaultFile.cpp,
    nightMode:false,
    output:' Hello world',
    finishedIn:'0.048s',
    codeStatus:'',
    submittedAt:''
}

const updateCurrentFileCode = (state,data)=>{
    let tempCurrentFile=state.currentFile
    tempCurrentFile[2]=data.code
    return {
        ...state,
        currentFile:tempCurrentFile
    }
}

const updateCurrentFile = (state,data)=>{
    let tempFileList=state.fileList.filter(fileName=>fileName[0]!==state.currentFile[0]) //filelist no currentFile
    let tempDefaultMainFile=state.defaultMainFile
    if(state.currentFile[0]!==state.defaultMainFile[0]){
        tempFileList.push(state.currentFile) //added updated currentFile
    }else{
        tempDefaultMainFile=state.currentFile //changed defaultmainfile
    }
    return{
        ...state,
        fileList:tempFileList,
        defaultMainFile:tempDefaultMainFile,
        currentFile:data.newCurrentFile
    }
}

const dashboardReducer = (state=dashBoardState,action)=>{
    console.log(action.payload)
    switch (action.type){
        case CREATE_NEW_FILE:return {
            ...state,
            createNewFile:!state.createNewFile
        }
        case SHOW_OUTPUT:return{
            ...state,
            showOutput:!state.showOutput
        }
        case SAVE_NEW_FILE:return{
            ...state,
            fileList:[...state.fileList ,[action.payload.fileName,action.payload.language,defaultFile[action.payload.language][2]]],
            currentFile:[action.payload.fileName,action.payload.language,defaultFile[action.payload.language][2]],
            createNewFile:false
        }
        case REMOVE_FILE:return{
            ...state,
            currentFile:state.currentFile[0]===action.payload.fileName?state.defaultMainFile:state.currentFile,
            fileList:state.fileList.length===1?state.fileList.filter(fileName=>fileName===action.payload.fileName):[]
        }
        case NIGHT_MODE:return{
            ...state,
            nightMode:!state.nightMode
        }
        case UPDATE_OUTPUT:return{
            ...state,
            output:action.payload.output,
            finishedIn:action.payload.finishedIn,
            codeStatus:action.payload.status,
            submittedAt:action.payload.submittedAt
        }
        case CHANGE_CURRENT_FILE:return updateCurrentFile(state,action.payload)
        case CHANGE_CURRENT_FILE_CODE:return updateCurrentFileCode(state,action.payload)
        default:return state
    }
}

export default dashboardReducer