"use client"

import React from 'react'
import Link from 'next/link';

export default function AdminLayout({ children }) {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link href="/admin">
        <span className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>ADMIN</h2>
        </span>
      </Link>
      <Link href="/admin/school">
        <span className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>School</h2>
        </span>
      </Link>
      <Link href="/admin/teacher">
        <span className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>Teacher</h2>
        </span>
      </Link>
      <Link href="/admin/studentCourse">
        <span className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>studentCourse</h2>
        </span>
      </Link>
     
    
      
    </nav>


        { children }
        </>
      )
}
