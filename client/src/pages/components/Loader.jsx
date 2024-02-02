import React from 'react'
import { Hourglass } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='home-loader'>
            <Hourglass
                visible={true}
                height="60"
                width="60"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>
    )
}

export default Loader
