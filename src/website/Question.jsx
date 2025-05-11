// import React from 'react'
// import Nav from './Nav'
// import Footer from './Footer'

// function Question() {
//   return (
//     <>
//     <Nav />
//     <section className=" shadow-slate-300  rounded-lg">
//         <div className="py-5 max-w-screen-sm mx-auto">
//           <div className="text-center mb-16">
//             <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
//               Frequently Asked{" "}
//               <span className="text-indigo-600">Questions</span>
//             </h3>
//           </div>

//           <div className="px-10 sm:px-16">
//             {/* Technical Section */}
//             <div className="py-3 uppercase text-sm text-gray-500 font-medium">
//               Technical
//             </div>

//             <div className="ml-5">
//               <div className="flex items-start my-8">
//                 <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
//                   <svg
//                     width="24px"
//                     fill="white"
//                     height="24px"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g data-name="Layer 2">
//                       <g data-name="menu-arrow">
//                         <rect
//                           width="24"
//                           height="24"
//                           transform="rotate(180 12 12)"
//                           opacity="0"
//                         />
//                         <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z" />
//                         <circle cx="12" cy="19" r="1" />
//                       </g>
//                     </g>
//                   </svg>
//                 </div>
//                 <div className="text-md">
//                   <h1 className="text-gray-900 font-semibold mb-2">
//                     What might be your first question?
//                   </h1>
//                   <p className="text-gray-500 text-sm">
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Maiores impedit perferendis suscipit eaque, iste dolor
//                     cupiditate blanditiis ratione.
//                   </p>
//                 </div>
//               </div>

//               {/* Duplicate as needed */}
//             </div>

//             {/* Billings Section */}
//             <div className="py-3 uppercase text-sm text-gray-500 font-medium">
//               Billings
//             </div>

//             <div className="ml-5">
//               <div className="flex items-start my-8">
//                 <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
//                   <svg
//                     width="24px"
//                     fill="white"
//                     height="24px"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <g data-name="Layer 2">
//                       <g data-name="menu-arrow">
//                         <rect
//                           width="24"
//                           height="24"
//                           transform="rotate(180 12 12)"
//                           opacity="0"
//                         />
//                         <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z" />
//                         <circle cx="12" cy="19" r="1" />
//                       </g>
//                     </g>
//                   </svg>
//                 </div>
//                 <div className="text-md">
//                   <h1 className="text-gray-900 font-semibold mb-2">
//                     What might be your first question?
//                   </h1>
//                   <p className="text-gray-500 text-sm">
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Maiores impedit perferendis suscipit eaque, iste dolor
//                     cupiditate blanditiis ratione.
//                   </p>
//                 </div>
//               </div>

//               {/* Duplicate as needed */}
//             </div>
//           </div>

//           {/* Footer with credit */}
//           <a
//             href="https://componentity.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block"
//           >
//             <img
//               src="https://i.pinimg.com/736x/18/08/85/180885efdec78b8b6e3c75784aaff905.jpg"
//               alt="Componentity Logo"
//               className="w-48 mx-auto my-5 object-contain bg-transparent"
//             />
//           </a>
//         </div>
//         </section>

//         <Footer />
//     </>
//   )
// }

// export default Question


import React, { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'

function Question() {
  return (
    <>
      <Nav />
      <section className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-extrabold text-gray-900">
              Frequently Asked <span className="text-indigo-600">Questions</span>
            </h3>
            <p className="mt-4 text-gray-600">
              Get quick answers to the most common questions about our service.
            </p>
          </div>

          {/* Technical Section */}
          <Section title="Technical" questions={[
            {
              question: "How do I reset my password?",
              answer: "Go to the login page and click on 'Forgot Password'. You'll receive an email to reset it."
            },
            {
              question: "Why is my dashboard not updating in real-time?",
              answer: "It might be due to a network issue. Try clearing your cache or checking your connection."
            },
            
          ]} />

          {/* Billings Section */}
          <Section title="Billings" questions={[
            {
              question: "How can I update my billing information?",
              answer: "Go to your account settings, and under 'Billing Info' you can update your payment details."
            },
            {
              question: "Do you offer refunds?",
              answer: "We provide refunds within 14 days of your subscription under certain conditions."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept Visa, MasterCard, PayPal, and Stripe payments."
            }
          ]} />
        </div>
      </section>
      <Footer />
    </>
  )
}

// Reusable Section Component
function Section({ title, questions }) {
  return (
    <div className="mb-10">
      <h4 className="text-lg font-bold text-gray-700 uppercase mb-4">{title}</h4>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <Accordion key={i} question={q.question} answer={q.answer} />
        ))}
      </div>
    </div>
  )
}

// Accordion Question Item
function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-5 py-4 bg-indigo-50 hover:bg-indigo-100 transition flex justify-between items-center"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 py-4 text-gray-600 bg-white border-t transition-all duration-300 ease-in-out">
          {answer}
        </div>
      )}
    </div>
  )
}

export default Question
