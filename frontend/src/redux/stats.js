export const actionTypes: { [string]: string } = {
  GET_APPIDS: "GET_APPIDS",
  GET_BY_APPID_DATA: "GET_BY_APPID_DATA",
  GET_BY_BUILD_DATA: "GET_BY_BUILD_DATA",
  GET_BUILD_NAMES: "GET_BUILD_NAMES",
  GET_BUILD_VERSIONS: "GET_BUILD_VERSIONS",
  GET_BY_MEDIA_TYPE: "GET_BY_MEDIA_TYPE",
  SERVER_CONNECTION_VERIFIED: "SERVER_CONNECTION_VERIFIED"
};

export const StatsActions = {
  verifyServerConnection: () => {
    return async (dispatch: Action => void) => {
      try {
        console.log("ag");
        const response = await fetch("http://localhost:8081/");
        if (response.ok) {
          console.log("eg");
          dispatch({
            type: actionTypes.SERVER_CONNECTION_VERIFIED
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  },
  getAppIds: () => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch("http://localhost:8081/app");

        if (response.ok) {
          const json = await response.json();
          dispatch({
            type: actionTypes.GET_APPIDS,
            value: json
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  },
  getMeanSentRateByAppData: appId => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch(`http://localhost:8081/app/${appId}/avg`);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          const result = json.reduce(
            (result, element) => {
              if (element.avg !== "") {
                result.data.push(element.avg);
                if (element.appID) {
                  result.labels.push(element.appID);
                }
              }

              return result;
            },
            { labels: [], data: [] }
          );

          dispatch({
            type: actionTypes.GET_BY_APPID_DATA,
            value: result
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  },
  getBuildNames: () => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch("http://localhost:8081/build");

        if (response.ok) {
          const json = await response.json();
          const result = json.reduce((result, element) => {
            if (element.buildName !== "") {
              result.push(element.buildName);
            }

            return result;
          }, []);
          console.log(result);
          dispatch({
            type: actionTypes.GET_BUILD_NAMES,
            value: result
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  },

  getBuildVersions: buildName => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch(
          `http://localhost:8081/build/${buildName}`
        );

        if (response.ok) {
          const json = await response.json();

          dispatch({
            type: actionTypes.GET_BUILD_VERSIONS,
            value: json
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  },

  getByBuildData: (buildName, buildVer) => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch(
          `http://localhost:8081/build/${buildName}/${buildVer.replace(
            "/",
            "%2F"
          )}`
        );
        console.log(buildName, buildVer);
        if (response.ok) {
          const json = await response.json();
          const result = json.reduce(
            (result, element) => {
              if (element.avg !== "") {
                result.data.push(element.avg);
              }

              return result;
            },
            { data: [] }
          );
          console.log(result);
          dispatch({
            type: actionTypes.GET_BY_BUILD_DATA,
            value: result
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  },
  getByMediaTypes: appId => {
    return async (dispatch: Action => void) => {
      try {
        const response = await fetch(`http://localhost:8081/media/${appId}`);

        if (response.ok) {
          const json = await response.json();

          const result = json.reduce(
            (result, element) => {
              result.data.push(element.count);

              if (element.mediaType === "") {
                result.labels.push("Unknown");
              } else {
                result.labels.push(element.mediaType);
              }
              return result;
            },
            { labels: [], data: [] }
          );

          dispatch({
            type: actionTypes.GET_BY_MEDIA_TYPE,
            value: result
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
  }
};

const initialState = {
  appIds: [],
  byAppIdsData: {},
  byBuildData: [],
  buildNames: [],
  buildVersions: [],
  byMediaTypeData: {},
  connectedToServer: false
};

export default function reducer(
  state: STATS_STATE = initialState,
  action: Action
): STATS_STATE {
  switch (action.type) {
    case actionTypes.SERVER_CONNECTION_VERIFIED:
      return {
        ...state,
        connectedToServer: true
      };
    case actionTypes.GET_APPIDS:
      return {
        ...state,
        appIds: action.value
      };
    case actionTypes.GET_BY_APPID_DATA:
      return {
        ...state,
        byAppIdsData: action.value
      };
    case actionTypes.GET_BY_BUILD_DATA:
      return {
        ...state,
        byBuildData: action.value
      };
    case actionTypes.GET_BUILD_NAMES:
      return {
        ...state,
        buildNames: action.value
      };
    case actionTypes.GET_BUILD_VERSIONS:
      return {
        ...state,
        buildVersions: action.value
      };
    case actionTypes.GET_BY_MEDIA_TYPE:
      return {
        ...state,
        byMediaType: action.value
      };
    default:
      return state;
  }
}
