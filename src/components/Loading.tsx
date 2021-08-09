import React, { FC } from 'react'

export interface LoadingProps {
  loading?: boolean
}
const Loading: FC<LoadingProps> = (props) => {
  const {loading = false} = props
  return (
    <div>
      {loading ? <p>Loading...</p> : props.children}
    </div>
  )
}

export default Loading
