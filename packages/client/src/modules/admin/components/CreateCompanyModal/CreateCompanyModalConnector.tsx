import * as React from "react";
import { CreateCompanyModalView } from "./view/CreateCompanyModalView";
import { CreateCompanyModalController } from "./CreateCompanyModalController";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  children: (
    data: {
      open: () => void;
    }
  ) => JSX.Element | null;
}

class C extends React.PureComponent<Props & RouteComponentProps<{}>> {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onFinish = (id: string) => {
    this.props.history.push(`/admin/new/${id}`);
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        {this.props.children({ open: this.showModal })}
        <CreateCompanyModalController>
          {({ submit }) => (
            <CreateCompanyModalView
              visible={visible}
              submit={submit}
              handleCancel={this.handleCancel}
              onFinish={this.onFinish}
            />
          )}
        </CreateCompanyModalController>
      </div>
    );
  }
}

export const CreateCompanyModalConnector = withRouter(C);
