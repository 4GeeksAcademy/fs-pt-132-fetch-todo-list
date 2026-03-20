const Card = ({ name, handleDelete }) => {

    return (
        <div className="card">
            <p>
                {name}
                <span 
                className="bg-danger "
                onClick={handleDelete}
                >
                    X
                </span>
            </p>
        </div>
    )
}


export default Card