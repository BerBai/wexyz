//about.js
//获取应用实例
var app = getApp();
const icon = 'data:image/png;base64,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'
const share = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGVklEQVR4Xu2aeaxdUxTGf99fIoIQMYSKIRUzNY+hJCpmpQg1BkXVVPMQ8xxSBEUEbQUtbUwRJQjamGcasyCmIoKIIXyyXs9pdk/vfeee++717n3Pl9w/3jtr77PWd9bee629lhjk0CC3n/8J6AYPsL0oMBT4G5gj6Z9W6d0VHmD7OWCbxOg5wHvJ7wPgA0m/ViWm4wmwvTHwSoOGBRFBTvx6SMmImVtvfDcQsBTwY4ME1BP7BHi/QMqTIdzxBISStlcBjgPWBtYCVusjITH8I0lDu4KAorG2VwTWzcgIUnJilq5CjAJVBnS6rO04KdbLyNkBGAYsUXf9DzQCsuWyCHAecE7JB3tV0iYDzQN2zYzfvAFv3VHSUwOCANvx1S8HTq5j+Cxg6+TZF5JW7ppToLevaXt14HZguxpyjwOXAuOBPZPnl0iKZdIdx2A9AmxvD9wDLF+Q+T4MlzTB9qpAxAEp1pEUkWQ1ArKobHdguewXQUpVPALEBvRM1YGpvO3RwOQac0wBLpMU0WDEEOcCFydysyXNXw4N7QG2DwHGApv1Relk7ARJ9dZr6Stsn5mt+aLs6ZKuLhAVYXSE0znGSLo1/6NXAmxvlK2hnUu1qiYwTdJ+1YbMk7Z9GnBVYWxkiUdKurNg/FZAbIApVpD0TSkBtsPox5pRsmTMZ8A4SbEUKsH20cAthUHfhmdK+rw4me2JwJjk//dJOiCVq+kBtk8Arquj3VvAm8BLwDuVLIhNp8m1b/tEYELhfc9IGl5PB9vxpWO/yjFK0v29EmB7R6AnUypgBnClpBerGt1XedtnxcZW0fh9gWnJmO+AIZL+LCMg3L645g+VNKmvhjQz3vYpwDVVjA9Z2w8CeyTjrpN0UlGHBZZAttvfVRC6UdLxzSjf1zG24xYovDEivRxxfO4h6ZdeXH9J4KfC857Qt4yAF4A0jn5L0gZ9NaSZ8Vl4G8anV2Gx5+wpqRjYLPAK2+OA65N/9iQ+tfSY7wG2I79+uyA0QtLMZgzo6xjb4fbh/il2lhThba+wHRv0ponQ+ZIuKiPgAuD8RlgrU6Cvz23vD9xbmOcsSVeUzW17zexOMBUdJumNMgJuBo5JhG6VlJ6hZe9uyXPbQ4BY5+m111RJQUopsvzg6UTwCUk71RuYLoHpwN6J4AIhY+mbWyRgO+KPiENyfAjsJCkCqFLYXh+IZZuf/4cXI8R0kpSAYC2yqxzDmw1aSrWsI2A7gpriTj1SUsQgDcP2XsCGwLuS0lhgoTk6jYBHgV0SLadIOrhhy5sQ7BgCbB8FzM/SgD+ArSS91oRdDQ/pCAJsL5NlbWskml8hKULgtqJTCDgDSI+4j4EtJdUtabWKlU4h4PVs08rtGivpplYZ2ds8/U6A7WLWFmHuepJ+GywExDEVJOT4T9Z+/rJ+9QDbcVaH+6eoG7a2wyP6m4DY+GIDzDFd0j7tMLTenP1NQFxdR/KS4wBJ9w0KAmxHfv5yYuxnkqKI0VZEspSG+P3mAbZPBdI7/DskHdEu621H78ADWb7zsKSe67L+JOBhYLfE4EMk1ar0tIQT24cBdySTjZZ0d38S8DOweKbQX5H/S/qyJdbWmMR28cLnQkkX9AsBtrcFnk30nClpRLuMj3k7jYDi1zhbUtT324ZOI2AUMDWzNq6v4/Kl5p1dqxjpKAIyl4wiRRQvJzVTJ6xKTCMEPARE7T/HgZKi+WBAwHZ0kaTH7LGSJqabYFRdo/qa4xpJcVYPCNiOgm5cmObYWtLslIDixtRr5bWbWMlunIqXK4tHc3VKQLEpOWpvkZnF7UxXw3ZEfVEszfG8pDiKF+wRsh2NQ9GLm2OGpJFdbf28GKBY8xwv6dpaBJydtcSkNh8t6bZuJaHG7v8psIWk6BdYyAMWA4KtKJSmWF5StKJ0FWyH90YClOIkSfO7XxZqkanTIxATRLPhDZIibu9oZKl2ZJpppSt0Xqg5q16PUPFEyA2OIkWUniNqmyWpco9Qu5izHeXw+MU9Q9wx5olW/sq5kpYtvr9um5ztg4BoOhwI+AFYSdLvDRMQgrYjZo9GhShZdyuiUTJ6nHpaYysRkJEQ7bBRoAyPaFWn6H9BZhRaJ5fdMTbUKptr26Je4XYZ/zXwFRBtfE9LiobpUlQioHS2LhT4n4Au/GgtVXnQe8C/XLCLX/mHnvkAAAAASUVORK5CYII="
const welcome = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEm0lEQVR4Xu2bS8xdUxTHf/+RaBAS4hUGHhNCCKI60kgUAw0RIcpADMT7Ee8EHWgR0QjaQdNRiVcRnYgmwgilpdEwEAyIVyIIQoz+sj7n3Ozv9Jx7z7333POd73N2cpN7c9bea63/XXutddbeS0w5bD8MPARsAR6V9OWUSw6dbvtK4BLgJGCbpOA/8dDEM7OJtr8Djsp+3iLp6WnXHDbf9qvApRnN95KOnoZfEwA4EWDttP/IKGVsvwOcm9NJmkqHWpNtHwocBywrETAEysda4N1RSkz5PLbbAABgZcl6fwFfS/p5FK9KAGxfBtwKHA8cOWqhjj7/AfgKeErStjIZSwGwHfv4po4qNalYz0i6uTh5HwBsv5Z52UkZdXne65JyBzon5zwAbJ8PvFXQIH5/AOwC/uyydolsBwBnAsuBVQWZV0naMXCi+RfbhwO7gTSszNyrzxrQJE/JWUXYPkPST/MswPaTwO2JQFdLem7WAraxvu01wNaE1wZJdxQBeA84JyPaIaloOm3IOjMetmMrxxaP8b6kFQMAbO8PROzMx3pJ989MmgVY2PY64L6E9TJJf885QduRWKQJzUpJs05oWoWhSscegMVuAbYvBC4HPgJelPRLmWktSQuwfRWQRqo1kp7/XwBg+9qsBpHqe5GkN5c8ALavBzYVFH1J0hVVnnVRbYEse4u30T3AOkmf54rZvg3YUFB0q6RrhoWVxQZAWmX6LJxcgGD7nii7FRTdIum6UTF1sQEQji0cXD4ChJeBKLikY5OkG0YpPyzSjZ0H2D4oS5nztLkO/2E0kXDtlvRHYuZR8AyFTx4yMYocsR1qjcYswPZjwN21uNYnelxSmPdg2B4GwhOS7qq/fHW2O4kFPAvUMrsxBNwo6cYifQUI4RQfGGPtOdImLeBi4MF4px5XiAr62ALxerq97HkGQji+4Ld50qpzYwA0pHTry/QAVLzxju0DWv/rGmLYW0BvAeVFn34LDIuRDW2/TizTmA/IFio7cFhoRV9ppSJkezMw8u1rgdCYfUXI9r3A+gVScBTbCyQVj/YaT4WjhB6vqieMkqbl5x8Cj0j6vSKlLi3991GgjwL9yVB/NNafDfaHo2OeDts+bETBsuUIOMcuzvz/qWLcZCp8JxAFzAChS+PjqFVK2jnTPKB4U7NLCMS5QVXNsEkLiPs2G4EDO6b8F3G9Lz1GS+VrDIAscYqbZCd2DICdceVl5j6gY0rXFqdRC6jNtUOEPQB9UbQvivb1gLK7kH1BpC+I/FcQOQ34JIlaq6uOqzsU2cYSxXYc67+RTDpd0p5Bw4TtX4GDM4Lo/0svFo/FrIvEtqOSHRXtGL9JOiS+pAAEOoFSjL3ACkmLpUNkKOa2o4Mk2gFOyQi3S1pdBCDvAM0XWzI9A4VegdBv8NZY7Bn6NEFpHmEXzbqOTCUtM3slnZrPLQJwdtYgla79NvAj8C1QWXGpI0yLNPsBxwBHAOcV+C5PiyZlbXPFrdCi3DNntU/BpKpx8tjsSmp0ai+F8UJEAEnfFJUZ2juctc9G/91Z2adrVaCqPydunUYDRXx2VbXNxuR/Ace19F/muLscAAAAAElFTkSuQmCC"
const myInfo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADpklEQVR4Xu1bQYhNURj+PixQFItRShRSZlIkJQsmYWEhE4oN1grJ3szCWil2SoqpGRuxsjELsbIgQ6EoNpIslO2n8zr3dd5959x737t35t375px6m3fvOfd83/n/7//Pf+4lSjZJuwCsLzlMme4/SH7pdwD229H0kzQJ4EaZMSrqO0ryQz9jlSXgBYBD/Ty44j7jJOf6GbNKAsb7mUDJPmYBTBs8ASRLkdkrEZKM5UUCogVEF4gaEEVw6KOATbjukPyVRIslEQUkrQAwDeAUgHmSY0uGAEmrLPgTFvRdkpeWBAGS1ljwxy3gWZJn3GRpaF1A0joL/lgIvN2INSMTlLQFwBjJZ3nprqQRAI8AHM4C3zQCPgPYBmCKpNk+e5ukjRb8wTzwTSPgFYD9FpSXBEmbATwEcKAI+KYRsBPADIBRC26S5JSj5lvtyu8rCr5RBNjJekmQtMOC39ML+MYRECIBwAQAU1M0rSvUZYlmI8OgpLQlJBh7At9IC3B8Pk1Cz+AbTYDjDjcBfCd5OS8/8F1fFBeQtNuGJlPwDNX+W1XhAdcEQxXhbwDukXwZIjlYyJR0FYBZpdVFVmjABORN8SmAa74DFC8BkrYDeAdgZd7IyfWaE2CmeZvklTSeEAHuic8sgFskX6c7S2ofjAyYAO+5QEon/pDscuMQAe6Jz4hbiXFJqDsBVnDdxewiKkSALNA5ksETn0hAzV2gcguQdAHA+ZQW1C0M/gVwneSnhSDgdygfGLAIpvV5muS5hSAg0Yb0AzOLHUVDaS/3SVoL4EngeL6tXal3GMqJoKSEgEUHXIQcR5QjAUn0ihbQ+RrPaZKPXWvqKQ9oqAu45fN/AE6SfN5O4QNbTW8i1EQCPJHgpyWhldp3WYB97e2tLxN0CCiiSYO8pyuDTWmBKdVPkHzfQYCkowAeANhgZ9+h9pK+AjAHHXVv90le9Gze3H1BK1doE2DrdfNOp65QZzPBphBgiiFdLR0qWwR4ipW1jPNVmF2IAHMed7atjIv8ylsVwIqMIekIgCQCtHQisYD0G597Sb4pMmhT7vFYeSYBBpcRjBmSH5sC0iN6Rq82mbAHwGyOEnE3t+YSkIxnLMEcbS8DsDz18/1n7qnL/1lrV5iAphpA3rwjAVkimMfeMFyPFhAtICMPGAYTz8MQXSC6QHSB8F4gz3+G4XrUgKgBUQOiBgQLIsMgcnkYOkSwLh9B5026yuutuqdbFa7DR9BVAswcK/nY+j/UluZfD8OJ9QAAAABJRU5ErkJggg=="
const buttons = [{
    openType: 'share',
    label: '分享',
    icon: share,
  },
  // {
  //   openType: 'launchApp',
  //   label: '我的报名',
  //   icon: myInfo,
  // },
  {
    label: '报名',
    icon: welcome,
  },
]

Page({
  data: {
    version: '',
    showLog: false,
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
    typeIndex: 3,
    colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
    colorIndex: 4,
    dirs: ['horizontal', 'vertical', 'circle'],
    dirIndex: 1,
    sAngle: 0,
    eAngle: 360,
    spaceBetween: 10,
    buttons,
  },
  copyText: function(e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '内容复制成功'
            })
          }
        })
      }
    })
  },
  onChange(e) {
    console.log('onChange', e)
  },
  onClick(e) {
    console.log('onClick', e.detail)
    if (e.detail.index === 1) {
      wx.navigateTo({
        url: "welcome/welcome"
      })
    }
  },
  onContact(e) {
    console.log('onContact', e)
  },
  onLoad: function() {
    this.setData({
      version: app.version,
      year: new Date().getFullYear()
    });
  },
  toggleLog: function() {
    this.setData({
      showLog: !this.data.showLog
    });
  }
});