import logo from './img/logo.png'
import './Header.css'

function Header() {
    return (
        <header>
            <div className="home">
                <img src={logo} alt="home"/>
                <h1>CultivarIoT</h1>
            </div>
        </header>
    )
}

export default Header;