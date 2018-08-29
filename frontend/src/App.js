import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import RatePerAppIDGraphs from "./components/RatePerAppIDGraphs";
import RatePerBuildNameAndVer from "./components/RatePerBuildNameAndVer";
import MediaTypePerAppID from "./components/MediaTypePerAppID";

import { StatsActions } from "./redux/stats";

const MainContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerticalWhiteSpace = styled.div`
  height: 30px;
`;

class App extends Component {
  componentDidMount() {
    this.props.verifyServerConnection();
  }

  render() {
    return (
      <MainContainer>
        <header>
          <h1>Welcome to the Dashboard</h1>
          <VerticalWhiteSpace />
        </header>
        {this.props.connectedToServer ? (
          <Fragment>
            <RatePerAppIDGraphs />
            <VerticalWhiteSpace />
            <RatePerBuildNameAndVer />
            <VerticalWhiteSpace />
            <MediaTypePerAppID />
          </Fragment>
        ) : (
          <h3>
            Couldn't connect to server. Please verify it's running and refresh.
          </h3>
        )}
      </MainContainer>
    );
  }
}

export default connect(
  state => ({
    connectedToServer: state.stats.connectedToServer
  }),
  {
    verifyServerConnection: StatsActions.verifyServerConnection
  }
)(App);
