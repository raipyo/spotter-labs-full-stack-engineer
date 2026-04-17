export default function ELDLogs({ logs }) {
  return (
    <div style={{ marginTop: 60 }}>
      <h2>📓 ELD Daily Log Sheet</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "60px 200px",
        gap: 5
      }}>
        {logs.map((log, i) => (
          <>
            <div>{log.hour}</div>
            <div>{log.status}</div>
          </>
        ))}
      </div>
    </div>
  );
}