import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Modal from 'react-modal';
import styles from './CreateFileModal.module.css'
import TextWrapper from '../UI/TextWrapper/TextWrapper'
import { Form, Formik,ErrorMessage,Field } from 'formik';
import {GoFileCode} from 'react-icons/go'
import * as Yup from 'yup';
import {createNewFile,saveNewFile} from '../../containers/Dashboard/redux/action'

// TODO validate filename with mainfile

Modal.setAppElement('#root');

export default function CreateNewFile() {

    const createFile = useSelector(state=>state.dashBoard.createNewFile)
    let fileList=useSelector(state=>state.dashBoard.fileList)
    const dispatch = useDispatch()

    const ToggleCreateNewFile = ()=>{
        dispatch(createNewFile())
    }

    const validatefileName=(data)=>{
        const fileData=data.split('.');
        if(fileData.length!==2){
            return "Enter Filename with extension";
        }
        if(fileData[1]==='cpp'||fileData[1]==='c'||fileData[1]==='py'||fileData[1]==='java'||fileData[1]==='js'){
            console.log("File has valid extension");
        }else{
            return "Invalid file extension";
        }
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(format.test(fileData[0])){
            return "Invalid filename";
        }
        if(fileData[0]===''){
            return "Filename can't be empty";
        }
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].includes(data)){
                return "Filename already exist";
            }
        }
    }

    const createNewFileSubmit=(data)=>{
        const fileData=data.fileName.split('.')
        dispatch(saveNewFile({fileName:data.fileName,language:fileData[1]}))
    }

    const createNewFileValidation=Yup.object({
        fileName:Yup.string().required("Enter a valid file name.")
    })

    const ModalStyles = {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },
        content: {
          position: 'absolute',
          top: '39%',
          left: '40%',
          right: '40%',
          bottom: '38%',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding:'0px'
        }
    }

    return (
        <Modal isOpen={createFile} style={ModalStyles}>
            <div className={styles.ModalContent}>
                <div className={styles.Header}>
                    <TextWrapper textLabel="Create New File"/>
                </div>
                <Formik initialValues={{fileName:''}} onSubmit={createNewFileSubmit} validationSchema={createNewFileValidation}>
                    {
                        (formik)=>{
                            return(
                                <Form className={styles.NewFileForm}>
                                    <label htmlFor="fileName">File Name</label>
                                    <div className={styles.InputArea}>
                                        <div><GoFileCode/></div>
                                        <Field  type='input' id='fileName' name='fileName' placeholder="main.cpp" validate={validatefileName}/>
                                    </div>
                                    <ErrorMessage name='fileName' component='div' className={styles.ErrorMsg}/>
                                    <div className={styles.subimtButtons}>
                                        <button type="submit" className={styles.fileButton} >Create</button>
                                        <button className={styles.fileButton} style={{marginRight:'12%'}} onClick={ToggleCreateNewFile}>Cancel</button>
                                    </div>
                                </Form>
                            ) 
                        }   
                    }
                </Formik>
            </div>
        </Modal>
    )
}
