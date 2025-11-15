import "./HomeContent.css";
import lungImage from "./image of lung.jpg"; 

function HomeContent() {
  return (
    <section className="home">
      <header className="hero">
        <div className="hero-text">
          <h1>Lung Cancer Awareness</h1>
          <p>
            Lung cancer is one of the leading causes of cancer-related deaths worldwide.
            Spreading awareness, encouraging early diagnosis, and supporting research
            can save countless lives.
          </p>
          <button className="learn-btn">Learn More</button>
        </div>

        <div className="hero-image">
          <img
            src={lungImage} 
            alt="Lung Cancer Awareness Illustration"
          />
        </div>
      </header>

      <main className="info-cards">
        <article className="card">
          <h3>Symptoms</h3>
          <p>
            Persistent cough, chest pain, shortness of breath, and unexplained weight loss
            are early warning signs of lung cancer.
          </p>
        </article>

        <article className="card">
          <h3>Prevention</h3>
          <p>
            Avoid smoking, minimize exposure to air pollution, and maintain a balanced
            diet and regular exercise routine to lower your risk.
          </p>
        </article>

        <article className="card">
          <h3>Support</h3>
          <p>
            Early screening, proper medical consultation, and emotional support from
            family and friends play a key role in recovery.
          </p>
        </article>
      </main>
    </section>
  );
}

export default HomeContent;
