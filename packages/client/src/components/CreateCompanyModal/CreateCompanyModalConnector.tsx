import * as React from "react";
import { CreateCompanyModalView } from "./view/CreateCompanyModalView";
import { CreateCompanyModalController } from "./CreateCompanyModalController";

export class CreateCompanyModalConnector extends React.PureComponent {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;

    return (
      <CreateCompanyModalController>
        {({ submit }) => (
          <CreateCompanyModalView
            visible={visible}
            submit={submit}
            showModal={this.showModal}
          />
        )}
      </CreateCompanyModalController>
    );
  }
}
