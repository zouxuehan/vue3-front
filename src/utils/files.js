const loadedJs = new Set()

function hasJs(url) {
  return loadedJs.has(url)
}

export function scriptImportJs(url) {
  return new Promise((resolve, reject) => {
    if (hasJs(url)) {
      console.log('文件已加载')
      resolve()
    } else {
      fileObj = document.createElement('script')
      fileObj.type = 'text/javascript'
      fileObj.src = url
      fileObj.onload = function () {
        loadedJs.add(url)
        resolve()
      }
      fileObj.onerror = function () {
        reject()
      }
    }
  })
}

function getFileType(name) {}
