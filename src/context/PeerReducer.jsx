import { ADD_PEER,REMOVE_PEER } from "./PeerAcction";

const PeerState = {stream:MediaStream}

// const PeerAction = {
//   peerAdd:{
//     type:ADD_PEER,
// payload:{peerId, stream}
// }
// ,
// peerRemove:{type:ADD_PEER,
// payload:{peerId}
// }}

export const PeerReducer =(state=PeerState, action)=>{
  console.log("action")
  switch (action.type){
      case ADD_PEER:
      return {
          ...state,
          [action.paylod.peerId]:{
              stream:action.paylod.stream
          }
        }
        case REMOVE_PEER:
          const {[action.paylod.peerId]:deleted, ...rest} = state;
        return rest;
      default : 
        return{
          ...state
        }
  }
}