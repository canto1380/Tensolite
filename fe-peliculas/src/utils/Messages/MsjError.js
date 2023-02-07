const MsjError = (props) => {
    return (
            <div className="row mt-4 justify-content-center align-items-center">
        <div className="col-10 justify-content-center alert alert-danger">
            <h5 className="text-center">ERROR!</h5>
            <p className="text-center">{props.text1} <strong>{props.text2}</strong></p>
        </div>
        </div>
    );
  };
  
  export default MsjError;
  