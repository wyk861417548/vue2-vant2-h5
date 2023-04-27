/**
 * /**
 * 图片base64压缩
 * 支持input 或者传入base64
 * 等比缩放，不裁剪不变形
 *
 * @param {*} opt 
 * @param {*} opt.width 宽度 
 * @param {*} opt.height 高度
 * @param {*} opt.quality 质量 
 * 
 * @returns 
 */
export function kCompass(opt) {
  const width = opt.width ? opt.width : 800
  const height = opt.height ? opt.height : 800
  const quality = opt.quality ? opt.quality : 0.8

  const result = { code: 200, msg: '', result: {} }

  return new Promise((resolve, reject) => {
    
    // // base64模式
    if (opt.base64) {
      const img = new Image()

      img.onload = ()=> {
        result.result = kimageCompass(img, { width, height, quality})
        resolve(result)
      }

      img.src = opt.base64
      return;
    }

    // 输入文件模式
    if (opt.fileinput) {
      // 代表不是文件对象
      if (!opt.fileinput.name) {
        result.code = 400
        result.msg = '文件不存在'

        reject(result)
        return;
      }

      // 读取文件流 获取base64值
      kfilereader(opt.fileinput, { callbackType: 'image' }).then((imgdata) => {
        result.result = kimageCompass(imgdata,{ width, height, quality })
        resolve(result)
      })
    }
  })
}

/**
 * @param {Object} dataurl
 * @param {Object} filename
 * 将base64转换为文件
 */
export function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename + '.' + mime.split('/')[1], { type: mime })
}
/**
 * 图压缩 base64图片数据
 */
function kimageCompass (img, opt) {
  opt = opt || {}
  const canvas = document.createElement('canvas')

  if (img.width > opt.width || img.height > opt.height) {
    if (img.width >= img.height) {
      img.height *= opt.width / img.width
      img.width = opt.width
    } else {
      img.width *= opt.height / img.height
      img.height = opt.height
    }
  }

  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, img.width, img.height)

  ctx.drawImage(img, 0, 0, img.width, img.height)

  return canvas.toDataURL(opt.filetype ? opt.filetype : 'image/jpeg', opt.quality ? opt.quality : 0.8)
}

 /**
   * 读取文件 input file 数据
   */
function kfilereader(file, opt) {
  opt = opt || {}
  const filereader = new FileReader()

  return new Promise((resolve) => {
    filereader.onload = function (evt) {
      if (opt.callbackType === 'image') {
        const img = new Image()

        img.onload = function () {
          resolve(img)
        }

        img.src = evt.target.result
        return false
      }

      resolve(evt.target.result)
    }

    // 即将被读取的 Blob 或 File 对象。
    filereader.readAsDataURL(file)
  })
}