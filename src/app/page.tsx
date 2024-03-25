'use client'
import { useEffect } from 'react';
import Timer from './timer/page';

export default function Page() {

  useEffect(() => {
    if (window.Notification.permission != "denied") {
      window.Notification.requestPermission();
    }
  })

  return (
    <div className='h-full flex justify-center items-center'>
      <Timer />
    </div>
  )
}