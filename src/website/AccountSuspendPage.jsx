import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AccountSuspendPage() {
    const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent to the admin.");
    setMessage("");
  };
    return (
    <>
    <section className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-md text-center">
        <h1 className="mb-4 text-6xl font-extrabold text-red-600">Account Suspended</h1>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Your account has been suspended. If you believe this is a mistake, please contact the administrator.
        </p>
        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-left text-gray-700 dark:text-gray-300 font-medium mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Contact Admin
          </button>
        </form>
      </div>
    </section>
    </>
  )
}

export default AccountSuspendPage