import React from "react";
import Layout from "../components/layout/layout";
import { TiLocation } from "react-icons/ti";
import { HiPhoneOutgoing } from "react-icons/hi";
import { MdAttachEmail } from "react-icons/md";
import back from "../../src/dsa8.jpg"
import { SiInstagram } from "react-icons/si";
import { GrFacebook } from "react-icons/gr";
import { ImLinkedin } from "react-icons/im";
const Contact = () => {
  return (
    <Layout title={"Contact-Prime Picks"}>
      <div className="contact-container ps-3">
        <img src={back} alt="" className="background-image" />
        <div className="overlay">
          <div className="container pb-5">
            <div className="row">
              <div className="col-md-6 contact-left pt-4 ps-0">
                <h2 className="text-dark">Address</h2>
                <address >
                  <h3>Prime Pick's Office</h3>
                  <h6 className="text-start"><TiLocation className="fs-2" /> XYZ-Main Street Anytown, KHI 12345</h6>
                  <h6 className="text-start"><HiPhoneOutgoing className="fs-2" />Phone: <a href="tel:1234567890">(123) 456-7890</a></h6>
                  <h6 className="text-start"><MdAttachEmail className="fs-2" />Email: <a href="mailto:primepicks@gmail.com">contact@example.com</a></h6>
                </address>
              </div>
              <div className="col-md-6 contact-right pt-5 pb-2 ">
                <h1 className="text-dark ">Contact Prime Picks!</h1>
                <form action="/contact" method="post" >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-dark fw-bold">Your Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" style={{ color: '#333' }} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-dark fw-bold">Your Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" style={{ color: '#333' }} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-dark fw-bold">Phone no</label>
                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone number" style={{ color: '#333' }} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label text-dark fw-bold">Your Message</label>
                    <textarea className="form-control" id="message" name="message" rows={5} style={{ color: '#333' }} defaultValue={""} />
                  </div>
                  <button type="submit" className="btn btn-dark fw-bold">Submit</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>


    </Layout>
  );
};

export default Contact;
