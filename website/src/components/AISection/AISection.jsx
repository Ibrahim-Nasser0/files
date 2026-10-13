import { useLanguage } from '../../context/LanguageContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Icon } from '../common/Icons';
import './AISection.css';

export default function AISection() {
  const { t, isRTL } = useLanguage();
  const [ref, isVisible] = useScrollAnimation(0.1);
  const tools = t('ai.tools');
  const exampleResults = t('ai.exampleResults');
  const recPhase1Steps = t('ai.recPhase1Steps');
  const recFactors = t('ai.recFactors');

  return (
    <section className="section ai-section" id="ai" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <span className="badge">
            <Icon name="cpu" size={14} color="#6366f1" />
            <span>Curriculum Intelligence</span>
          </span>
          <h2 className="section-title">{t('ai.sectionTitle')}</h2>
          <p className="section-subtitle">{t('ai.sectionSubtitle')}</p>
        </div>

        {/* ML Model Card & Real Inference Simulator */}
        <div className={`ai-block ${isVisible ? 'visible' : ''}`}>
          <div className="ai-ml-grid">
            <div className="ai-ml-info">
              <div className="ml-header-strip">
                <span className="ml-badge-pill">NLP Classification Engine</span>
                <span className="ml-sub-tag">v1.4 Calibrated</span>
              </div>
              <h3 className="ai-block-title">{t('ai.mlTitle')}</h3>
              <p className="ai-block-desc">{t('ai.mlDesc')}</p>

              <div className="ai-specs-grid">
                <div className="ai-spec-card">
                  <span className="ai-spec-label">Model Pipeline</span>
                  <span className="ai-spec-value">{t('ai.mlType')}</span>
                </div>
                <div className="ai-spec-card">
                  <span className="ai-spec-label">Feature Vector</span>
                  <span className="ai-spec-value">{t('ai.mlInput')}</span>
                </div>
                <div className="ai-spec-card">
                  <span className="ai-spec-label">Prediction Target</span>
                  <span className="ai-spec-value">{t('ai.mlOutput')}</span>
                </div>
                <div className="ai-spec-card">
                  <span className="ai-spec-label">Verification Gate</span>
                  <span className="ai-spec-value text-accent">{t('ai.mlReview')}</span>
                </div>
              </div>
            </div>

            <div className="ai-example-panel">
              <div className="example-panel-header">
                <div className="example-dot-wrap">
                  <span className="live-dot-green"></span>
                  <span className="example-title-text">{t('ai.exampleTitle')}</span>
                </div>
                <span className="syllabus-code">SYLLABUS INGESTION</span>
              </div>

              <div className="ai-example-course-box">
                <Icon name="book" size={16} color="#6366f1" />
                <span className="course-text">{t('ai.exampleCourse')}</span>
              </div>

              <div className="ai-example-results">
                {Array.isArray(exampleResults) &&
                  exampleResults.map((r, i) => (
                    <div key={i} className={`ai-result-row ${r.status}`}>
                      <div className="result-track-meta">
                        <span className="result-track-name">{r.track}</span>
                        <span className="result-score-tag">{r.score}% Confidence</span>
                      </div>
                      <div className="result-bar-track">
                        <div
                          className="result-bar-fill"
                          style={{
                            width: `${r.score}%`,
                            background: r.score > 70 ? 'linear-gradient(90deg, #6366f1, #3b82f6)' : '#64748b',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Tools Cards */}
        <div className={`ai-tools-grid-section ${isVisible ? 'visible' : ''}`}>
          <div className="sub-header-block">
            <h3 className="ai-tools-title">{t('ai.toolsTitle')}</h3>
          </div>
          <div className="ai-tools-cards">
            {Array.isArray(tools) &&
              tools.map((tool, i) => (
                <div key={i} className="ai-tool-card" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="ai-tool-icon-box">
                    <Icon name={tool.icon} size={22} color="#6366f1" />
                  </div>
                  <h4 className="ai-tool-title">{tool.title}</h4>
                  <p className="ai-tool-desc">{tool.desc}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Recommendation Engine */}
        <div className={`ai-rec ${isVisible ? 'visible' : ''}`}>
          <div className="rec-header">
            <span className="badge">
              <Icon name="compass" size={14} color="#6366f1" />
              <span>Constraint-Satisfaction Engine</span>
            </span>
            <h3 className="ai-block-title">{t('ai.recTitle')}</h3>
          </div>

          <div className="ai-rec-grid">
            <div className="ai-rec-phase-card">
              <h4 className="ai-rec-phase-title">{t('ai.recPhase1')}</h4>
              <div className="ai-pipeline-track">
                {Array.isArray(recPhase1Steps) &&
                  recPhase1Steps.map((step, i) => (
                    <div key={i} className="ai-pipeline-node">
                      <span className="node-step-badge">{i + 1}</span>
                      <span className="node-text">{step}</span>
                      {i < recPhase1Steps.length - 1 && <span className="pipeline-arrow">➔</span>}
                    </div>
                  ))}
              </div>
            </div>

            <div className="ai-rec-phase-card">
              <h4 className="ai-rec-phase-title">{t('ai.recPhase2')}</h4>
              <div className="ai-factors-list">
                {Array.isArray(recFactors) &&
                  recFactors.map((f, i) => (
                    <div key={i} className="ai-factor-item">
                      <div className="factor-top">
                        <span className="factor-name">{f.name}</span>
                        <span className="factor-weight-tag">{f.weight}</span>
                      </div>
                      <div className="factor-bar-track">
                        <div className="factor-bar-fill" style={{ width: f.weight }}></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
