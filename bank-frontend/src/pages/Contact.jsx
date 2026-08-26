import './Pages.css'

function Contact() {
  return (
    <section className="page">
      <p className="page-eyebrow">We are here to help</p>
      <h1>Let&apos;s talk about what comes next.</h1>
      <p className="page-lead">
        Questions are welcome. Our team is ready to help you find the right place to begin.
      </p>
      <div className="page-grid">
        <article className="page-card">
          <h2>Call us</h2>
          <p>1-800-M-BANK</p>
        </article>
        <article className="page-card">
          <h2>Visit a branch</h2>
          <p>Find an M bank team near you during regular business hours.</p>
        </article>
        <article className="page-card">
          <h2>Send a message</h2>
          <p>Our support team will get back to you as soon as possible.</p>
        </article>
      </div>
    </section>
  )
}

export default Contact
