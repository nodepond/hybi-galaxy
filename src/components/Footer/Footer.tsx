import React from "react"
import { CallControlBox } from "./CallControlBox"


export const Footer: React.FC = ({ children }) => {
 
  return (
    <>
      <CallControlBox>
       {children}
      </CallControlBox>
    </>
  )
}
