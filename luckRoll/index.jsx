import React, {forwardRef, useState, useRef,useEffect,useImperativeHandle } from 'react';
import './index.css';

const LuckRoll = forwardRef((props,ref)=>{
    const [off ,    setOff]  =  useState(1); //防止重复点击开关
    const [liDom ,    setLiDom]  =  useState();
    const [rdmArr ,    setRdmArr]  =  useState([]);
    const rollRef = useRef();
    useImperativeHandle(ref, () => ({
        start: (arr,fn) => { //开始抽奖
            if(!off) return;
            setOff(0);
            let countNum = 0;
            rollRef.current.querySelectorAll('ul').forEach((res,index)=>{
                setTimeout(()=>{
                    res.classList.add('luckRollActive')
                    let _y = (arr[index] + props.list.length *5)*100;
                    res.style['-webkit-transition'] = ` all ${props.time || 4000}ms ease`;
                    res.style['-webkit-transform'] = `translate3d(0px, -${_y}%,0px)`;
                },index * 300);
                res.addEventListener('webkitTransitionEnd',(e)=>{
                    res.classList.remove('luckRollActive')
                    e.target.style['-webkit-transition'] = '0ms ease';
                    e.target.style['-webkit-transform'] = `translate3d(0px, -${arr[index]*100}%,0px)`;
                    countNum++;
                    if(countNum == props.cols.length){
                        setOff(1);
                        fn && fn(arr);
                    }
                },false);
            })
        },
        flag : off
    }));
    
    useEffect(()=>{
        let _li = new Array(6).fill('').map((res,index)=>{
            return (
                props.list.map((res2,index2)=>{
                    return <li key={index2}>{index2}</li>
                })
            )
        });
        setLiDom(_li);
        let _arr = [];
        new Array(props.cols*1).fill('').map((res,index)=>{
            _arr.push(Math.floor(Math.random() * props.list.length)*-100)
        });
        setRdmArr(_arr);
        
    },[]);

    return (    
        <div  className="luckRollBox" ref={rollRef} style={{"width":props.width || '300px',"height" : props.height || '100px'}}>
            {
                new Array(props.cols*1).fill('').map((res,index)=>{
                    return (
                        <div className="luckRollitem" style={{'marginLeft' : index!= 0 ? `${props.space || '10px'}` : 0}}  key={index}>
                            <ul style={{'WebkitTransform' : `translate3d(0,${ props.random ? (rdmArr[index]) : 0}%,0)`}}>{liDom}</ul>
                        </div>
                    )
                })
            }
        </div>
    )

})

export default React.memo(LuckRoll,()=>{
  return true
});