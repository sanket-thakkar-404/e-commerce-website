import { useState } from "react";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log({ username, email, password }); // Sign up logic
    } else {
      console.log({ username, password }); // Sign in logic
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden" data-theme="dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-base-content/10 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-primary/20 rounded-full animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-secondary/15 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-accent/20 rounded-full animate-[float_9s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="w-full max-w-4xl bg-base-100/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-base-content/20 overflow-hidden relative z-10 flex">
        
        {/* Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-base-200">
         <a href="https://storyset.com/people">People illustrations by Storyset</a>
         
         
          
        </div>

        {/* Forms Section */}
        <div className="w-full md:w-1/2 p-8">
          
          {/* Sign In Form */}
          {!isSignUp && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-[fadeIn_0.6s_ease]">
              <h1 className="text-3xl font-bold text-base-content text-center mb-8">Sign In</h1>
              
              <div className="form-control">
                <div className="relative">
                  <i className='bx bx-user absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/70 text-xl'></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full pl-12 bg-base-200 text-base-content placeholder-base-content/50 focus:input-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="form-control">
                <div className="relative">
                  <i className='bx bx-lock-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/70 text-xl'></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-12 bg-base-200 text-base-content placeholder-base-content/50 focus:input-primary"
                    required
                  />
                </div>
              </div>

              <a href="#" className="link link-primary text-sm">Forgot password?</a>

              <button type="submit" className="btn btn-primary w-full">Sign In</button>

              <div className="text-center">
                <span className="text-base-content/70 text-sm">Don't have an Account?</span>
                <span 
                  className="link link-primary ml-1 cursor-pointer font-semibold"
                  onClick={toggleForm}
                >
                  Sign Up
                </span>
              </div>
            </form>
          )}

          {/* Sign Up Form */}
          {isSignUp && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-[fadeIn_0.6s_ease]">
              <h1 className="text-3xl font-bold text-base-content text-center mb-8">Create Account</h1>
              
              <div className="form-control">
                <div className="relative">
                  <i className='bx bx-user absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/70 text-xl'></i>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full pl-12 bg-base-200 text-base-content placeholder-base-content/50 focus:input-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="form-control">
                <div className="relative">
                  <i className='bx bx-at absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/70 text-xl'></i>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full pl-12 bg-base-200 text-base-content placeholder-base-content/50 focus:input-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="form-control">
                <div className="relative">
                  <i className='bx bx-lock-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/70 text-xl'></i>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full pl-12 bg-base-200 text-base-content placeholder-base-content/50 focus:input-primary"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full">Sign Up</button>

              <div className="text-center">
                <span className="text-base-content/70 text-sm">Already have an Account?</span>
                <span 
                  className="link link-primary ml-1 cursor-pointer font-semibold"
                  onClick={toggleForm}
                >
                  Sign In
                </span>
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="btn btn-circle btn-outline btn-primary">
                  <i className='bx bxl-facebook text-xl'></i>
                </a>
                <a href="#" className="btn btn-circle btn-outline btn-primary">
                  <i className='bx bxl-twitter text-xl'></i>
                </a>
                <a href="#" className="btn btn-circle btn-outline btn-primary">
                  <i className='bx bxl-google text-xl'></i>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}