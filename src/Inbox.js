import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Mail from './Small Components/Mail'
import MailDetail from './Small Components/MailDetail'
import { FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa6'


export default function Inbox({ username }) {
  const [mails, setMails] = useState([
    { title: 'Judul 1', content: 'Dolor ea commodo cupidatat fugiat consectetur voluptate consectetur.', sender: 'x', date: '01/07/2024', open: false },
    { title: 'Judul 2', content: 'Dolor ea commodo cupidatat fugiat consectetur voluptate consectetur.', sender: 'x', date: '01/07/2024', open: false },
    { title: 'Judul 3', content: 'Dolor ea commodo cupidatat fugiat consectetur voluptate consectetur.', sender: 'x', date: '01/07/2024', open: false },
    { title: 'Judul 4', content: 'Dolor ea commodo cupidatat fugiat consectetur voluptate consectetur.', sender: 'x', date: '01/07/2024', open: false }
  ])
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(true)
  const Select = (index) => {
    const updatedMail = [...mails]
    updatedMail[index].open = true
    setSelected(index)
    setMails(updatedMail)
  }
  const clearAll = () => {
    setMails([])
    setSelected(null)
    setActive(false)
  }
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Navbar username={username} title="Inbox" subtitle="See your mails here" />
          {active === false ?
            <>
              <button className='text-slate-500 w-36 ml-4 mt-4 rounded-full cursor-not-allowed' onClick={clearAll}>Clear Inbox</button>
              <h1 className='text-center text-slate-600 text-lg mt-44'>No Mails</h1>
            </>
            :
            selected !== null ?
              <MailDetail mail={mails[selected]} onClose={() => setSelected(null)} />
              :
              <>
                <button className='text-red-500 w-36 ml-4 mt-4 rounded-full hover:bg-amber-500 hover:text-white duration-200' onClick={clearAll}>Clear Inbox</button>
                <div className='grid grid-cols-2 mt-8 sm:grid-cols-1 gap-4 lg:gap-0 lg:ml-0 lg:w-full lg:items-center px-10 sm:px-3'>
                  {
                    mails.map((mail, index) =>
                      <Mail key={index} title={mail.title} content={mail.content} sender={mail.sender} date={mail.date} onClick={() => Select(index)}
                        icon={mail.open
                          ?
                          <FaEnvelopeOpen className='ml-4 text-2xl 2xl:text-3xl' />
                          :
                          <FaEnvelope className='ml-4 text-2xl 2xl:text-3xl' />} />
                    )
                  }
                </div>
              </>
          }
        </div>
      </div>
    </>
  )
}
