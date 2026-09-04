import { useLanguage } from '../../i18n/LanguageContext'
import EmergencyContacts from '../components/EmergencyContacts'
import NearestSafePlaces from '../components/NearestSafePlaces'
import styles from '../dashboard.module.css'

export default function DistrictWidgets() {
  const { t } = useLanguage()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{t.widgets.districtIntelligence}</h2>
          <p style={{ fontSize: 13, color: 'var(--slate)' }}>Weather, warnings and district impact overview.</p>
        </div>
        <button type="button" style={{ background: 'var(--ink)', color: 'white', padding: '10px 16px', borderRadius: 999, border: 'none', fontWeight: 700 }}>Issue Alert</button>
      </div>

      <div className={styles.panel} data-tone="cyan" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>{t.widgets.districtImpact}</strong>
          <span style={{ background: 'rgba(214,69,80,0.12)', color: 'var(--red)', padding: '4px 8px', borderRadius: 999, fontSize: 11, fontWeight: 700 }}>⚠ 2 Active Warnings</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 12 }}>
          <div style={{ background: 'rgba(45,168,216,0.08)', padding: 14, borderRadius: 8, border: '1px solid var(--line-light)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate-light)' }}>{t.widgets.districtCurrentStatus.toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>Severe</div>
            <div style={{ fontSize: 12, color: 'var(--slate)' }}>Heavy Rainfall & Squall</div>
            <div style={{ marginTop: 8, color: 'var(--cyan)', fontWeight: 700 }}>24°C</div>
          </div>
          <div style={{ background: 'rgba(214,69,80,0.06)', padding: 14, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate-light)' }}>{t.widgets.districtPrimaryRisk.toUpperCase()}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--red)' }}>Flash Flood</div>
            <div style={{ fontSize: 12, color: 'var(--slate)' }}>River basin at critical capacity.</div>
            <div style={{ marginTop: 8, height: 6, background: 'var(--paper-2)', borderRadius: 999 }}><span style={{ display: 'block', width: '85%', height: '100%', background: 'var(--red)', borderRadius: 999 }} /></div>
            <div style={{ fontSize: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}><span>Capacity</span><span style={{ color: 'var(--red)', fontWeight: 700 }}>85%</span></div>
          </div>
          <div style={{ background: 'rgba(45,168,216,0.08)', padding: 14, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate-light)' }}>{t.widgets.districtAffectedPopulation.toUpperCase()}</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>12.4k</div>
            <div style={{ fontSize: 12, color: 'var(--slate)' }}>Estimated across 3 sub-districts.</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800 }}>{t.widgets.districtAreasAttention}</h3>
            <span style={{ color: 'var(--cyan)', fontSize: 12, fontWeight: 700 }}>{t.common.viewMap}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <div className={styles.panel} data-tone="red" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><strong>North River Basin</strong><div style={{ fontSize: 12, color: 'var(--slate)' }}>Flash Flood Warning · Embankment stress</div></div>
              <span style={{ color: 'var(--red)', fontWeight: 700, fontSize: 12 }}>Evacuation Standby</span>
            </div>
            <div className={styles.panel} data-tone="amber" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><strong>Eastern Heights Sector</strong><div style={{ fontSize: 12, color: 'var(--slate)' }}>Power Grid Failure · Wind damage</div></div>
              <span style={{ color: '#8a3b00', fontWeight: 700, fontSize: 12 }}>Teams Dispatched</span>
            </div>
            <div className={styles.panel} data-tone="green" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><strong>Central Valley</strong><div style={{ fontSize: 12, color: 'var(--slate)' }}>Water Logging · Traffic disrupted</div></div>
              <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 12 }}>Monitoring</span>
            </div>
          </div>
        </div>
        <div className={styles.panel} data-tone="slate">
          <strong>{t.widgets.districtInformationFeed}</strong>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ borderLeft: '2px solid var(--ink)', paddingLeft: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}><span style={{ background: 'var(--paper-2)', padding: '2px 6px', borderRadius: 4 }}>{t.widgets.districtOfficial}</span> 10 mins ago</div>
              <strong style={{ fontSize: 13 }}>Evacuation advisory issued for low-lying areas of North River Basin.</strong>
            </div>
            <div style={{ borderLeft: '2px solid #8a3b00', paddingLeft: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}><span style={{ background: 'rgba(242,169,59,0.18)', padding: '2px 6px', borderRadius: 4 }}>{t.widgets.districtCommunityReport}</span> 25 mins ago</div>
              <p style={{ fontSize: 12, color: 'var(--slate)' }}>Tree fallen on Main St near Central Station blocking both lanes. No injuries reported.</p>
              <span style={{ fontSize: 10, color: 'var(--slate-light)', border: '1px solid var(--line-light)', padding: '2px 6px', borderRadius: 4 }}>{t.widgets.districtCommunityReport} — unverified</span>
            </div>
            <div style={{ borderLeft: '2px solid var(--ink)', paddingLeft: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}><span style={{ background: 'var(--paper-2)', padding: '2px 6px', borderRadius: 4 }}>{t.widgets.districtOfficial}</span> 1 hour ago</div>
              <strong style={{ fontSize: 13 }}>Weather system upgraded to Category 2. Expect sustained winds of 60km/h.</strong>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <span style={{ fontSize: 11, background: 'var(--paper-2)', padding: '4px 8px', borderRadius: 999 }}>{t.widgets.districtOfficial} Information</span>
            <span style={{ fontSize: 11, background: 'rgba(242,169,59,0.15)', padding: '4px 8px', borderRadius: 999 }}>{t.widgets.districtCommunityReport}s</span>
          </div>
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <button type="button" className={styles.panel}>District Map</button>
        <button type="button" className={styles.panel}>Warnings</button>
        <button type="button" className={styles.panel}>Official Announcement</button>
        <button type="button" className={styles.panel}>Public Reports</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <NearestSafePlaces />
      </div>
      <div style={{ marginTop: 16 }}>
        <EmergencyContacts />
      </div>
    </>
  )
}
