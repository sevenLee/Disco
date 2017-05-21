import React from 'react'

const ContentWrapper = (props) => {
    return (
        <div className="content-wrapper">
            {(props.unwrap)? <div className="unwrap">{props.children}</div> : props.children}
        </div>
    )
}

export default ContentWrapper