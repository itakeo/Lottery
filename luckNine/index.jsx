import React, {forwardRef, useState, useRef,useEffect,useImperativeHandle } from 'react';
import './index.css';
let now = 0,
    count = 0,
    timer = null,
    speed = 50;
const LuckNine = forwardRef((props,ref)=>{
    const [off ,    setOff]  =  useState(1); //防止重复点击开关
    useImperativeHandle(ref, () => ({
        start: (index,fn) => { //开始抽奖
            if(!off) return;
            setOff(0);
            changeFn(index,fn);
        },
        flag : off
    }));
    const changeFn = (index,fn)=>{
        let _item = document.querySelectorAll('.luckNineWrap .luckNineItem');
        now = ++now % (_item.length-1);
        now == 0 && count ++;
        _item.forEach(res=>{
            res.dataset.index == now ? res.classList.add('active') : res.classList.remove('active')
        });
        timer = setTimeout(()=>{
            changeFn(index,fn);
        },speed); 
        if(count > 3) speed+=10;
        if(speed > 300 && now == index){
            clearTimeout(timer);
            count = 0;
            speed = 50;
            setOff(1);
            fn && fn(now)
        }   
    }


    return (    
        <div  className="luckNineBox" style={{"width":props.width || '300px',"height" : props.height || '300px'}}>
            <div className="luckNineWrap flex-app">
                <div className="luckNineItem" data-index="0">1</div>
                <div className="luckNineItem" data-index="1">2</div>
                <div className="luckNineItem" data-index="2">3</div>
                <div className="luckNineItem" data-index="7">8</div>
                <div className="luckNineItem"  data-index="8">{props.children}</div>
                <div className="luckNineItem" data-index="3">4</div>
                <div className="luckNineItem" data-index="6">7</div>
                <div className="luckNineItem" data-index="5">6</div>
                <div className="luckNineItem" data-index="4">5</div>
            </div>
        </div>
    )

})

export default LuckNine;