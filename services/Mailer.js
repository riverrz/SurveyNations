const sgMail = require("@sendgrid/mail"); // separate Node package
const helpers = require("@sendgrid/helpers"); // separate Node package
const keys = require("../config/keys"); // some place where you store your API keys

class Mailer extends helpers.classes.Mail {
  // Through the use of Static methods from the Mail helper Class, you create a sendgrid compliant instance that can be send easily
  constructor({ subject, recipients }, content) {
    super();
    this.setFrom("no-reply@surveynations.com"); // uses the EmailAddress.create method
    this.setSubject(subject);
    this.addHtmlContent(content); // same as addContent, but more specific for HTML

    this.recipients = recipients.map(({ email }) =>
      helpers.classes.EmailAddress.create(email)
    );

    this.setTrackingSettings({
      clickTracking: { enable: true, enableText: true }
    });

    this.addTo(this.recipients); // This uses the personalization method in the background
  }

  // To separate our data from what we send out, we create another function
  async send() {
    sgMail.setApiKey(keys.sendGridKey);

    return await sgMail.send(this.toJSON()); // attach the current instance to be send out with SendGrid
  }
}

module.exports = Mailer;
