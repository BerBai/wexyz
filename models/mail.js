import {
  HTTP
} from '../utils/http.js'

export class MailModel extends HTTP {
  feedback(content, name, mail='', sCallback) {
    this.request({
      url: `App.Mail.FeedbackMail&content=${content}&name=${name}&mail=${mail}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
}