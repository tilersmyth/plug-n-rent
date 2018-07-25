import * as React from "react";
import { ReactCookieProps } from "react-cookie";

import { uploadErrors } from "../../wizardUtils.ts/uploadErrors";

interface Props {
  currentStep: number;
  children: (
    data: {
      uploadOnChange: (info: any) => void;
      complete: () => void;
      uploadLoading: boolean;
      uploadState: {
        error: boolean;
        message: string | null;
      };
    }
  ) => JSX.Element | null;
}

export class Step3Controller extends React.PureComponent<
  Props & ReactCookieProps
> {
  state = {
    uploadLoading: false,
    uploadState: {
      error: false,
      message: null
    }
  };

  uploadOnChange = (info: any) => {
    const { status, response } = info.file;

    this.setState({
      uploadLoading: true,
      uploadState: { error: false, message: null }
    });

    if (status === "done") {
      const { success, path } = response;
      const message = success ? null : uploadErrors(path);
      console.log(response);

      this.setState({
        uploadLoading: false,
        uploadState: {
          error: !success,
          message
        }
      });
    }
  };

  complete = () => {
    console.log("donzo");
    return;
  };

  render() {
    console.log(this.props);
    if (this.props.currentStep !== 3) {
      return null;
    }

    const { uploadLoading, uploadState } = this.state;

    return this.props.children({
      uploadOnChange: this.uploadOnChange,
      uploadLoading,
      uploadState,
      complete: this.complete
    });
  }
}
