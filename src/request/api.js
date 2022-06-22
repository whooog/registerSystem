import httpRequst from './http'

export default {
    uploadImg(file){
        return new Promise((resolve, reject) => {
            httpRequst.post('api/upload/upload', {
                file
            }, 'gameToken').then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}




