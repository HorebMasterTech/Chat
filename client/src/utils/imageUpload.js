export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 250 * 1024) // 1mb
    err = "l'image ne doit pas depasser 250ko."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg' )
    err = "Le format de l'image est incorrecte."
    
    return err;
}


export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData()

        if(item.camera){
            formData.append("file", item.camera)
        }else{
            formData.append("file", item)
        }
        
        formData.append("upload_preset", "yyywc9xo")
        formData.append("cloud_name", "horeb-technology")

        const res = await fetch("https://api.cloudinary.com/v1_1/horeb-technology/upload", {
            method: "POST",
            body: formData
        })
        
        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}