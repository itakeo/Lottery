import React from 'react';
import PropTypes from 'prop-types';
let now = 0,
    count = 0,
    timer = '',
    speed = 50;
class Lottery extends React.Component{
    constructor(props) {
        super(props);
        this.luckRef = React.createRef();
    }
    start=(index,fn)=>{
        let _item = document.querySelectorAll('.'+this.props.itemClass);
        now = ++now % _item.length;
        now == 0 && count ++;
        _item.forEach(res=>{
            res.dataset.index == now ? res.classList.add('active') : res.classList.remove('active')
        });
        timer = setTimeout(()=>{
            this.start(index,fn);
        },speed); 
        if(count > 3) speed+=10;
        if(speed > 300 && now == index){
            clearTimeout(timer);
            count = 0;
            speed = 50
            fn && fn(now)
        }   
    }
    render(){
        return (
            <div className="LotteryBox2"  ref={this.luckRef} >
                {this.props.children}
		    </div>
        );
    }
}
Lottery.propTypes={
    itemClass: PropTypes.any.isRequired
}
export default Lottery;
