import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later
//import { useUserContext } from '../context/user_context';
//old notes from last react router release, rest notes still helpful, though not used anymore
//children in this case is our checkout component and ...rest gets the other params the exact path="", when return from this component we add the rest params to the children
//rest operater collects properties
//spread spreads them out. inRoute we are using spread, in params that's rest collecting our needed props from parent

//this protects user from accessing that url when they aren't authorized to

//! just for checkout page we have to get the user from auth0 to solve problem with page redirecting back to home before checkout page loads(when entered in the url bar), this is because auth0 returns user info quicker than our useUserContext wrapper does, - we wrap entire app in an authWrapper to finish  solving this this, that wrapper will handle loading and error scenario which will allow this problem to be solved
const PrivateRoute = ({ children }) => {
  //console.log(children, rest)
  const { user } = useAuth0()
  if (!user) {
    return <Navigate to="/" />
  }
  return children
}
export default PrivateRoute
