import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';

const EditProfile = ({ setOnEdit }) => {

    const initialState = {
        fullname: '',
        mobile: '',
        address: '',
        gender: '',
        story: '',
    };

    const [userData, setUserData] = useState(initialState);
    const { fullname, mobile, address, story }  = userData;

    const [avatar, setAvatar] = useState('');

    const { auth, theme } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file)
    if(err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
    setAvatar(file)
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateProfileUser({userData, avatar, auth}))
  }


    const handleInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]:value })
    }


  return (
    <div className='padding edit_profile'>
        <button className='text-white normal-case border border-0 bouton btn-primary rounded-0 shadow-0 btn-sm' onClick={() => setOnEdit(false)}>
            Fermer
        </button>

        <form >
            <div className="info_avatar">
                <img src={avatar ? URL.createObjectURL(avatar): auth.user.avatar} alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                <span>
                    <i className="fas fa-camera" />
                    <p>Changer</p>
                    <input type="file" name="file" id="file_up" accept='image/*' onChange={changeAvatar} />
                </span>
            </div>

            <div className="form_group mb-2">
                <div className="position-relative">
                    <label htmlFor="floatingPrenom">Prénom</label>
                    <input type="text" className="form-control" id="floatingPrenom" onChange={handleInput} value={fullname} name="fullname" />
                    <small className="form-text text-danger position-absolute" style={{ top: '60%', right: '5px', transform: 'translateY(-50%)' }}>
                    {fullname.length}/25
                    </small>
                </div>
            </div>

            <div className="form_group mb-2">
                <label htmlFor="floatingPrenom">Téléphone</label>
                <input type="text" className="form-control" id="mobile" onChange={handleInput} value={mobile} name="mobile" />
            </div>

            <div className="form_group mb-2">
                <label htmlFor="floatingPrenom">Adresse</label>
                <input type="text" className="form-control" id="address" onChange={handleInput} value={address} name="address" />
            </div>

            <div className="form_group">
                <div className="position-relative">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" value={story} cols="30" rows="4"
                    className="form-control" onChange={handleInput} />

                    <small className="form-text text-danger position-absolute" style={{ top: '25%', right: '5px', transform: 'translateY(-50%)' }}>
                        {story.length}/200
                    </small>
                </div>
            </div>

            <div className='my-3 text-center'>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" onChange={handleInput}  id="homme" value="homme" />
                    <label className="form-check-label" htmlFor="homme">Homme</label>
                </div>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" onChange={handleInput}  id="femme" value="femme" />
                    <label className="form-check-label" htmlFor="femme">Femme</label>
                </div>
            </div>

        <div className='text-end'>
            <button onClick={handleSubmit} className='text-white normal-case border border-0 bouton btn-primary rounded-0 shadow-0 btn-sm'>Enregistrer</button>
        </div>

        </form >

    </div>
  )
}

export default EditProfile;