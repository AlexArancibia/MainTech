"use client";

import { useAuth, UserButton } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import {Button} from '@/components/ui/button'
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import SearchInput from './SearchInput';
import { auth } from '@clerk/nextjs/server';
import { isTeacher } from '@/lib/teacher';

function NavbarRoutes() {
  const {userId} = useAuth();
  
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/courses');
  const isSearchPage = pathname === "/search"


  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto'>
        {isTeacherPage || isPlayerPage ? (
          <Link href='/dashboard'>
            <Button size='sm' variant='ghost'>
              <LogOut className='h-4 w-4 mr-2'/>
                Exit
            </Button>
          </Link>
          
        ) : isTeacher(userId) ? (
          <Link href='/teacher/courses'>
            <Button size='sm' variant='ghost'>
              Teacher Mode
            </Button>
          </Link>
        ) : null}
          <UserButton />
      </div>
    </>
  )
}

export default NavbarRoutes