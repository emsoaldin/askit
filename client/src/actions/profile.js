import axios from 'axios';
import { setAlert } from './alert';
import { DELETE_ACCOUNT, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, GET_PROFILES } from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type:CLEAR_PROFILE })
  try {
      const res = await axios.get('/api/profile/');
      dispatch({
          type: GET_PROFILES,
          payload: res.data
      })
  } catch (err) {
      dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      })
  }
}

//Get profile by id
export const getProfileById = userId => async dispatch => {
  try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch({
          type: GET_PROFILE,
          payload: res.data
      })
  } catch (err) {
      dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
      })
  }
}

//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const res = await axios.post('/api/profile', formData, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ?'Profile updated' : 'Profile Created'), 'success');
        
        if(!edit){
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
} 

//Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const res = await axios.put('/api/profile/experience', formData);
    
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data
        });
    
        dispatch(setAlert('Experience Added', 'success'));
    
        history.push('/dashboard');
      } catch (err) {
        const errors = err.response.data.errors;
    
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    };

//Add education
export const addEducation = (formData, history) => async dispatch => {
    try {
      const res = await axios.put('/api/profile/education', formData);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Added', 'success'));
  
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

//Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience deleted', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education deleted', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//Delete account and profile
export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This can not be undone!')){
    try {
      await axios.delete('api/profile')
  
      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: DELETE_ACCOUNT
      })
      dispatch(setAlert('Your account has been deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }

}