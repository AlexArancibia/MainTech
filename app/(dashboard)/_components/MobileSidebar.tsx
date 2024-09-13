import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Siderbar from './Sidebar'


function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
        <Menu />
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
        <Siderbar></Siderbar>
      </SheetContent>
    </Sheet>
    
  )
}

export default MobileSidebar