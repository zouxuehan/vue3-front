import { scriptImportJs } from '../files'

const jsApiList = [
  'copyToClipboard',
  'uploadRemoteFileToDisk',
  'chooseSpaceDir',
  'createChatGroup',
  'openChat',
  'createVideoMeeting',
  'createDing',
  'searchOnMap',
  'showOnMap',
  'startGeolocation',
  'locateOnMap',
  'getGeolocation',
  'chooseVideo',
  'chooseDepartments',
  'chooseContactWithComplexPicker',
  'chooseContact',
  'previewDoc',
  'stopAudio',
  'resumeAudio',
  'pauseAudio',
  'playAudio',
  'downloadAudio',
  'stopRecordAudio',
  'stopRecordAudio',
  'onRecordAudioEnd',
  'onAudioPlayEnd',
  'showQuickCallMenu',
  'showCallMenu',
]
function getTicket() {
  return
}
export default {
  init(opt) {
    return new Promise((resolve, reject) => {
      let { sdkurl } = opt
      scriptImportJs(sdkurl)
        .then(() => {
          dd.ready(async () => {
            const ticket = await getTicket()
            dd.authConfig({
              ticket,
              jsApiList,
            })
              .then(() => {
                resolve()
              })
              .catch(() => {
                reject()
              })
          })
        })
        .catch((e) => {
          reject()
        })
    })
  },
}
