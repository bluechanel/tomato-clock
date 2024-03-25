'use client'
import Timer from './timer/page';

export default function Page() {
  if (window.Notification.permission != "denied") {
    window.Notification.requestPermission();
  }
  return (
    <div className='h-full flex justify-center items-center'>
      <Timer />
    </div>
  )
}