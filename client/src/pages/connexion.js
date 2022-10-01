import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { MDBInput  } from 'mdb-react-ui-kit';
import { login } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const Connexion = () => {
  const { auth } = useSelector(state => state)
  const navigate = useNavigate();

  const initialState = { email: ' ', password: ' ' }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]:value})
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(userData));
  }

  useEffect(() => {
    if(auth.token) navigate("/", { replace: true })
  }, [auth.token, navigate]);


  return (
    <div className='auth_page'>

      <form onSubmit={handleSubmit} className='bg-white shadow-sm formulaire_global' style={{ width: '440px' }}>
        <h1 className='my-5 text-center fs-5'>Connectez-vous maintenant</h1>
        
        <div className="mx-5 mb-3">
          <label htmlFor="floatingInput">Email address</label>
          <input type="email" className="form-control" id="floatingInput" onChange={handleChangeInput} value={email} name="email" />
        </div>
        
        <div className='mx-5 my-3 pass'>
            <label htmlFor="floatingPassword">Password</label>
            <input className="form-control" id="floatingPassword" type={typePass ? 'text' : 'password'} onChange={handleChangeInput} value={password} name="password" />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'cacher' : 'voir'}
          </small>
        </div>
        
        <div className='mx-auto text-center d-block text-connexion' style={{ minWidth: '17rem', width: '20rem' }}>
          <p className='text-sm'>
            Vous n'avez pas encore de compte ? <Link to='/inscription' className='text-red-400'>Inscrivez-vous maintenant</Link>
          </p>
        </div>

        <div className="mx-5 mb-4 text-end">
          <button disabled={email && password ? false : true} type="submit" className="text-white normal-case border border-0 bouton btn-primary rounded-0 shadow-0 btn-sm">Connexion</button>
        </div>
        
      </form>

    </div>
  )
}

export default Connexion;