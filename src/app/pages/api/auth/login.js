import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginUser, setAuthToken } from '@/lib/auth';
import Image from 'next/image';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token, user } = await loginUser(credentials.email, credentials.password);
      
      // Store token for persistent login
      setAuthToken(token);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'hod') {
        router.push('/hod/dashboard');
      } else if (user.role === 'teacher') {
        router.push('/teacher/dashboard');
      } else if (user.role === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-4 px-6">
          <h2 className="text-center text-3xl font-extrabold text-white">
            School Portal
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            Sign in to your account
          </p>
        </div>
        
        <form className="py-8 px-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </form>
        
        <div className="bg-gray-50 py-4 px-6 border-t border-gray-200">
          <div className="text-sm text-center text-gray-600">
            Demo Accounts:
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-100 p-2 rounded">
              <div>Admin</div>
              <div>admin@school.com</div>
              <div>admin123</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <div>HOD</div>
              <div>hod@school.com</div>
              <div>hod123</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <div>Teacher</div>
              <div>teacher1@school.com</div>
              <div>teacher123</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <div>Student</div>
              <div>student1@school.com</div>
              <div>student123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
