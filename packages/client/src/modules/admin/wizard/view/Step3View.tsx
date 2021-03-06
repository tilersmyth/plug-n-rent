import * as React from "react";
import { Card, Upload, Icon, Spin, Alert } from "antd";
import { StepActionView } from "./StepActionView";
import { LocationType } from "../wizardTypes";

const Dragger = Upload.Dragger;

interface Props {
  Location: LocationType;
  steps: number[];
  prev?: () => void;
  complete: () => void;
  onChange: (info: any) => void;
  loading: boolean;
  uploadState: {
    error: boolean;
    message: string | null;
  };
}

export class Step3View extends React.PureComponent<Props> {
  render() {
    const {
      steps,
      prev,
      Location,
      onChange,
      loading,
      uploadState,
      complete
    } = this.props;

    const props = {
      name: "file",
      multiple: false,
      showUploadList: false,
      action: "http://localhost:4000/csv-upload",
      data: { locationId: Location.id },
      onChange
    };

    return (
      <React.Fragment>
        <Card className="steps-content">
          <h1>{`So far, so good! Now just add rental products.`}</h1>
          <Dragger {...props}>
            <div className="dragger-wrapper">
              <div className="ant-upload-drag-icon">
                {!loading ? <Icon type="table" /> : <Spin size="large" />}
              </div>
              <p className="ant-upload-text">
                Upload .CSV file containing product details
              </p>
              <p className="ant-upload-hint">
                Click or drag file to this area to upload
              </p>
            </div>
          </Dragger>
          <small className="dragger-caption">
            <a href="#">
              Click here for CSV template and information on formatting
              requirements
            </a>
          </small>

          {uploadState.error && (
            <Alert
              message={uploadState.message}
              type="error"
              className="upload-error-message"
            />
          )}
        </Card>
        <div className="steps-action">
          <StepActionView
            currentStep={3}
            steps={steps}
            prev={prev}
            complete={complete}
          />
        </div>
      </React.Fragment>
    );
  }
}
