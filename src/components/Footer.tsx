import { Laptop, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Laptop className="w-6 h-6 text-coral" />
              <span className="text-xl font-poppins font-semibold">
                ProcureLink
              </span>
            </div>
            <p className="text-gray-400 font-inter text-sm leading-relaxed">
              Connecting trusted vendors and organizations through transparent laptop procurement.
            </p>
          </div>

          <div>
            <h3 className="font-poppins font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#press" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#help" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 font-inter text-sm">
                <Mail className="w-4 h-4 text-coral" />
                hello@procurelink.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 font-inter text-sm">
                <Phone className="w-4 h-4 text-coral" />
                +27 123 456 7890
              </li>
              <li className="flex items-center gap-2 text-gray-400 font-inter text-sm">
                <MapPin className="w-4 h-4 text-coral" />
                Johannesburg, SA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 font-inter text-sm">
            © 2025 ProcureLink. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/about" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
              About
            </a>
            <a href="#privacy" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
              Privacy
            </a>
            <a href="#terms" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
              Terms
            </a>
            <a href="#contact" className="text-gray-400 hover:text-coral transition-colors font-inter text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
