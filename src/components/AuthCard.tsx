export const CardView = () => {
    return (
      <div className="w-full h-screen relative bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col justify-between p-12 text-white overflow-hidden">
        {/* Background Stripes */}
        <div className="absolute inset-0 flex flex-col gap-6 opacity-30">
          <div className="absolute -rotate-12 w-full h-40 bg-white/10 top-10 left-[-10%]"></div>
          <div className="absolute -rotate-12 w-full h-40 bg-white/10 top-1/2 left-[-5%]"></div>
          <div className="absolute -rotate-12 w-full h-40 bg-white/10 bottom-10 right-[-10%]"></div>
        </div>
  
        {/* Logo Section */}
        <div className="absolute top-8 left-8 flex items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <span className="text-lg font-semibold">Bankit</span>
        </div>
  
        {/* Floating Credit Cards */}
        <div className="relative flex justify-center items-center h-80">
          <div className="absolute -rotate-12 transform -translate-x-8 translate-y-4">
            <div className="w-64 h-40 rounded-xl bg-white/20 backdrop-blur-md shadow-lg border border-white/20"></div>
          </div>
          <div className="absolute rotate-12 transform translate-x-8 translate-y-4">
            <div className="w-64 h-40 rounded-xl bg-white/30 backdrop-blur-md shadow-xl border border-white/20"></div>
          </div>
        </div>
  
        {/* Text Content */}
        <div className="pb-12">
          <h1 className="text-4xl font-bold leading-tight">
            Say goodbye to financial stress
            <br />
            with the help of Bankit.
          </h1>
          <p className="text-lg opacity-80 mt-4">
            Take control of your finances with Bankit
            <br />
            the quickest and simplest way.
          </p>
        </div>
      </div>
    );
  };
  