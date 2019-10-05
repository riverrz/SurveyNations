// This shows SurveyForm and SurveyFormReview

import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import { reduxForm } from "redux-form";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = {
    showFormReview: false
  };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}
// Since defaut behaviour of redux-form is to destory form values when it is unmounted
// Thus making this component also attached to surveyForm we clear out the formValues
// in SurveyForm when this component is unmounted which is the case when Cance btn is clicked
export default reduxForm({
  form: "surveyForm"
})(SurveyNew);
