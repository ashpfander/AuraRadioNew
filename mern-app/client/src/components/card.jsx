const styles = {
  card: {
    margin: 20,
    background: '#e8eaf6',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: 300,
  },
  heading: {
    background: '#3f51b5',
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: '1.2rem',
    color: 'white',
    padding: '0 20px',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 20,
  },
};

function Card() {
  return (
    <div style={styles.card}>
      <div style={styles.heading}>Mood</div>
      <div style={styles.content}>
      </div>
    </div>
  );
}

export default Card;