import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PNFImage from '../assets/images/404_Oops_Image.jpg';

class PageNotFound extends Component{
    
    render(){
        return ( 
           <div>
            <img src={PNFImage} alt={`404, sorry page not found!!`}  />
            <p style={{textAlign:"center"}}>
              <Link to="/" className='btn'>Go Back Home</Link>
            </p>
          </div>
        )}
}

export default PageNotFound;
