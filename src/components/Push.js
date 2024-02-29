const Push = ({ textPush }) => {
    return (
        <div className="position-sticky z-3 top-0 start-0">
            <div className="position-absolute top-0 start-0 alert alert-primary" role="alert">
                {textPush}
            </div>
        </div>
    );
}

export default Push;