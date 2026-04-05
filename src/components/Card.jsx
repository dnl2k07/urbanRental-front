//example logo
import Urban_logo from '../assets//urbanRentalLogo.png'
import Gomb from './Gomb'

export default function Card({logo,brand,model,color,transmission}){
    return(
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="card">
                <div className="card-body">
                    <div className="card-body">
                        <img src={logo} alt="logo" className="img img-fluid img-thumbnail" />
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <div style={{fontSize:20}}>{brand}</div>
                        <div style={{fontSize:20}}>{model}</div>
                        <div style={{fontSize:20}}>{color}</div>
                        <div style={{fontSize:20}}>{transmission}</div>
                        <Gomb buttonClass='btn btn-dark px-4' content='Reserve' onClick={()=>{}} />
                    </div>
                </div>
            </div>
        </div>
    )
}