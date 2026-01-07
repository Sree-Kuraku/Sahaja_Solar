export default function HeroSection() {
  return (
    <section id="home" className="md:min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Use solar for a{' '}
              <span className="text-[#22c55e]">Better future</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Transform your energy consumption with sustainable solar solutions.
              Save money while contributing to a cleaner, greener planet.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl w-full max-w-md">
             <div className="h-[300px] flex items-center">
               <img src="brandLogo.png"
                alt="Brand Logo"
                className="max-w-full max-h-full mx-auto mb-6"
              />
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
