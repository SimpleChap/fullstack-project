import './Pages.css'

function Home() {
  return (
    <section className="page">
      <p className="page-eyebrow">A steadier way forward</p>
      <h1>Banking that keeps life moving.</h1>
      <p className="page-lead">
        Simple tools, thoughtful support, and a clear view of your money whenever you need it.
      </p>
      <div className="page-grid">
        <article className="page-card">
          <h2>Built for everyday life</h2>
          <p>Manage spending, saving, and planning from one calm, capable place.</p>
        </article>
        <article className="page-card">
          <h2>Guidance when it matters</h2>
          <p>Get practical help from people who take the time to understand your goals.</p>
        </article>
        <article className="page-card">
          <h2>Clarity by design</h2>
          <p>Know where you stand with straightforward products and transparent terms.</p>
        </article>
      </div>
    </section>
  )
}

export default Home
