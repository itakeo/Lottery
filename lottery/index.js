import React from 'react';
import './css/index.css';

import PropTypes from 'prop-types';
class Lottery extends React.Component{
    state = {
        angle : 0,
        off : 1,
        background :`url(${this.props.bg}) center no-repeat / cover` ,
        'WebkitTransform' : '',
        'WebkitTransition':''
    }
    constructor(props) {
        super(props);
        this.rotateRef = React.createRef();
    }
    start=(index,fn)=>{
        if(!this.state.off) return;
        this.setState({
            off : 0
        });
        this.setState({
            'WebkitTransform' : `rotateZ(${ this.props.reset ? 0 : (360-this.state.angle)}deg)`,
            'WebkitTransition' : `-webkit-transform 0ms cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s`,
            'angle' : 360/this.props.size* index
        },()=>{
            setTimeout(()=>{
                this.setState({
                    'WebkitTransform' : `rotateZ(${3600- this.state.angle}deg)`,
                    'WebkitTransition' : `-webkit-transform ${this.props.time || 4000}ms cubic-bezier(0.35, -0.005, 0.565, 1.005) 0s`
                });
            },25);
        });
        let endFn=()=>{
            this.rotateRef.current.removeEventListener('webkitTransitionEnd',endFn);
            fn && fn(index);
            this.setState({
                off : 1
            })
        }
        this.rotateRef.current.addEventListener('webkitTransitionEnd',endFn);
    }
    render(){
        return (
            <div className="LotteryBox flex-app flex-justify-center flex-items-center" 
            	style={{"width":this.props.width || '300px',"height" : this.props.height || '300px'}}>
                <div className="lotteryBg" ref={this.rotateRef} style={{
                    "background" : this.state.background,
                    'WebkitTransform' : this.state.WebkitTransform,
                    'WebkitTransition' : this.state.WebkitTransition
                }}>
                </div>
                {this.props.children}
		    </div>
        );
    }
}
Lottery.propTypes={
    size: PropTypes.any.isRequired,
    bg: PropTypes.any.isRequired 
}
export default Lottery;
