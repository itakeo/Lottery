import React, {forwardRef, useState, useRef,useEffect,useImperativeHandle } from 'react';
import './index.css';
const LuckTurn = forwardRef((props,ref)=>{
    const [angle ,setAngle]  =  useState(0); //中奖角度
    const [off ,    setOff]  =  useState(1); //防止重复点击开关
    const [webkitTransform ,setWebkitTransform]  =  useState(''); //动画
    const [webkitTransition ,setWebkitTransition]  =  useState(''); //动画
    const didMountRef = useRef(false);
    const rotateRef = useRef(); //旋转DOM
    const cbRef = useRef(); //回调

    useImperativeHandle(ref, () => ({
        start: (val,fn) => { //开始抽奖
            if(!off) return;
            didMountRef.current = true;
            setOff(0);
            cbRef.current = fn || (()=>{});
            setAngle(360/props.size* val);
            setWebkitTransform(`rotateZ(${props.reset ? 0 : (360 - angle)}deg)`);
            setWebkitTransition( `-webkit-transform 0ms cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s`)
        },
        flag : off
    }));
    const endFn = ()=>{
        setOff(1);
        rotateRef.current.removeEventListener('webkitTransitionEnd',endFn);
        cbRef.current();
    }
    useEffect(()=>{
        if(!didMountRef.current) return;
        didMountRef.current = false;
        setWebkitTransform(`rotateZ(${(3600 - angle)}deg)`);
        setWebkitTransition( `-webkit-transform ${props.time || 4000}ms cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s`);
        rotateRef.current.addEventListener('webkitTransitionEnd',endFn);
    },[webkitTransform])

    return (    
        <div  className="luckTurnBox flex-app flex-justify-center flex-items-center" 
            style={{"width":props.width || '300px',"height" : props.height || '300px'}}>
            <div className="luckTurnBg" ref={rotateRef} style={{
                "background" : `url(${props.background}) center / cover no-repeat`,
                'WebkitTransform' : webkitTransform,
                'WebkitTransition' : webkitTransition
            }}>
            </div>
            {props.children}
        </div>
    )

})

export default LuckTurn;