import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import styled from "styled-components";

const StyledApp = styled(App)`
  width: 100%;
`;

render(
  <Provider store={store}>
    <StyledApp />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
