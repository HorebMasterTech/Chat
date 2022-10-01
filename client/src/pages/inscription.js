import React, { useState, useEffect } from 'react';
import { register } from '../redux/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Inscription = () => {
  
  const { auth, alert } = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = { 
    fullname: '', username: '', email: '', password: '', cf_password: '', gender: ''
}
const [userData, setUserData] = useState(initialState)
const { fullname, username, email, password, cf_password } = userData

const [typePass, setTypePass] = useState(false)
const [typeCfPass, setTypeCfPass] = useState(false)

useEffect(() => {
  if(auth.token) navigate("/", { replace: true })
}, [auth.token, navigate])

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]:value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(userData))
  }
  return (
    <div className='auth_page'>

      <form onSubmit={handleSubmit}  className='bg-white shadow-sm formulaire_global' style={{ width: '440px' }}>
      <h1 className='my-5 text-center fs-5'>Inscrivez-vous maintenant</h1>

        <div className="row">

          <div className="col-md-6">
            <div className="mx-5 mb-2">
              <label htmlFor="floatingPrenom">Prénom</label>
              <input type="text" className="form-control" id="floatingPrenom" onChange={handleChangeInput} value={fullname} name="fullname" />
              <small className="form-text text-danger">
                {alert.fullname ? alert.fullname : ''}
              </small>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mx-5 mb-2">
              <label htmlFor="floatingNom">Nom</label>
              <input type="text" className="form-control" id="floatingNom" onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')} name="username" style={{background: `${alert.username ? '#fd2d6a14' : ''}`}}/>
              <small className="form-text text-danger">
                {alert.username ? alert.username : ''}
              </small>
            </div>
          </div>

        </div>


        <div className="mx-5 mb-2">
          <label htmlFor="floatingEmail">Email address</label>
          <input type="email" className="form-control" id="floatingEmail" onChange={handleChangeInput} value={email} name="email" style={{background: `${alert.email ? '#fd2d6a14' : ''}`}} />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ''}
          </small>
        </div>

        <div className='mx-5 my-2 pass'>
            <label htmlFor="floatingPassword">Password</label>
            <input className="form-control" id="floatingPassword" type={typePass ? 'text' : 'password'} onChange={handleChangeInput} value={password} name="password" style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'cacher' : 'voir'}
          </small>

          <small className="form-text text-danger">
            {alert.password ? alert.password : ''}
          </small>
        </div>

        <div className='mx-5 my-2 pass'>
            <label htmlFor="floatingPassword">Confirm Password</label>
            <input className="form-control" id="cf_password" type={typeCfPass ? 'text' : 'password'} onChange={handleChangeInput} value={cf_password} name="cf_password" style={{background: `${alert.password ? '#fd2d6a14' : ''}`}} />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typePass ? 'cacher' : 'voir'}
          </small>

          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ''}
          </small>

        </div>

        <div className='mt-3 text-center'>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" onChange={handleChangeInput}  id="homme" value="homme" />
            <label className="form-check-label" htmlFor="homme">Homme</label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" onChange={handleChangeInput}  id="femme" value="femme" />
            <label className="form-check-label" htmlFor="femme">Femme</label>
          </div>
        </div>


        <div className='mx-auto text-center d-block text-connexion' style={{ minWidth: '19rem', width: '20rem' }}>
          <p className='w-full text-sm'>
            Déjà un compte ? <Link to='/' className='text-red-400'>Connectez-vous</Link>
          </p>
        </div>

        <div className="mx-5 mb-4 text-end">
          <button
          disabled={email && password && fullname && username ? false : true} 
          type="submit" className="text-white normal-case border border-0 bouton btn-primary rounded-0 shadow-0 btn-sm">Inscription</button>
      </div>

      </form>
    </div>
  )
}

export default Inscription;