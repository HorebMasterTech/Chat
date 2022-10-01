import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import InputEmoji from "react-input-emoji";
import { createPost, updatePost } from '../redux/actions/postAction';
import { imageShow, videoShow } from '../utils/mediaShow';

const StatusMedia = () => {

  const { auth, theme, status, socket } = useSelector(state => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const [stream, setStream] = useState(false)
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState('')


  const handleChangeImages = e => {
    const files = [...e.target.files]
    let err = ""
    let newImages = [];

    files.forEach(file => {
      if (!file) return err = "Aucun fichier choisit."

      if(file.size > 250 * 1024 * 5) {
        return err = "Merci de choisir des images en dessous de 1mb"
      }

      if(file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png'){
        return err ="Le format de l'image est incorrect. Merci de choisir une image dans les formats .png/.jpg/.jpeg"
      }

      return newImages.push(file)
    })

    if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} });
    setImages([...images, ...newImages])
  }
  
  const deleteImages = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleStream = () => {
    setStream(true);
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
        const track = mediaStream.getTracks()
        setTracks(track[0])
      }).catch(err => console.log(err))
    }
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    let URL = refCanvas.current.toDataURL()
    setImages([...images, {camera: URL}])
  }

  const handleStopStream = () => {
    tracks.stop();
    setStream(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(images.length === 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: {error: "Merci d'jouter au moins une photo"} })

    if(status.onEdit){
      dispatch(updatePost({ content, images, auth, status }))
    } else {
      dispatch(createPost({ content, images, auth, socket }))
    }

    setContent('')
    setImages([])
    if(tracks) tracks.stop()
    dispatch({ type:GLOBALTYPES.STATUS, payload:  false })
  }

  useEffect(() => {
    if(status.onEdit){
        setContent(status.content)
        setImages(status.images)
    }
},[status])

  return (
    <div className='pt-20 pb-20 status_modal'>
      <form>
        <div className="status_header">
          <h5 className='m-0'>Créer un post</h5>
          <span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>&times;</span>
        </div>

        <div className="status_body"
          style={{ filter: theme ? 'invert(1)' : 'invert(0)', 
          color: theme ? 'white' : '#111',
        }}
        >
          <InputEmoji
            value={content}
            onChange={setContent}
            placeholder={`${auth.user.username}, à quoi pensez-vous ?`}
            theme="dark"
          />
 
          <div className="show_images">
              {
                images.map((img, index) => (
                  <div key={index} id="file_img">
                    {
                      img.camera ? imageShow(img.camera, theme)
                      : img.url ? <>{ img.url.match(/video/i) ? videoShow(img.url, theme) : imageShow(img.url, theme) }</>
                      : <>{ img.type.match(/video/i) ? videoShow(URL.createObjectURL(img), theme) : imageShow(URL.createObjectURL(img), theme) }</>
                    }
                    <span onClick={() => deleteImages(index)}>&times;</span>
                  </div>
                ))
              }
          </div>

          {
            stream && 
            <div className='stream position-relative'>
              <video autoPlay muted ref={videoRef} width="100%" height="100%"
              style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: 'none' }} />
            </div>
          }

          <div className="input_images">
            {
              stream 
              ? <i className="fas fa-camera" onClick={handleCapture}/> 
              : <>
                <i className="fas fa-camera" onClick={handleStream}/> 

                  <div className="file_upload">
                    <i className="fas fa-image" />
                    <input type="file" name="file" id="file"
                    multiple accept='image/jpeg, image/jpg, image/png, video/*'
                    onChange={handleChangeImages} />
                  </div>
              </>
            }
          </div>
        </div>

        <div className="text-right status_footer">
          <button onClick={handleSubmit} type='submit' className='text-white normal-case border border-0 bouton btn-primary rounded-50 shadow-0 btn-sm'>Valider</button>
        </div>

      </form>
    </div>
  )
}

export default StatusMedia;