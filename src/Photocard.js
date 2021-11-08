import { useEffect, useRef } from "react";
import {createPortal} from 'react-dom';

const modelRoot = document.getElementById('model-root');
const Photocard = (props)=>{
    const elRef = useRef(null);
    if(!elRef.current){
        elRef.current = document.createElement('div');
    }
   
    useEffect(()=>{
        modelRoot.appendChild(elRef.current)

        return ()=>{ modelRoot.removeChild(elRef.current)} 
           
        
    },[])
    return createPortal(
        props.children,
        elRef.current
    );
} 

export default Photocard;