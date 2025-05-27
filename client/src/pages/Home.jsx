import React from 'react'
import {useNavigate} from 'react-router-dom'
import NewsList from './NewsList';

 function Home() {

  const navigate = useNavigate();

  function handleLogout() {
    // Çıkış yapma işlemi
    localStorage.removeItem('token'); // Token'ı kaldır
    navigate('/'); // Giriş sayfasına yönlendir
  }

  return (
    <div>
        {/* Navbar Kısmı */}
          <div className=' flex flex-row items-center justify-between '>

                <div className="flex flex-row ml-8 mt-4 cursor-pointer">
                  <img src="/src/images/b.png" alt="b" className="w-7 h-7" />
                  <img src="/src/images/l.png" alt="l" className="w-7 h-7" />
                  <img src="/src/images/o.png" alt="o" className="w-7 h-7" />
                  <img src="/src/images/g.png" alt="g" className="w-7 h-7" />
                </div>

                <div className=' mt-3 mr-8 cursor-pointer'>
                  <img src="/src/images/logout.png" alt='logout' onClick={handleLogout} className='w-9 h-9' />
                </div>
               
              
         </div>
        
        <NewsList />
      

    </div>
  )
}

export default Home