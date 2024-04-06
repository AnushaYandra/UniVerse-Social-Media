'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  
  return (
    <div className='col-span-2 px-2 mt-2 hidden lg:inline'>

      <TwitterTimelineEmbed 
      sourceType='profile'
      screenName='TimesNow'
      options={{height:1000}}/>

     <TwitterTimelineEmbed 
      sourceType='profile'
      screenName='Ministry of Education'
      options={{height:1000}}/>

    </div>
  )
}

export default Widgets
