import "./HomeContent.css";
import lungImage from "./image of lung.jpg";

function HomeContent() {
  return (
    <section className="home">

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-text">
          <h1>
            <span className="highlight">Lung Cancer</span> Awareness
          </h1>

          <p className="subtitle">
            Early detection can save lives. Learn symptoms, prevention tips, and
            understand how screening helps diagnose lung cancer in early stages.
          </p>

          <div className="btn-group">
            <button className="primary-btn">Learn More</button>
            <button className="secondary-btn">Free Assessment</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={lungImage} alt="Lung Cancer Awareness" className="fade-in" />
        </div>
      </header>

      {/* Symptoms / Prevention Cards */}
      <main className="info-cards">
        <article className="card glass-card">
          <h3>⚠️ Symptoms</h3>
          <p>
            Persistent cough, chest pain, shortness of breath, coughing blood,
            and unexplained weight loss are key warning signs.
          </p>
        </article>

        <article className="card glass-card">
          <h3>🛡 Prevention</h3>
          <p>
            Avoid smoking, reduce exposure to pollution, stay active, and eat a
            nutrient-rich diet to lower your risk.
          </p>
        </article>

        <article className="card glass-card">
          <h3>🤝 Support</h3>
          <p>
            Early medical consultation and emotional support from family and
            friends significantly improve outcomes.
          </p>
        </article>
      </main>

      {/* New Section — Causes */}
      <section className="causes">
        <h2>Main Causes of Lung Cancer</h2>
        <div className="cause-list">
          <div className="cause-card">
            <span>🚬</span>
            <h4>Smoking</h4>
            <p>The biggest risk factor, responsible for 80–90% of lung cancer cases.</p>
          </div>
          <div className="cause-card">
            <span>🏭</span>
            <h4>Air Pollution</h4>
            <p>Long-term exposure to polluted air increases the risk significantly.</p>
          </div>
          <div className="cause-card">
            <span>🧬</span>
            <h4>Genetics</h4>
            <p>Family history can increase your chances of developing lung cancer.</p>
          </div>
          <div className="cause-card">
            <span>☢️</span>
            <h4>Radiation</h4>
            <p>Exposure to harmful radiation or chemicals raises risk levels.</p>
          </div>
        </div>
      </section>

      {/* New Section — Early Detection Steps */}
      <section className="steps">
        <h2>How Early Detection Works</h2>
        <div className="step-container">
          <div className="step-box">
            <h3>1. Screening</h3>
            <p>Low-dose CT scans detect abnormalities at early stages.</p>
          </div>
          <div className="step-box">
            <h3>2. Diagnosis</h3>
            <p>Doctors examine tissues or cells to confirm cancer presence.</p>
          </div>
          <div className="step-box">
            <h3>3. Treatment Plan</h3>
            <p>Based on stage — surgery, chemotherapy, radiation, or targeted therapy.</p>
          </div>
          <div className="step-box">
            <h3>4. Recovery</h3>
            <p>Guidance, medication, therapy, and lifestyle changes support healing.</p>
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className="cta-section">
        <h2>Your Lungs Matter.</h2>
        <p>
          Learn about symptoms, causes, prevention, and explore dedicated tools made for medical professionals.
        </p>

        <button className="cta-btn">
          Take Free Risk Assessment
        </button>
      </section>

    </section>
  );
}

export default HomeContent;
