import Compressor from 'compressorjs';

/**
 * @param {*} image 图片 File对象
 * @param {*} backType 需要返回的类型 blob,file
 * @param {*} quality 图片压缩比 0-1,数字越小，图片压缩越小
 * 
 * compressorjs 默认开启 checkOrientation 选项 会将图片修正为正确方向 (解决拍照旋转90度问题)
 * 
 * 
 * 注意：如果使用了另外的压缩 quality 最好设置为 1 ，不然可能导致其他原因，导致上传图片失败
 */
export function compressorImage(image,backType='blob',quality){

  return new Promise((resolve) => {
    new Compressor(image, {
      quality: quality || 1,

      success(result) {
        let file = new File([result], image.name, { type: image.type })
        if (backType == 'blob') {
          resolve(result)
        }else{
          resolve(file)
        }
      },
      
      error(err){
        console.log('图片压缩或修正失败失败',err)
        resolve(image)
      }
    })
  })
}