import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import LineGraph from "./LineGraph";
import { StatsActions } from "../redux/stats";

import { Column, StyledSelect } from "./commonStyles";

const Row = styled.div`
  flex-direction: row;
  align-content: flex-end;
`;

const StyledLongSelect = styled.select`
  width: 500px;
`;

class RatePerBuildNameAndVer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBuildName: "",
      selectedBuildVersion: ""
    };
  }

  async componentWillMount() {
    await this.props.getBuildNames();
    if (this.props.buildNames.length > 0) {
      await this.props.getBuildVersions(this.props.buildNames[0]);
      if (this.props.buildVersions.length > 1) {
        await this.props.getByBuildData(
          this.props.buildNames[0],
          this.props.buildVersions[1].buildVer
        );
        this.setState({
          selectedBuildName: this.props.buildNames[0],
          selectedBuildVersion: this.props.buildVersions[1]
        });
      }
    }
  }

  render() {
    return (
      <Column>
        <hr />
        <h2 style={{ display: "flex" }}>
          {"Average sending rate by build name & version"}
        </h2>
        <Row>
          <StyledSelect
            onChange={async e => {
              const value = e.target.value;
              await this.props.getBuildVersions(value);
              this.setState({ selectedBuildName: value });
              this.props.getByBuildData(
                value,
                this.props.buildVersions[0].buildVer
              );
            }}
          >
            {this.props.buildNames &&
              this.props.buildNames.map((buildName, index) => (
                <option key={"select_" + buildName} value={buildName}>
                  {buildName}
                </option>
              ))}
          </StyledSelect>
          <StyledLongSelect
            onChange={e => {
              console.log(this.state.selectedBuildName);
              this.props.getByBuildData(
                this.state.selectedBuildName,
                e.target.value
              );
              this.setState({ selectedBuildVersion: e.target.value });
            }}
          >
            {this.props.buildVersions &&
              this.props.buildVersions.map((buildVersion, index) => (
                <option
                  key={"select_" + buildVersion.buildVer}
                  value={buildVersion.buildVer}
                >
                  {buildVersion.buildVer}
                </option>
              ))}
          </StyledLongSelect>
        </Row>
        <LineGraph
          style={{ display: "flex" }}
          appData={this.props.byBuildData}
        />
        {this.props.byBuildData &&
          this.props.byBuildData.data &&
          this.props.byBuildData.data.length === 0 && (
            <p>
              The combination doesn't have any sessions with meanSendingRate
            </p>
          )}
      </Column>
    );
  }
}

export default connect(
  state => ({
    buildNames: state.stats.buildNames,
    buildVersions: state.stats.buildVersions,
    byBuildData: state.stats.byBuildData
  }),
  {
    getBuildNames: StatsActions.getBuildNames,
    getBuildVersions: StatsActions.getBuildVersions,
    getByBuildData: StatsActions.getByBuildData
  }
)(RatePerBuildNameAndVer);
