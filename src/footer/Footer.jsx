import React, { useEffect, useState } from 'react';
import './footer.css';
import { useNavigate } from 'react-router-dom';
export default function Footer() {


 
  return (
    <div>
      
    <div>
        <div className="footer-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className="footer-heading">Riskart E-Commerce</h4>
                        <div className="footer-underline"></div>
                        <p>
                        At Riskart, we are committed to bringing you a diverse and delightful shopping experience. As your go-to destination for online shopping, we offer an extensive range of products spanning across various categories to meet your every need.
                        </p>
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2"><a href="/" className="text-white">Home</a></div>
                        <div className="mb-2"><a href="" className="text-white">About Us</a></div>
                        <div className="mb-2"><a href="" className="text-white">Contact Us</a></div>
                        <div className="mb-2"><a href="" className="text-white">Blogs</a></div>
                        <div className="mb-2"><a href="" className="text-white">Sitemaps</a></div>
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Shop Now</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2"><a href="/" className="text-white">Collections</a></div>
                        <div className="mb-2"><a href="/login" className="text-white">Login</a></div>
                     
                    </div>
                    <div className="col-md-3">
                        <h4 className="footer-heading">Reach Us</h4>
                        <div className="footer-underline"></div>
                        <div className="mb-2">
                            <p>
                                <i className="fa fa-map-marker"></i> almora uttarakhand 263601
                            </p>
                        </div>
                        <div className="mb-2">
                            <a href="" className="text-white">
                                <i className="fa fa-phone"></i> +91 7617458897
                            </a>
                        </div>
                        <div className="mb-2">
                            <a href="" className="text-white">
                                <i className="fa fa-envelope"></i> rishabhgupta0203@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <p className=""> &copy; 2022 - Riskart of Web IT - Ecommerce. All rights reserved.</p>
                    </div>
                    <div className="col-md-4">
                        <div className="social-media">
                            Get Connected:
                            <a href=""><i className="fa fa-facebook"></i></a>
                            <a href=""><i className="fa fa-twitter"></i></a>
                            <a href=""><i className="fa fa-instagram"></i></a>
                            <a href=""><i className="fa fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
