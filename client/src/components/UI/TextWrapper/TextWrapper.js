import React from 'react';
import styles from './TextWrapper.module.css'
import PropTypes from 'prop-types'

TextWrapper.propTypes = {
    textLabel:PropTypes.string,
    isFlexStart:PropTypes.bool
};

function TextWrapper (props){
    return (
        <div className={styles.TextBox} style={props.isFlexStart?{justifyContent:"flex-start"}:null}>
            {props.textLabel}
        </div>
    );

}

export default TextWrapper;