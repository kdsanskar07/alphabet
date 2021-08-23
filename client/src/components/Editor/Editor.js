import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import styles from './Editor.module.css'
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-pastel_on_dark"
import "ace-builds/src-noconflict/theme-textmate"
import "ace-builds/src-noconflict/theme-tomorrow"
import "ace-builds/src-noconflict/theme-tomorrow_night"
import "ace-builds/src-min-noconflict/theme-tomorrow_night_eighties"
import "ace-builds/src-noconflict/theme-twilight"
import "ace-builds/src-noconflict/theme-xcode"
import "ace-builds/src-noconflict/theme-chrome"
import "ace-builds/src-noconflict/theme-clouds"
import {changeCurrentFileCode} from '../../containers/Dashboard/redux/action'


export default function Editor() {

    const currentFile=useSelector(state => state.dashBoard.currentFile)
    const dispatch=useDispatch()

    const EditorStyle={
        height:'100%',
        width:'100%',
        border:'none',
        color:'white'
    }

    const updateCurrentFIle=(code)=>{
        dispatch(changeCurrentFileCode({code:code}))
    }
    console.log('currentFile_Editor::',currentFile)
    return (
        <div className={styles.EditorArea}>
            <AceEditor
                style={EditorStyle}
                mode="c_cpp"
                theme="tomorrow_night_eighties"
                name="alphabetEditor"
                readOnly={false}
                height="100%"
                width="100%"
                fontSize={18}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={false}
                value={currentFile[2]}
                onChange={updateCurrentFIle}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }
            }/>
        </div>
    )
}
