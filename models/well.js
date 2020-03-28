import {
  HTTP
} from '../utils/http.js'

export class WellModel extends HTTP {
  wellInsert(onsex, name, xh, sclass, room, qq, tel, content, email, sCallback) {
    this.request({
      url: `App.Well.Insert&sex=${onsex}&name=${name}&email=${email}&stuno=${xh}&class=${sclass}&room=${room}&tel=${tel}&content=${content}&qq=${qq}`,
      success: (res) => {
        sCallback(res)
      }
    })
  }
}