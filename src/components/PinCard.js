import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { userActions } from "../../actions";
// import { withRouter } from "react-router";

class PinCard extends Component {
  constructor(props) {
    super(props);
    // const { dispatch } = this.props;
    // this.handleLogout = this.handleLogout.bind(this);
  }

  // handleLogout(e) {
  //     e.preventDefault();
  //     this.props.dispatch(userActions.logout());
  // }

  render() {
    //   let { item } = this.props;
    //   debugger
    return (
      <div>
        <div className="z-depth-3">
          <ul className="collection ">
            <li className="collection-item avatar pin-content">
              {/* <div className="col m2"> */}
              {/* <i class="material-icons circle green">insert_chart</i> */}
              <img src={this.props.item.images[0]} alt="" className="circle" />
              {/* <img src="https://cdn-images-1.medium.com/letterbox/183/36/50/50/1*mGbzSVmf-HAVTCgvlMcWPg.png?source=logoAvatar-lo_dnt_4JhHhPGMy7hr---138adf9c44c" alt="" className="circle"></img> */}
              {/* </div> */}
              <div className="col m12">
                <span className="title">{this.props.item.header}</span>
                <p className="">{this.props.item.possibleDescriptions[0]}</p>
              </div>
              {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
            </li>
          </ul>
        </div>

        {/* <div className="z-depth-3">{JSON.stringify(this.props.item.images)}</div> */}
        <div className="z-depth-3">
          {this.props.item.images.map(function(item, i) {
            return <li key={i}><img src={item}/></li>;
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

const connectedNavMenuComponent = connect(mapStateToProps)(PinCard);
export { connectedNavMenuComponent as PinCard };