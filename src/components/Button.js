const Button = ( {text, onClick} ) => {

    return (
        <button onClick={onClick} className="buttonStyle">{text}</button>
    )
}

export default Button
