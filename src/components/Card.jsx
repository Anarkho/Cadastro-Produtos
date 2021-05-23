import React from 'react'

const card = (props) => (
    <div className='card'>
        <div className="card-header">
            {props.header}
        </div>
        <div className="card-body">
            {props.children}
        </div>
    </div>
)

export default card