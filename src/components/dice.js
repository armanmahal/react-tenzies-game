import React from 'react'

export default function Dice(props){
    const styles = {
        backgroundColor: props.selected ? "#59E391" : "white",
    
    }

    return(
        <div className='dice' style={styles} onClick={props.hold}>
             {props.value} 
             </div>
    )
}