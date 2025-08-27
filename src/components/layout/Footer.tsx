export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">MyApp</span>
            </div>
            <p className="text-gray-500 text-base">
              Building the future of web applications with Next.js and modern
              technologies.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Product
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Features
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Pricing
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      API
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Documentation
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Help Center
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Contact Us
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      About
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Blog
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Careers
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Privacy
                    </span>
                  </li>
                  <li>
                    <span className="text-base text-gray-500 hover:text-gray-900 cursor-pointer">
                      Terms
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2024 MyApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
