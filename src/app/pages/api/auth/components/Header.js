import { logout } from '@/lib/auth';
import Image from 'next/image';

const Header = ({ user }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">School Management System</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <div className="flex items-center">
                {user.profile_picture && (
                  <Image
                    src={user.profile_picture}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
