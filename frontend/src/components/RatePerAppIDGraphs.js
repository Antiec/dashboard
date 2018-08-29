import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import LineGraph from "./LineGraph";
import { StatsActions } from "../redux/stats";

import { Column, StyledSelect } from "./commonStyles";

class RatePerAppIDGraphs extends Component {
  componentWillMount() {
    this.props.getMeanSentRateByAppData("allAvgSent");
    this.props.getAppIds();
  }

  render() {
    return (
      <Column>
        <hr />
        <h2 style={{ display: "flex" }}>
          Average sending rate by App ID in kbps
        </h2>
        <StyledSelect
          onChange={e => this.props.getMeanSentRateByAppData(e.target.value)}
        >
          <option key={"AllIDsByApplication"} value={"allAvgSent"}>
            All IDs
          </option>
          {this.props.appIds &&
            this.props.appIds.map((appId, index) => (
              <option key={"select_" + appId.appID} value={appId.appID}>
                {appId.appID}
              </option>
            ))}
        </StyledSelect>
        <LineGraph
          style={{ display: "flex" }}
          appData={this.props.byAppIdsData}
        />
        {this.props.byAppIdsData.length === 0 && (
          <p>The appID doesn't have any sessions with meanSendingRate</p>
        )}
      </Column>
    );
  }
}

export default connect(
  state => ({
    appIds: state.stats.appIds,
    byAppIdsData: state.stats.byAppIdsData
  }),
  {
    getAppIds: StatsActions.getAppIds,
    getMeanSentRateByAppData: StatsActions.getMeanSentRateByAppData
  }
)(RatePerAppIDGraphs);
