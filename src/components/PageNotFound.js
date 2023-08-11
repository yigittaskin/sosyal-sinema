import React from 'react'
import '../styles/pagenotfound.scss'

const PageNotFound = () => {
  return (
    <div className="wrapper">
  <div className="text_group">
    <p className="text_404">404</p>
    <p className="text_lost">Aradıgınız bu sayfa veya url <br />uzayda kayboldu...</p>
  </div>
  <div className="window_group">
    <div className="window_404">
      <div className="stars"></div>
    </div>
  </div>
</div>
  )
}

export default PageNotFound
