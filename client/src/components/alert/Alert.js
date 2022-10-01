import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Loading from './Loading';
import Toast from './Toast';


const Alert = () => {

   const { alert } = useSelector(state => state)
   const dispatch = useDispatch()

  return (
    <div>
        {alert.loading && <Loading />}
        {
            alert.error && 
            <Toast msg={{title: 'Erreur', body: alert.error}} 
            handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
            bgColor="danger" />
        }

        {
            alert.success && 
            <Toast msg={{title: 'Succès', body: alert.success}}
            handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
            bgColor="success" />
        }

{
            alert.info && 
            <Toast msg={{title: 'Information', body: alert.info}}
            handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
            bgColor="info" />
        }
    </div>
  )
}

export default Alert;