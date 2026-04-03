//example logo
import Urban_logo from '../assets//urbanRentalLogo.png'
import Gomb from './Gomb'

export default function Card(){
    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="card">
                <div className="card-body">
                    <div className="card-body">
                        <img src={Urban_logo} alt="logo" className="img img-fluid img-thumbnail" />
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <div style={{fontSize:20}}>10db</div>
                        <Gomb buttonClass='btn btn-dark px-4' content='Szavazas' onClick={()=>{}} />
                    </div>
                </div>
            </div>
        </div>
    )
}