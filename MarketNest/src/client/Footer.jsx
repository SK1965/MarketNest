import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-transparent text-slate-200 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div>
                        <h5 className="text-lg font-semibold mb-4">PRODUCTS</h5>
                        <ul>
                            <li className="mb-2"><a href="#">Templates</a></li>
                            <li className="mb-2"><a href="#">Forms</a></li>
                            <li className="mb-2"><a href="#">Designs</a></li>
                            <li className="mb-2"><a href="#">Documents</a></li>
                            <li className="mb-2"><a href="#">E-books</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">SOLUTIONS</h5>
                        <ul>
                            <li className="mb-2"><a href="#">Customization</a></li>
                            <li className="mb-2"><a href="#">Collaboration</a></li>
                            <li className="mb-2"><a href="#">Integration</a></li>
                            <li className="mb-2"><a href="#">Optimization</a></li>
                            <li className="mb-2"><a href="#">Automation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">RESOURCES</h5>
                        <ul>
                            <li className="mb-2"><a href="#">Blog</a></li>
                            <li className="mb-2"><a href="#">Customer Stories</a></li>
                            <li className="mb-2"><a href="#">Help Center</a></li>
                            <li className="mb-2"><a href="#">Partners</a></li>
                            <li className="mb-2"><a href="#">Documentation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">ABOUT US</h5>
                        <ul>
                            <li className="mb-2"><a href="#">Our Story</a></li>
                            <li className="mb-2"><a href="#">Team</a></li>
                            <li className="mb-2"><a href="#">Careers</a></li>
                            <li className="mb-2"><a href="#">Press</a></li>
                            <li className="mb-2"><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">GET STARTED</h5>
                        <ul>
                            <li className="mb-2"><a href="#">Pricing</a></li>
                            <li className="mb-2"><a href="#">Free Trial</a></li>
                            <li className="mb-2"><a href="#">Sign Up</a></li>
                            <li className="mb-2"><a href="#">Login</a></li>
                            <li className="mb-2"><a href="#">Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
