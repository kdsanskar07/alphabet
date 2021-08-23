import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import styles from './Dashboard.module.css'
import SettingBar from '../../components/SettingBar/SettingBar';
import NavBar from '../../components/NavBar/NavBar';
import Editor from '../../components/Editor/Editor';
import TextWrapper from '../../components/UI/TextWrapper/TextWrapper';
import {MdAdd,MdPlayArrow} from 'react-icons/md'
import OutputConsole from '../../components/OutputConsole/OutputConsole';
import CreateFileModal from '../../components/CreateFileModal/CreateFileModal';
import {createNewFile,changeCurrentFile,removeFile,updateOutput} from './redux/action'
import {MdClose} from 'react-icons/md'
import axios from "axios";
import moment from "moment";

function Dashboard(props) {
    
    const fileList=useSelector(state=>state.dashBoard.fileList)
    const defaultMain=useSelector(state=>state.dashBoard.defaultMainFile)
    const currentFile=useSelector(state=>state.dashBoard.currentFile)
    const dispatch = useDispatch()
    let pollInterval;


    const ToggleCreateNewFile = ()=>{
        dispatch(createNewFile())
    }

    const deleteFile=(file)=>{
        console.log('file:: ',file[0])
        dispatch(removeFile({fileName:file[0]}))
    }

    const changeCurrentFileName=(file)=>{
        dispatch(changeCurrentFile({newCurrentFile:file}))
    }

    const updateOutputConsole=(data)=>{
      dispatch(updateOutput(data));
    }

    const runCode=async()=>{
        const payload = {
            language: "cpp",
            code:currentFile[2],
        };
        try {
            const { data } = await axios.post("http://localhost:5000/run", payload);
            if (data.jobId) {
              // poll here
              pollInterval = setInterval(async () => {
                const { data: statusRes } = await axios.get(`http://localhost:5000/status`,{params: {id: data.jobId,},});
                const { success, job, error } = statusRes;
                console.log("statusRes:: ",statusRes);
                if (success) {
                    const { status: jobStatus, output: jobOutput, submittedAt: jobSubmittedAt,startedAt: jobStartedAt, completedAt: jobCompletedAt} = job;
                    if(jobStatus === "pending") return;
                    clearInterval(pollInterval);
                    let SubmittedAt=moment(jobSubmittedAt).toString();
                    let StartedAt=moment(jobStartedAt);
                    let CompletedAt=moment(jobCompletedAt);
                    const jobExecutionTime = CompletedAt.diff(StartedAt,"seconds",true);
                    console.log("output: ",jobOutput);
                    updateOutputConsole({output:jobOutput,status:jobStatus,finishedIn:jobExecutionTime,submittedAt:SubmittedAt})
                } else {
                    console.error(error);
                    clearInterval(pollInterval);
                }
              }, 1000);
            } else {
              console.log("Retry again.");
            }
          } catch ({ response }) {
            if (response) {
              const errMsg = response.data.err.stderr;
              console.log(errMsg);
            } else {
              console.log("Please retry submitting.");
            }
          }
    }
    console.log('fileList_dash:: ',fileList)
    console.log('defaultMain_dash::',defaultMain)
    console.log('currentFile_dash:: ',currentFile)
    return (
        <React.Fragment>
            <NavBar/>
            <div className={styles.Dashboard}>
                <SettingBar/>
                <CreateFileModal/>
                <div className={styles.EditorHeader}>
                    <div className={styles.FileName} style={currentFile[0]===defaultMain[0]?{backgroundColor:'#282828',borderTopLeftRadius:'0.2rem'}:{borderTopLeftRadius:'0.2rem'}} onClick={()=>changeCurrentFileName(defaultMain)}>
                        {defaultMain[0]}
                    </div>
                    {
                        fileList.map((file)=>{
                            return(
                                <div className={styles.FileName} style={currentFile[0]===file[0]?{backgroundColor:'#282828'}:null} key={file[0]}>
                                    <div onClick={()=>changeCurrentFileName(file)}>
                                        {file[0]}
                                    </div>
                                    <div onClick={()=>deleteFile(file)}>
                                        <MdClose/>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={styles.CreateFile} onClick={ToggleCreateNewFile}>
                        <MdAdd/>
                    </div>
                </div>
                <Editor/>
                <div className={styles.EditorBottom}>
                    <div className={styles.RunButton} onClick={runCode}>
                        <div className={styles.PlayIcon}>
                            <MdPlayArrow/>
                        </div>
                        <TextWrapper textLabel='Run Code' isFlexStart={true}/>
                    </div>
                </div>
                <OutputConsole/>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;