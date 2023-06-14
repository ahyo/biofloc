import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useRouter } from 'next/router';

const Login = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(username);
    // console.log(password);
    try {
      setLoading(true);
      const response = await axios.post(`${config.API_URL}/login`, {
        username,
        password,
      });

      const { token } = response.data; // Ambil token dari respons
      // console.log(token);
      localStorage.setItem('token', token); // Simpan token dalam penyimpanan lokal
      // console.log('token:',token);
      // onLogin(token);
      // Redirect ke halaman index
      // console.log('redirect');
      router.push('/');
      // setError('token:'.token);

    } catch (error) {
        setError('Invalid Username or Password:');
    }finally {
      setLoading(false); // Mengatur status loading menjadi false setelah permintaan selesai
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
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        name="username"
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
                        name="password"
                        type="password"
                        className="form-control border-0"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign In'}</button>
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
