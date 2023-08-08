import React from 'react'
import Layout from '../components/layout/layout'

const About = () => {
  return (
    <Layout title={"About-Prime Picks"}>
      <div>
        <div className="bg-light">
          <div className="container py-5">
            <div className="row h-100 align-items-center py-5">
              <div className="col-lg-6">
                <h1 className="display-4">About Prime Picks!</h1>
                <p className="lead text-muted mb-0">Welcome to Prime Picks, your ultimate destination for a curated selection of premium products that cater to your every need and desire. At Prime Picks, we believe that shopping is not just a transaction, but an experience that should leave you inspired, satisfied, and excited..</p>

              </div>
              <div className="col-lg-6 d-none d-lg-block"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png" alt className="img-fluid" /></div>
            </div>
          </div>
        </div>
        <div className="bg-white py-5">
          <div className="container py-5">
            <div className="row align-items-center mb-5">
              <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary" />
                <h2 className="font-weight-light">Our Vision</h2>
                <p className="font-italic text-muted mb-4">At Prime Picks, we have a relentless passion for finding the finest products from around the world. Our dedicated team of experts scours the market to handpick items that meet our stringent criteria for quality, functionality, and aesthetics. From luxurious fashion and cutting-edge electronics to elegant home decor and beyond, every item in our collection has been chosen with utmost care.</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
              </div>
              <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg" alt className="img-fluid mb-4 mb-lg-0" /></div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-5 px-5 mx-auto"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg" alt className="img-fluid mb-4 mb-lg-0" /></div>
              <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary" />
                <h2 className="font-weight-light">Exceptional Service

                </h2>
                <p className="font-italic text-muted mb-4">Shopping at Prime Picks is not just about acquiring remarkable products; it's about enjoying an exceptional service experience. Our user-friendly website is designed to provide you with a seamless and intuitive browsing experience. Our dedicated customer support team is always ready to assist you, whether you have a question about a product or need help with your order.</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light py-5">
          <div className="container py-5">
            <div className="row mb-4">
              <div className="col-lg-5">
                <h2 className="display-4 font-weight-light">Our team</h2>
                <p className="font-italic text-muted">At Prime Picks, our team is the heart and soul of our mission to provide you with an unparalleled shopping experience. We're a diverse group of dedicated individuals, united by a shared passion for quality, innovation, and customer satisfaction. Allow us to introduce you to the people behind the scenes who work tirelessly to bring you the finest selection of products and exceptional service.</p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-1_s02nlg.png" alt width={100} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                  <h5 className="mb-0">Abbas Ghori</h5><span className="small text-uppercase text-muted">CEO - Founder</span>
                </div>
              </div>
              {/* End*/}
              {/* Team item*/}
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834132/avatar-4_ozhrib.png" alt width={100} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                  <h5 className="mb-0">Mehvish</h5><span className="small text-uppercase text-muted">CEO - Founder</span>

                </div>
              </div>
              {/* End*/}
              {/* Team item*/}
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834130/avatar-3_hzlize.png" alt width={100} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                  <h5 className="mb-0">Saim</h5><span className="small text-uppercase text-muted">CEO - Founder</span>

                </div>
              </div>
              {/* End*/}
              {/* Team item*/}
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556834133/avatar-2_f8dowd.png" alt width={100} className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                  <h5 className="mb-0">Ahmed</h5><span className="small text-uppercase text-muted">CEO - Founder</span>

                </div>
              </div>
              {/* End*/}
              {/* Team item*/}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default About