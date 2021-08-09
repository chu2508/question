import React from 'react'

export interface NoDataProps {
  message: string
}

function NoData(props: NoDataProps) {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  )
}

export default NoData
