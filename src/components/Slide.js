import React from 'react';

import Arrows from './Arrows.js';

class Slide extends React.Component {
  constructor(){
    super();
    this.state={
      nowLocal:0
    }
  }
  turn(n) {
    console.log(n);
    var _n = this.state.nowLocal + n;
    if(_n < 0) {
      _n = _n + this.props.items.length;
    }
    if(_n >= this.props.items.length) {
      _n = _n - this.props.items.length;
    }
    this.setState({nowLocal: _n});
  }
  // 开始自动轮播
  goPlay() {
    this.autoPlayFlag = setInterval(() => {
      this.turn(1);
    }, 3000);
  }
  // 暂停自动轮播
  pausePlay() {
    clearInterval(this.autoPlayFlag);
  }
  componentDidMount() {
    this.goPlay();
  }
  render () {
    let styles={
      root:{
        width:'100vw',
        height:'100vh',
        overflow:'hidden',
        position:'relative'
      },
      ul:{
        width:this.props.items.length*100 + '%',
        position:'relative',
        left: -100 * this.state.nowLocal + "%",
      },
      li:{
        width:100/this.props.items.length + '%',
      }
    }
    let imgNode=this.props.items.map(function (item,index) {
      return <li key={index} style={styles.li}><img src={item} key={index} /></li>
    })
    return(
      <div style={styles.root}>
        <ul style={styles.ul} onMouseOver={this.pausePlay.bind(this)} onMouseOut={this.goPlay.bind(this)}>
          {imgNode}
        </ul>
        <Arrows turn={this.turn.bind(this)}/>
      </div>
    )
  }
}

export default Slide;
