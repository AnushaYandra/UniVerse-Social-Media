import React, { SVGProps } from 'react'

interface Props {
   Icon : (props: SVGProps<SVGSVGElement>) => JSX.Element
   title: string
}

function SidebarRow({Icon, title}: Props) {
  return (
    <div className='flex items-center space-x-2 px-2 py-2 rounded-full 
    hover:bg-purple-300 cursor-pointer transition-all duration-200 
    group max-w-fit'>
        <Icon className="h-4 w-4"/>
        <p className='hidden text-base font-light md:inline-flex
        group-hover:text-white '>{title}</p>
    </div>
  )
}

export default SidebarRow
