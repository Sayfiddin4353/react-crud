import React, { Component } from "react";
import "./style.css";
class Dialog extends Component {
    constructor(props){
        super(props)      
    }
  render() {
    return (
      <div className="dialog-wrapper">
        <div className="dialog-container">
          <h3 className="dialog-title">{this.props.message}</h3>
          <div>
          <button  className="dialog-btn active dialog-btn--bg-red" onClick={()=>this.props.onDialog(true)} >Yes</button>
          <button className="dialog-btn active dialog-btn--bg-green" onClick={()=>this.props.onDialog(false)} >No</button>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Dialog;
