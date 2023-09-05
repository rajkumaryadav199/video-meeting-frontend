import React from 'react'
import { Button } from 'react-bootstrap'
import {TbScreenShare} from "react-icons/tb"
const ShareScreenButton = ({onClick}) => {
  return (<Button variant="danger" onClick={onClick}>
  <TbScreenShare />
   </Button>
  )
}

export default ShareScreenButton
