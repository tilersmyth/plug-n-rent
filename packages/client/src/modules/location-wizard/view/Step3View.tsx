import * as React from "react";
import { Card, Upload, Icon, Button } from "antd";
import { StepActionView } from "./StepActionView";
import { LocationType } from "../wizardTypes";

const Dragger = Upload.Dragger;

interface Props {
  Location: LocationType;
  steps: number[];
  prev?: () => void;
  // submit: (values: any) => void;
}

export class Step3View extends React.PureComponent<Props> {
  render() {
    const { steps, prev, Location } = this.props;
    const props = {
      name: "file",
      multiple: false,
      action: "http://localhost:4000/csv-upload",
      data: { locationId: Location.id },
      onChange(info: any) {
        console.log(info);
      }
    };

    return (
      <React.Fragment>
        <Card className="steps-content">
          <h1>{`So far, so good! Now just add rental products.`}</h1>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Upload .CSV file containing product details
            </p>
            <p className="ant-upload-hint">
              Click or drag file to this area to upload.
            </p>
          </Dragger>
          <small className="dragger-caption">
            <a href="#">
              Click here for CSV template and information on formatting
              requirements
            </a>
          </small>
          <h3 className="step3-divider">OR</h3>
          <Button size="large" className="step3-btn">
            Add products later
          </Button>
        </Card>
        <div className="steps-action">
          <StepActionView currentStep={3} steps={steps} prev={prev} />
        </div>
      </React.Fragment>
    );
  }
}
