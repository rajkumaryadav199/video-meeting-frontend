import { ADD_PEER,REMOVE_PEER } from "./PeerAcction";

const PeerState = {stream:''}

// const PeerAction = {
//   peerAdd:{
//     type:ADD_PEER,
// payload:{peerId, stream}
// }
// ,
// peerRemove:{type:ADD_PEER,
// payload:{peerId}
// }}

export const PeerReducer =(state = PeerState, action)=>{
  
  switch (action.type){
      case ADD_PEER:
      return {
          ...state,
          [action.payload.peerId]:{
            ...state[action.payload.peerId],
            stream: action.payload.stream,
          }
        }
        case REMOVE_PEER:
          return{
            ...state,
            [action.payload.peerId]: {
                  ...state[action.payload.peerId],
            stream: undefined,} 
          }
      default : 
        return {...state};
  }
}