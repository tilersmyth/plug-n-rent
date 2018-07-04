import * as React from "react";
import { Form, Card, Button, Row, Col } from "antd";
import {
  withFormik,
  FormikErrors,
  Field,
  FormikProps,
  Form as FForm
} from "formik";

import { StepActionView } from "./StepActionView";
import { LocationType, AddressType } from "../wizardTypes";
import { AddressController } from "../controller/AddressController";
import { InputField } from "../../shared/InputField";
import { validAddressSchema } from "../wizardSchemas";

const FormItem = Form.Item;

interface Props {
  Location: LocationType;
  setAddress: any;
  tempAddress: AddressType;
  resetAddress: (e: any) => void;
  steps: number[];
  prev?: () => void;
  submit: (values: any) => Promise<FormikErrors<any> | null>;
}

class C extends React.PureComponent<FormikProps<any> & Props> {
  render() {
    const {
      Location,
      setAddress,
      tempAddress,
      resetAddress,
      steps,
      prev
    } = this.props;

    return (
      <React.Fragment>
        <FForm>
          <Card className="steps-content">
            <h1>{`Now, enter location details for ${Location.name}`}</h1>

            {// tslint:disable-next-line:jsx-no-multiline-js
            !tempAddress.address ? (
              <FormItem label="Location address" colon={false}>
                <AddressController setAddress={setAddress} />
              </FormItem>
            ) : (
              <div className="address-container">
                <p className="address-label">
                  Location address (<a href="#" onClick={resetAddress}>
                    Edit address
                  </a>)
                </p>
                <Field
                  className="readonly"
                  name="address"
                  size="large"
                  component={InputField}
                />
                <Field name="address2" size="large" component={InputField} />
                <Row gutter={16}>
                  <Col lg={10} md={24}>
                    <Field
                      className="readonly"
                      name="city"
                      readOnly={true}
                      size="large"
                      component={InputField}
                    />
                  </Col>

                  <Col lg={6} md={10}>
                    <Field
                      className="readonly"
                      name="state"
                      readOnly={true}
                      size="large"
                      component={InputField}
                    />
                  </Col>

                  <Col lg={8} md={14}>
                    <Field
                      className="readonly"
                      name="postalCode"
                      readOnly={true}
                      size="large"
                      component={InputField}
                    />
                  </Col>
                </Row>

                <Field name="lat" hidden={true} component={InputField} />
              </div>
            )}

            <Field
              label="Phone number"
              name="phone"
              size="large"
              placeholder="(555) 555-5555"
              component={InputField}
            />
          </Card>
          <div className="steps-action">
            <StepActionView currentStep={2} steps={steps} prev={prev} />

            <Button type="primary" className="btn-next" htmlType="submit">
              Next
            </Button>
          </div>
        </FForm>
      </React.Fragment>
    );
  }
}

export const Step2View = withFormik<Props, any>({
  validationSchema: validAddressSchema,
  enableReinitialize: true,
  mapPropsToValues: ({ Location, tempAddress }) => {
    return {
      locationId: Location.id,
      ...tempAddress,
      phone: Location.address ? Location.address.phone : tempAddress.phone
    };
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
