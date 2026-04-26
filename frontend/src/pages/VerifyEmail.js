import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const email = searchParams.get('email');

      if (!token || !email) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.verifyEmail({ token, email });
        
        // Store JWT token
        localStorage.setItem('token', response.data.token);
        
        setSuccess(true);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <h2>Verifying your email...</h2>
            <p>Please wait...</p>
          </div>
        )}
        
        {success && (
          <div style={{ textAlign: 'center', color: 'green' }}>
            <h2>✅ Email Verified!</h2>
            <p>Your account is now active. Redirecting to dashboard...</p>
          </div>
        )}
        
        {error && (
          <div style={{ textAlign: 'center', color: 'red' }}>
            <h2>❌ Verification Failed</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/resend-email')} style={{ marginTop: '20px' }}>
              Resend Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
