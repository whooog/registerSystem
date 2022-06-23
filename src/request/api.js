import httpRequst from './http'

export default {
    uploadImg(param){
        return new Promise((resolve, reject) => {
            let formData = new FormData()
            formData.append('file',param.file)
            httpRequst.post('api/upload/upload', formData).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}




