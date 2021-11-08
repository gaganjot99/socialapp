import { useEffect } from "react";
import ReactDOM from 'react-dom';

const modelRoot = document.getElementById('model-root');
const Photocard = (props)=>{
    const el = document.createElement('div');
    useEffect(()=>{
        modelRoot.appendChild(el)

        return ()=>{ modelRoot.removeChild(el)} 
           
        
    },[])
    return ReactDOM.createPortal(
        props.children,
        el
    );
} 

export default Photocard;