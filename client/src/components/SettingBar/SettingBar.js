import React from 'react'
import { useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import styles from './SettingBar.module.css'
import {MdFolder,MdInsertDriveFile} from 'react-icons/md'
import {HiShare} from 'react-icons/hi'
import {BsMoon,BsSun} from 'react-icons/bs'
import {AiFillSetting} from 'react-icons/ai'
import Select from 'react-select'
import { nightMode } from '../../containers/Dashboard/redux/action'

export default function CodeSettings() {

    const dispatch=useDispatch();
    const nightModeValue=useSelector(state=>state.dashBoard.nightMode)
    const inputFile = useRef(null) 
    const onButtonClick = () => {
        // `current` points to the mounted file input element
       inputFile.current.click();
    };
    const extractData = async (e)=>{
        e.preventDefault()
        console.log('e',e)
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        console.log(e)
        reader.onload = async (e) => { 
            const text = (e.target.result)
            console.log(text)
        };
        reader.readAsText(e.target.files[0])
    }

    const languageOptions=[
        {value:'cpp',label:'CPP'},
        {value:'c',label:'C'},
        {value:'py',label:'PYTHON'},
        {value:'java',label:'JAVA'},
        {value:'js',label:'JAVASCRIPT'}
    ]

    const selectStyles = {
        control: () => ({
          width: '8vw',
          display:'flex',
          marginRight:'1vw',
          border:'0.5px solid gray',
          borderRadius:'0.2rem'
        }),
    }
    const toggleNightMode=()=>{
        dispatch(nightMode())
    }

    return (
        <div className={styles.CodeSettings}>
            <div className={styles.SettingsSide}>
                <div className={styles.EditorSettings}>
                    <div className={styles.EditorIcons} onClick={onButtonClick} >
                        <MdFolder/>
                        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={(e)=>{extractData(e)}}/>
                    </div>
                    <div className={styles.IconSeperator}></div>
                    <div className={styles.EditorIcons}>
                        <MdInsertDriveFile/>
                    </div>
                    <div className={styles.IconSeperator}></div>
                    <div className={styles.EditorIcons}>
                        <HiShare/>
                    </div>
                </div>
            </div>
            <div className={styles.SettingsSide} style={{justifyContent:'flex-end'}}>
                <Select options={languageOptions} defaultInputValue='cpp' styles={selectStyles}/>
                <div className={styles.EditorSettings} style={{width:'13%'}}>
                    <div className={styles.EditorIcons} style={{width:'50%'}} onClick={toggleNightMode}>
                        {/* {console.log('ng',nightMode)} */}
                        {nightModeValue?<BsSun/>:<BsMoon/>}
                    </div>
                    <div className={styles.IconSeperator}></div>
                    <div className={styles.EditorIcons} style={{width:'50%'}}>
                        <AiFillSetting/>
                    </div>
                </div>
            </div>
        </div>
    )
}
