import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

function ResendEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await authAPI.resendVerificationEmail({ email });
      setMessage(response.data.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Resend Verification Email</h2>
        
        <form onSubmit={handleResend}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '20px' }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Sending...' : 'Resend Email'}
          </button>
        </form>

        {message && <p style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
        
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/login" style={{ textDecoration: 'none', color: '#007bff' }}>Back to Login</a>
        </p>
      </div>
    </div>
  );
}

export default ResendEmail;
