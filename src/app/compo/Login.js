import React from 'react'

const page = () => {
  return (
    <div>
        <section className="container">
  <div className="login-container">
    <div className="circle circle-one"></div>
    <div className="form-container bg-opacity-70 backdrop-blur-lg border border-gray-300 rounded-md p-8 relative z-10">
      <img
        src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
        alt="illustration"
        className="illustration absolute top-[-14%] right-[-2px] w-[90%]"
      />
      <h1 className="opacity-60 text-2xl font-bold mb-6">LOGIN</h1>
      <form>
        <input
          type="text"
          placeholder="USERNAME"
          className="block w-full py-3 px-4 mb-6 rounded bg-opacity-70 backdrop-blur-md border border-gray-300 text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="block w-full py-3 px-4 mb-6 rounded bg-opacity-70 backdrop-blur-md border border-gray-300 text-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          className="block w-full py-3 px-4 mb-6 rounded bg-primary-color text-gray-100 font-bold text-xl focus:outline-none focus:ring focus:ring-blue-300 hover:shadow-md transform hover:scale-102 transition duration-150"
        >
          SUBMIT
        </button>
      </form>
      <div className="register-forget opacity-60 flex justify-between">
        <a href="" className="text-blue-400 hover:underline">
          REGISTER
        </a>
        <a href="" className="text-blue-400 hover:underline">
          FORGOT PASSWORD
        </a>
      </div>
    </div>
    <div className="circle circle-two"></div>
  </div>
  <div className="theme-btn-container"></div>
</section>

    </div>
  )
}

export default page