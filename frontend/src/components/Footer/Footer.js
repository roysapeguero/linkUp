import './Footer.css'

export default function Footer() {
  return (
    <div className="footer">
      <h3 className="dev-info">Developer Information:</h3>
      <div className="contact-div">
        <button className="contact-btns">
          <a target='_blank' href="https://github.com/roysapeguero">
            <i class="fa-brands fa-github"></i>
          </a>
        </button>
        <button className="contact-btns">
          <a target='_blank' href="https://www.linkedin.com/in/roysapeguero/">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
        </button>
      </div>
    </div>
  )
}
