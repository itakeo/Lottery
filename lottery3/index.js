import React from 'react';
import './css/index.css'
import PropTypes from 'prop-types';
class Lottery extends React.Component{
    constructor(props) {
        super(props);
        this.luckRef = React.createRef();
    }
    start=(arr,fn)=>{
        let countNum = 0;
        this.luckRef.current.querySelectorAll('ul').forEach((res,index)=>{
            setTimeout(()=>{
                let _y = (arr[index] + this.props.list.length *5)*100;
                res.style['-webkit-transition'] = ` all ${this.props.speed || 4000}ms ease`;
                res.style['-webkit-transform'] = `translate(0px, -${_y}%) translateZ(0px)`;
            },index * 300);
            res.addEventListener('webkitTransitionEnd',(e)=>{
                e.target.style['-webkit-transition'] = '0ms ease';
                e.target.style['-webkit-transform'] = `translate(0px, -${arr[index]*100}%) translateZ(0px)`;
                countNum++;
                if(countNum == this.state.cols.length){
                    fn && fn(arr);
                }
            },false);
        })
    }   
    state = {
        cols : []
    }
    componentDidMount(){
        let _arr = []
        for(let i = 0;i<this.props.col;i++) _arr.push(i);
        this.setState({
            cols : _arr
        });
    }
    render(){
        let _li = new Array(6).fill(5).map((res,index)=>{
            return (
                this.props.list.map((res2,index2)=>{
                    return <li key={index2} style={{'background':`url(${res2}) center no-repeat / cover`}}></li>
                })
            )
        });
        return (
            <div className="LotteryBox3">
                <div className="game_wrap"  ref={this.luckRef}  style={{'width' : this.props.width,'height' : this.props.height}}>
                    {
                        this.state.cols.map((res,index)=>{
                            let _transform = {
                                'WebkitTransform' : `translate3d(0,${Math.floor(Math.random() * this.props.list.length)*-100}%,0)`
                            };
                            return (
                                <div className="game_item" style={{'marginLeft' : index!= 0 ? `${this.props.space || '10px'}` : 0}}  key={index}>
                                    <ul style={_transform}>{_li}</ul>
                                </div>
                            )
                        })
                    }
                </div>
		    </div>
        );
    }
}
Lottery.propTypes={
    col: PropTypes.any.isRequired,
    list: PropTypes.array.isRequired 
}
export default Lottery;
