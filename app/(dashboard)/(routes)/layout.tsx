import FondoSignUp from 'public/fondosign.jpg'
import Siderbar from '../_components/Sidebar'
import NavBar from '../_components/NavBar'

const Dashboard = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div 
          className="h-full"
            // style={{ backgroundImage: 'url(/fondosign.jpg)', }} 
          >
            <div className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
              <NavBar></NavBar>
            </div>
          <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0'>
            <Siderbar />
          </div>
          <main className='md:pl-56 pt-[80px] h-full'>          
            {children}
          </main>  
        </div>
    )
}

export default Dashboard