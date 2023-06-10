import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.API_URL}/login`, {
        username,
        password,
      });

      const { token } = response.data; // Ambil token dari respons
      localStorage.setItem('token', token); // Simpan token dalam penyimpanan lokal

      // Redirect ke halaman index
      router.push('/');

    } catch (error) {
        setError('Invalid Username or Password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12 p-5">
                  <h4 className="mb-4">Login</h4>
                  {error && <div className="alert alert-danger">{error}</div>} {/* Tampilkan badge error */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control border-0"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                  </form>
                  <div className="text-center mt-4">
                    <p className="text-muted">Don't have an account? <a href="#">Sign Up</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
