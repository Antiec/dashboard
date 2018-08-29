import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ColumnGraph from "./ColumnGraph";
import { StatsActions } from "../redux/stats";

import { Column, StyledSelect } from "./commonStyles";

class MediaTypePerAppID extends Component {
  async componentWillMount() {
    await this.props.getAppIds();
    if (
      this.props.appIds &&
      this.props.appIds[0] &&
      this.props.appIds[0].appID
    ) {
      this.props.getByMediaTypes(this.props.appIds[0].appID);
    }
  }

  render() {
    return (
      <Column>
        <h2 style={{ display: "flex" }}>
          Distribution of media types with the appID
        </h2>
        <StyledSelect
          onChange={e => this.props.getByMediaTypes(e.target.value)}
        >
          {this.props.appIds &&
            this.props.appIds.map((appId, index) => (
              <option
                key={"mediaType_select_" + appId.appID}
                value={appId.appID}
              >
                {appId.appID}
              </option>
            ))}
        </StyledSelect>
        <ColumnGraph
          style={{ display: "flex" }}
          appData={this.props.byMediaTypeData}
        />
        {this.props.byMediaTypeData &&
          this.props.byMediaTypeData.data &&
          this.props.byMediaTypeData.data.length === 0 && (
            <p>The appID doesn't have any sessions with mediaType</p>
          )}
      </Column>
    );
  }
}

export default connect(
  state => ({
    appIds: state.stats.appIds,
    byMediaTypeData: state.stats.byMediaType
  }),
  {
    getAppIds: StatsActions.getAppIds,
    getByMediaTypes: StatsActions.getByMediaTypes
  }
)(MediaTypePerAppID);
