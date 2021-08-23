import React from 'react'
import { useSelector } from 'react-redux'
import styles from './OutputConsole.module.css'
import TextWrapper from '../UI/TextWrapper/TextWrapper'
import {MdContentCopy,MdFileDownload} from 'react-icons/md'
import {FaEraser} from 'react-icons/fa'
import { Formik,Form } from 'formik'

export default function Console() {

    const output = useSelector(state=>state.dashBoard.output)
    const showOutput = useSelector(state=>state.dashBoard.showOutput)
    const finishedIn = useSelector(state=>state.dashBoard.finishedIn)
    const status = useSelector(state=>state.dashBoard.codeStatus)
    const submittedAt = useSelector(state=>state.dashBoard.submittedAt)
    
    const inputData={
        val:''
    }

    const inputSubmit={

    }


    return (
        <div className={styles.Console}>
            <div className={styles.ConsoleLabel}>
                <div styles={showOutput===false?{backgroundColor:'red'}:{borderRight: '0.5px solid gray'}}>
                    INPUT
                </div>
                <div>
                    OUTPUT
                </div>
            </div>
            <div className={styles.ConsoleArea}>
                <div className={styles.OptionsArea}>
                    <div className={styles.ConsoleIcons} style={{borderTop: '0.5px solid gray'}}>
                        <MdContentCopy/>
                    </div>
                    <div className={styles.ConsoleIcons}>
                        <MdFileDownload/>
                    </div>
                    <div className={styles.ConsoleIcons}>
                        <FaEraser/>
                    </div>
                </div>
                <div className={styles.OutputArea}>
                    <Formik>

                    </Formik>
                </div>
                <div className={styles.OptionsArea}>
                    <div className={styles.ConsoleIcons} style={{borderTop: '0.5px solid gray'}}>
                        <MdContentCopy/>
                    </div>
                    <div className={styles.ConsoleIcons}>
                        <MdFileDownload/>
                    </div>
                    <div className={styles.ConsoleIcons}>
                        <FaEraser/>
                    </div>
                </div>
                <div className={styles.OutputArea}>
                    <div className={styles.finishedIn}>
                        <p>Status: {status}</p>
                        <p>Finished in {finishedIn}</p>
                        <p>Submitted At {submittedAt}</p>
                    </div>
                    <div className={styles.output}>
                        <TextWrapper textLabel={output} isFlexStart={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
