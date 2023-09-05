export const ADD_PEER = "ADD_PEER";
export const REMOVE_PEER = "REMOVE_PEER";

export const AddPeerAction=(peerId, stream)=>(
{
    type:ADD_PEER,
    payload:{peerId, stream}
}
)

export const RemovePeerAction=(peerId)=>(
    {
        type:REMOVE_PEER,
        payload:{peerId}
    }
    )