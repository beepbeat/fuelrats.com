// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const createShip = (name, type) => async dispatch => {
//  try {
//    dispatch({
//      type: actionTypes.CREATE_SHIP,
//    })
//
//    let response = await fetch(`/api/rats`, {
//      body: JSON.stringify({
//        name,
//        platform,
//        userId
//      }),
//      headers: new Headers({
//        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//        'Content-Type': 'application/json',
//      }),
//      method: 'post'
//    })
//
//    response = await response.json()
//
//    dispatch({
//      rat: response.data,
//      status: 'success',
//      type: actionTypes.CREATE_SHIP,
//    })
//
//  } catch (error) {
//    dispatch({
//      rat: ratId,
//      status: 'error',
//      type: actionTypes.CREATE_SHIP,
//    })
//
//    console.log(error)
//  }
}
